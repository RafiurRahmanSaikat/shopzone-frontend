import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL_BACKEND } from "../constants";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  const saveToken = useCallback((jwtToken) => {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
  }, []);

  const removeToken = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }, []);

  const fetchProfile = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL_BACKEND}/accounts/users/me/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      removeToken();
    } finally {
      setLoading(false);
    }
  }, [token, removeToken]);

  useEffect(() => {
    if (token) fetchProfile();
  }, [token, fetchProfile]);

  const login = useCallback(
    async (credentials) => {
      setLoading(true);
      try {
        const { data } = await axios.post(
          `${BASE_URL_BACKEND}/token/`,
          credentials,
        );
        saveToken(data.access);
        toast.success("Login successful!");
        await fetchProfile();
        return { status: 200 }; // Ensure a response is returned
      } catch (error) {
        toast.error("Invalid credentials");
        return { status: error.response?.status || 500 };
      } finally {
        setLoading(false);
      }
    },
    [saveToken, fetchProfile],
  );

  const signup = useCallback(async (formData) => {
    setLoading(true);
    try {
      await axios.post(`${BASE_URL_BACKEND}/accounts/users/`, formData);
      toast.success("Signup successful! Please verify your email.");
    } catch (error) {
      toast.error("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        await axios.post(`${BASE_URL_BACKEND}/logout/`, {
          refresh: refreshToken,
        });
      }
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      removeToken();
      localStorage.removeItem("refresh_token");
      toast.info("Logged out successfully!");
      setTimeout(() => {
        window.location.replace("/login");
      }, 500);
    }
  }, [removeToken]);
  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
