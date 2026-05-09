"use client";

import StoreFormDialog from "@/components/StoreFormDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { apiFetch } from "@/lib/fetchClient";
import { MapPin, Pencil, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function DashboardStoresPage() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch("/stores/");
      const list = Array.isArray(data) ? data : data?.results || [];
      setStores(list);
    } catch (err) {
      toast.error(err.message || "Failed to load stores");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(id) {
    try {
      await apiFetch(`/stores/${id}/`, { method: "DELETE" });
      toast.success("Store deleted");
      load();
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">🏪 My Stores</h1>
          <p className="mt-2 text-base text-muted-foreground">
            Create and manage your storefronts
          </p>
        </div>
        <Button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="mr-2 h-5 w-5" /> New store
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-lg" />
          ))}
        </div>
      ) : stores.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <div className="text-5xl mb-3">🏪</div>
            <EmptyTitle>No stores yet</EmptyTitle>
            <EmptyDescription>
              Create your first store to start selling your products.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map((s, idx) => (
            <Card key={s.id} className="">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate font-bold text-lg leading-tight">
                      {s.name}
                    </h3>
                    {s.location && (
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 flex-shrink-0" />
                        <span className="line-clamp-1">{s.location}</span>
                      </p>
                    )}
                    {s.address && (
                      <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                        {s.address}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditing(s);
                        setOpen(true);
                      }}
                      className="text-primary hover:bg-primary/10"
                      title="Edit store"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10"
                          title="Delete store"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>🗑️ Delete store?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently remove "{s.name}" and all
                            associated products. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(s.id)}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                {s.categories?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.categories.map((c) => (
                      <Badge
                        key={c.id}
                        className="bg-background text-foreground border-foreground/20 text-xs font-semibold"
                      >
                        📌 {c.name}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <StoreFormDialog
        open={open}
        onOpenChange={setOpen}
        store={editing}
        mode={editing ? "edit" : "create"}
        onSaved={load}
      />
    </div>
  );
}
