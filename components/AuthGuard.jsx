"use client"

import Loading from "@/components/ui/Loading"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

/**
 * Role hierarchy: admin > store_owner > customer
 * Higher roles can access pages for lower roles.
 */
const ROLE_HIERARCHY = {
  admin: 3,
  store_owner: 2,
  customer: 1,
}

function getMinRoleLevel(allowList) {
  if (!allowList || allowList.length === 0) return 0
  return Math.min(...allowList.map((r) => ROLE_HIERARCHY[r] ?? 0))
}

/**
 * Protect a page by required role(s).
 * @param {object} props
 * @param {string[]} [props.allow] - allowed roles. Empty/undefined = any authed user.
 * @param {boolean} [props.strict] - if true, only exact roles allowed (no hierarchy)
 */
export default function AuthGuard({ children, allow, strict = false }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  const userLevel = user ? (ROLE_HIERARCHY[user.role] ?? 0) : 0
  const minRequired = getMinRoleLevel(allow)

  // Check access: if strict, must match exactly; otherwise higher roles pass
  const hasAccess = (() => {
    if (!user) return false
    if (!allow || allow.length === 0) return true
    if (strict) return allow.includes(user.role)
    // Non-strict: user level must be >= min required level
    return userLevel >= minRequired
  })()

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace("/login")
      return
    }
    if (!hasAccess) {
      // Redirect to appropriate landing based on role
      if (user.role === "admin") router.replace("/admin")
      else if (user.role === "store_owner") router.replace("/dashboard")
      else router.replace("/")
    }
  }, [user, loading, hasAccess, router])

  if (loading || !user || !hasAccess) {
    return <Loading message={loading ? "Checking authentication…" : "Redirecting..."} />
  }
  return children
}
