import axios from "axios"
import { toast } from "react-hot-toast"
import { API_URL } from "../constants"

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor for handling errors and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem("refresh_token")

        if (!refreshToken) {
          // No refresh token, logout
          localStorage.removeItem("token")
          localStorage.removeItem("refresh_token")
          localStorage.removeItem("user")
          window.location.href = "/login"
          return Promise.reject(error)
        }

        // Try to get a new token
        const response = await axios.post(`${API_URL}/token/refresh/`, {
          refresh: refreshToken,
        })

        // Save the new token
        localStorage.setItem("token", response.data.access)

        // Update the failed request with the new token
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`

        // Retry the original request
        return api(originalRequest)
      } catch (refreshError) {
        // Refresh token failed, logout
        localStorage.removeItem("token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("user")
        window.location.href = "/login"
        return Promise.reject(refreshError)
      }
    }

    // Handle other errors
    const errorMessage = error.response?.data?.message || "Something went wrong"
    if (error.response?.status !== 401) {
      toast.error(errorMessage)
    }

    return Promise.reject(error)
  },
)

export default api
