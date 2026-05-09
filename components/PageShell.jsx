"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function PageShell({ children, search, setSearch, hideFooter = false }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar search={search} setSearch={setSearch} />
      <main className="flex-1">{children}</main>
      {!hideFooter && <Footer />}
    </div>
  )
}
