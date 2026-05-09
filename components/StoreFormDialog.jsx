"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { apiFetch } from "@/lib/fetchClient"

export default function StoreFormDialog({ open, onOpenChange, store, onSaved, mode = "create" }) {
  const editing = mode === "edit" && !!store
  const [form, setForm] = useState({ name: "", address: "", location: "", category_ids: [] })
  const [categories, setCategories] = useState([])
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!open) return
    apiFetch("/stores/storeCategory")
      .then((d) => setCategories(Array.isArray(d) ? d : d?.results || []))
      .catch(() => setCategories([]))
  }, [open])

  useEffect(() => {
    if (editing && store) {
      setForm({
        name: store.name || "",
        address: store.address || "",
        location: store.location || "",
        category_ids: (store.categories || []).map((c) => c.id),
      })
    } else if (open && !editing) {
      setForm({ name: "", address: "", location: "", category_ids: [] })
    }
  }, [store, editing, open])

  function toggleCategory(id) {
    setForm((f) => ({
      ...f,
      category_ids: f.category_ids.includes(id)
        ? f.category_ids.filter((x) => x !== id)
        : [...f.category_ids, id],
    }))
  }

  async function submit(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (editing) {
        await apiFetch(`/stores/${store.id}/`, { method: "PUT", body: form })
        toast.success("Store updated")
      } else {
        await apiFetch("/stores/", { method: "POST", body: form })
        toast.success("Store created")
      }
      onSaved && onSaved()
      onOpenChange(false)
    } catch (err) {
      toast.error(err.message || "Failed to save store")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{editing ? "Edit store" : "Create new store"}</DialogTitle>
          <DialogDescription>
            {editing ? "Update store details." : "Open a new store on ShopZone."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="s_name">Store name</Label>
            <Input id="s_name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="s_addr">Address</Label>
            <Input
              id="s_addr"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="s_loc">Location</Label>
            <Input
              id="s_loc"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Categories</Label>
            <div className="flex max-h-40 flex-wrap gap-2 overflow-y-auto rounded-md border border-border p-3">
              {categories.length === 0 && (
                <span className="text-xs text-muted-foreground">No categories available</span>
              )}
              {categories.map((c) => (
                <label
                  key={c.id}
                  className="flex cursor-pointer items-center gap-2 rounded-md border border-border bg-background px-2 py-1 text-xs hover:bg-accent"
                >
                  <Checkbox
                    checked={form.category_ids.includes(c.id)}
                    onCheckedChange={() => toggleCategory(c.id)}
                  />
                  {c.name}
                </label>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {editing ? "Save changes" : "Create store"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
