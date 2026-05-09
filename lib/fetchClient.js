// Native fetch wrapper for ShopZone backend API
// - Attaches Bearer access token from localStorage
// - Safely parses JSON (backend may return empty/invalid JSON)
// - On 401, clears tokens and redirects to /login

export const API_BASE_URL =
  (typeof process !== "undefined" &&
    process.env &&
    process.env.NEXT_PUBLIC_API_BASE_URL) ||
  "https://shopzone-backend-gilt.vercel.app/api";

const ACCESS_KEY = "sz_access";
const REFRESH_KEY = "sz_refresh";

// Refresh lock to avoid concurrent refresh calls
let refreshPromise = null;

export function getAccessToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(REFRESH_KEY);
}

export function setTokens(access, refresh) {
  if (typeof window === "undefined") return;
  if (access) window.localStorage.setItem(ACCESS_KEY, access);
  if (refresh) window.localStorage.setItem(REFRESH_KEY, refresh);
}

export function clearTokens() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ACCESS_KEY);
  window.localStorage.removeItem(REFRESH_KEY);
}

async function safeParseJSON(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (_err) {
    return null;
  }
}

/**
 * Centralized fetch.
 * @param {string} path - path beginning with "/"
 * @param {object} [options] - { method, body, headers, auth, isFormData, signal }
 */
export async function apiFetch(path, options = {}) {
  const {
    method = "GET",
    body,
    headers = {},
    auth = true,
    isFormData = false,
    signal,
  } = options;

  const finalHeaders = { ...headers };

  if (!isFormData && body !== undefined && !finalHeaders["Content-Type"]) {
    finalHeaders["Content-Type"] = "application/json";
  }

  if (auth) {
    const token = getAccessToken();
    if (token) finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
  let response;
  try {
    response = await fetch(url, {
      method,
      headers: finalHeaders,
      body:
        body === undefined
          ? undefined
          : isFormData
            ? body
            : JSON.stringify(body),
      signal,
    });
  } catch (err) {
    // Network error - backend likely unreachable
    const networkError = new Error(
      "Cannot reach the backend at " +
        API_BASE_URL +
        ". Is the Django server running?",
    );
    networkError.cause = err;
    networkError.isNetworkError = true;
    throw networkError;
  }

  // 401 -> attempt refresh (client only)
  if (response.status === 401 && typeof window !== "undefined") {
    // Try to refresh the access token once
    const refresh = getRefreshToken();
    if (!refresh) {
      clearTokens();
      if (!window.location.pathname.startsWith("/login")) window.location.href = "/login";
      const data = await safeParseJSON(response);
      const error = new Error((data && (data.detail || data.message)) || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    try {
      if (!refreshPromise) {
        refreshPromise = (async () => {
          const res = await fetch(`${API_BASE_URL}/token/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh }),
          });
          if (!res.ok) throw new Error("Refresh failed");
          const d = await safeParseJSON(res);
          if (!d?.access) throw new Error("Invalid refresh response");
          setTokens(d.access, d.refresh || refresh);
          return d.access;
        })();
      }

      const newAccess = await refreshPromise;
      refreshPromise = null;

      // Retry original request with new token
      finalHeaders["Authorization"] = `Bearer ${newAccess}`;
      const retryRes = await fetch(url, {
        method,
        headers: finalHeaders,
        body:
          body === undefined
            ? undefined
            : isFormData
              ? body
              : JSON.stringify(body),
        signal,
      });
      response = retryRes;
    } catch (err) {
      refreshPromise = null;
      clearTokens();
      if (!window.location.pathname.startsWith("/login")) window.location.href = "/login";
      const data = await safeParseJSON(response);
      const error = new Error((data && (data.detail || data.message)) || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }
  }

  const data = await safeParseJSON(response);

  if (!response.ok) {
    const error = new Error(
      (data && (data.detail || data.message)) ||
        `Request failed with status ${response.status}`,
    );
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

// Convenience helpers
export const api = {
  get: (path, opts) => apiFetch(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => apiFetch(path, { ...opts, method: "POST", body }),
  put: (path, body, opts) => apiFetch(path, { ...opts, method: "PUT", body }),
  patch: (path, body, opts) =>
    apiFetch(path, { ...opts, method: "PATCH", body }),
  del: (path, opts) => apiFetch(path, { ...opts, method: "DELETE" }),
};
