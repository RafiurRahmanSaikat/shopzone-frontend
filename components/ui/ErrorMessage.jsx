"use client"


export default function ErrorMessage({ title = "Error", message }) {
  return (
    <div className="rounded-md border border-destructive/20 bg-destructive/5 p-4">
      <div className="text-sm font-medium text-destructive">{title}</div>
      {message && <div className="mt-1 text-xs text-destructive/90">{message}</div>}
    </div>
  )
}
