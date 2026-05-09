"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { apiFetch, clearTokens, getAccessToken, getRefreshToken, setTokens } from "@/lib/fetchClient"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const fetchMe = useCallback(async () => {
    const token = getAccessToken()
    if (!token) {
      setUser(null)
      setLoading(false)
      return null
    }
    try {
      const me = await apiFetch("/accounts/users/me/")
      setUser(me)
      return me
    } catch (_err) {
      setUser(null)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMe()
  }, [fetchMe])

  const login = useCallback(
    async (username, password) => {
      const data = await apiFetch("/token/", {
        method: "POST",
        body: { username, password },
        auth: false,
      })
      if (!data || !data.access) {
        throw new Error("Login failed: invalid response from server")
      }
      setTokens(data.access, data.refresh)
      const me = await fetchMe()
      // Role-based redirect
      if (me) {
        if (me.role === "admin") router.push("/admin")
        else if (me.role === "store_owner") router.push("/dashboard")
        else router.push("/")
      }
      return me
    },
    [fetchMe, router],
  )

  const register = useCallback(
    async (payload) => {
      const data = await apiFetch("/accounts/users/", {
        method: "POST",
        body: payload,
        auth: false,
      })
      // After register, log them in automatically
      await login(payload.username, payload.password)
      return data
    },
    [login],
  )

  const logout = useCallback(async () => {
    const refresh = getRefreshToken()
    try {
      if (refresh) {
        await apiFetch("/logout/", { method: "POST", body: { refresh } })
      }
    } catch (_err) {
      // Backend may return invalid JSON or 400 — ignore
    } finally {
      clearTokens()
      setUser(null)
      router.push("/login")
    }
  }, [router])

  const refreshUser = useCallback(async () => {
    return fetchMe()
  }, [fetchMe])

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}
