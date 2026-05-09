"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Loader2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/AuthContext"

const DEMO_USERS = [
  { username: "john_doe", password: "password123", role: "Customer" },
  { username: "lucas_perez", password: "password123", role: "Store Owner" },
  { username: "alice_johnson", password: "password123", role: "Admin" },
]

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    if (!username || !password) {
      toast.error("Please enter username and password")
      return
    }
    setSubmitting(true)
    try {
      await login(username, password)
      toast.success("Welcome back!")
    } catch (err) {
      toast.error(err?.data?.detail || err.message || "Login failed")
    } finally {
      setSubmitting(false)
    }
  }

  function fillDemo(u) {
    setUsername(u.username)
    setPassword(u.password)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-6 flex items-center justify-center gap-2 font-semibold">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Package className="h-4 w-4" />
          </div>
          <span className="text-xl tracking-tight">ShopZone</span>
        </Link>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your ShopZone account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="your_username"
                  autoComplete="username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  autoComplete="current-password"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Sign in
              </Button>
            </form>

            <div className="mt-6 rounded-md border border-border bg-muted/40 p-3">
              <p className="text-xs font-medium text-muted-foreground">Demo accounts (click to fill)</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {DEMO_USERS.map((u) => (
                  <button
                    key={u.username}
                    type="button"
                    onClick={() => fillDemo(u)}
                    className="rounded-md border border-border bg-background px-2 py-1 text-xs hover:bg-accent"
                  >
                    <span className="font-medium">{u.role}</span>
                    <span className="ml-1 text-muted-foreground">· {u.username}</span>
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {"Don't have an account? "}
              <Link href="/register" className="font-medium text-foreground underline-offset-4 hover:underline">
                Create one
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
