"use client"

import Link from "next/link"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import PageShell from "@/components/PageShell"

export default function CancelPage() {
  return (
    <PageShell>
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
        <XCircle className="h-14 w-14 text-destructive" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight">Payment cancelled</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your payment was not completed. Your cart is still saved.
        </p>
        <div className="mt-6 flex gap-3">
          <Button asChild>
            <Link href="/cart">Back to cart</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">Continue shopping</Link>
          </Button>
        </div>
      </div>
    </PageShell>
  )
}
