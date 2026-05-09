"use client"

import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageShell from "@/components/PageShell"

export default function SuccessPage() {
  return (
    <PageShell>
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <CheckCircle2 className="h-14 w-14 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Payment successful</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks for your purchase! Your order is being processed.
        </p>
        <div className="mt-6 flex gap-3">
          <Button asChild>
            <Link href="/orders">View orders</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">Keep shopping</Link>
          </Button>
        </div>
      </div>
    </PageShell>
  )
}
