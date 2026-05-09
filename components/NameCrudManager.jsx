"use client";

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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiFetch } from "@/lib/fetchClient";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

/**
 * Generic CRUD for resources with shape { id, name }.
 * @param {string} title - heading
 * @param {string} description - subtitle
 * @param {string} listEndpoint - GET endpoint, also used for POST
 * @param {function} itemEndpoint - (id) => path for PUT/DELETE
 * @param {boolean} listAuth - whether GET requires auth
 * @param {boolean} isAdmin - whether this is admin view
 * @param {string} adminColor - admin color theme (fuchsia, pink, rose, etc.)
 */
export default function NameCrudManager({
  title,
  description,
  listEndpoint,
  itemEndpoint,
  listAuth = true,
  isAdmin = false,
  adminColor = "blue",
}) {
  const colorMap = {
    blue: {
      border: "border-blue-200 dark:border-blue-900/50",
      darkBorder: "border-blue-200 dark:border-blue-900/50",
      header: "border-blue-200 dark:border-blue-900/50",
      text: "text-blue-700 dark:text-blue-300",

      button:
        "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600",

      bg: "",
      headerBg: "",

      hover: "hover:bg-blue-50 dark:hover:bg-blue-900/20",

      linkColor:
        "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300",
    },

    green: {
      border: "border-emerald-200 dark:border-emerald-900/50",
      darkBorder: "border-emerald-200 dark:border-emerald-900/50",
      header: "border-emerald-200 dark:border-emerald-900/50",
      text: "text-emerald-700 dark:text-emerald-300",

      button:
        "bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600",

      bg: "",
      headerBg: "",

      hover: "hover:bg-emerald-50 dark:hover:bg-emerald-900/20",

      linkColor:
        "text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300",
    },
  };

  const colors = colorMap[adminColor] || colorMap.fuchsia;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch(listEndpoint, { auth: listAuth });
      setItems(Array.isArray(data) ? data : data?.results || []);
    } catch (err) {
      toast.error(err.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [listEndpoint, listAuth]);

  useEffect(() => {
    load();
  }, [load]);

  function openCreate() {
    setEditing(null);
    setName("");
    setOpen(true);
  }

  function openEdit(item) {
    setEditing(item);
    setName(item.name);
    setOpen(true);
  }

  async function submit(e) {
    e.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      if (editing) {
        await apiFetch(itemEndpoint(editing.id), {
          method: "PUT",
          body: { name },
        });
        toast.success("Updated");
      } else {
        await apiFetch(listEndpoint, { method: "POST", body: { name } });
        toast.success("Created");
      }
      setOpen(false);
      load();
    } catch (err) {
      toast.error(err.message || "Failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    try {
      await apiFetch(itemEndpoint(id), { method: "DELETE" });
      toast.success("Deleted");
      load();
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div
        className={`mb-8 ${isAdmin ? `border-b${colors?.header} pb-6` : ""}`}
      >
        <div className="flex items-end justify-between gap-3 mb-2">
          <div>
            <h1
              className={`text-4xl font-bold tracking-tight ${isAdmin ? colors?.text : ""}`}
            >
              {title}
            </h1>
            {description && (
              <p
                className={`mt-2 text-base ${isAdmin ? "text-muted-foreground" : "text-sm text-muted-foreground"}`}
              >
                {description} ({items.length} total)
              </p>
            )}
          </div>
          <Button
            onClick={openCreate}
            className={isAdmin ? colors?.button : ""}
          >
            <Plus className="mr-2 h-4 w-4" /> New {title}
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>No {title.toLowerCase()} yet</EmptyTitle>
            <EmptyDescription>
              Create your first item to get started.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <Card
          className={
            isAdmin
              ? `${colors?.border} border-2 bg-gradient-to-br ${colors?.gradient}`
              : ""
          }
        >
          <CardContent className="p-0">
            <Table>
              <TableHeader
                className={
                  isAdmin ? `bg-gradient-to-r ${colors?.headerBg}` : ""
                }
              >
                <TableRow className={isAdmin ? `${colors?.darkBorder}` : ""}>
                  <TableHead className={isAdmin ? "font-bold" : ""}>
                    ID
                  </TableHead>
                  <TableHead className={isAdmin ? "font-bold" : ""}>
                    Name
                  </TableHead>
                  <TableHead
                    className={`text-right ${isAdmin ? "font-bold" : ""}`}
                  >
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((it) => (
                  <TableRow
                    key={it.id}
                    className={
                      isAdmin
                        ? `${colors?.darkBorder} ${colors?.hover} transition-colors`
                        : ""
                    }
                  >
                    <TableCell className="text-muted-foreground font-medium">
                      {it.id}
                    </TableCell>
                    <TableCell className="font-semibold">{it.name}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEdit(it)}
                        className={isAdmin ? colors?.linkColor : ""}
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>🗑️ Delete item?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently remove "{it.name}". This
                              action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(it.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editing ? `Edit ${title}` : `Create new ${title}`}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nm">Name</Label>
              <Input
                id="nm"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className={isAdmin ? colors?.button : ""}
              >
                {submitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {editing ? "Save changes" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
