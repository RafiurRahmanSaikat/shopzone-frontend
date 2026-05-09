import { API_BASE_URL } from "@/lib/fetchClient"

export function getImageUrl(value) {
  const apiOrigin = String(API_BASE_URL || "").replace(/\/?api\/?$/, "")

  if (!value) return null
  if (Array.isArray(value)) return getImageUrl(value[0])
  if (typeof value === "object") return getImageUrl(value.url || value.src || value.path || value.image)
  if (typeof value !== "string") return null

  const raw = value.trim()
  if (!raw) return null
  if (raw.startsWith("data:")) return raw
  if (/^https?:\/\//i.test(raw)) return raw

  const path = raw.startsWith("/") ? raw : `/${raw}`
  if (!apiOrigin) return path
  return `${apiOrigin}${path}`
}
