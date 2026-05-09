import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewsletterSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-border/60 bg-muted/20 px-6 py-8 sm:px-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <span className="mb-2 inline-flex items-center rounded-full bg-gradient-to-r from-indigo-300 to-violet-300 px-3 py-1 text-xs font-semibold text-zinc-900 shadow-sm">
              Early access
            </span>
            <h2 className="text-2xl font-semibold tracking-tight">Get fresh drops first</h2>
            <p className="text-sm text-muted-foreground">
              Weekly picks, exclusive deals, and early access to new arrivals.
            </p>
          </div>
          <form className="flex w-full max-w-md flex-col gap-2 sm:flex-row">
            <Input type="email" placeholder="Enter your email" className="h-10" />
            <Button type="submit" className="h-10">Subscribe</Button>
          </form>
        </div>
      </div>
    </section>
  )
}
