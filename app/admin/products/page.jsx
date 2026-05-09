"use client";

import ProductFormDialog from "@/components/ProductFormDialog";
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
import { Input } from "@/components/ui/input";
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
import { formatPrice } from "@/lib/formatters";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch("/products/?page_size=all", { auth: false });
      setProducts(Array.isArray(data) ? data : data?.results || []);
    } catch (err) {
      toast.error(err.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(id) {
    try {
      await apiFetch(`/products/${id}/`, { method: "DELETE" });
      toast.success("Product deleted");
      load();
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    }
  }

  const filtered = products.filter((p) =>
    !search ? true : p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 border-b border-purple/20 pb-6">
        <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight ">
              📦 All Products
            </h1>
            <p className="mt-2 text-base text-muted-foreground">
              Manage the complete platform catalog ({filtered.length} products)
            </p>
          </div>
          <Button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            <Plus className="mr-2 h-5 w-5" /> Add product
          </Button>
        </div>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products by name..."
          className="w-full border-purple/20 dark:border-purple/40"
        />
      </header>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <Card className="border-purple/20 dark:border-purple/40 bg-gradient-to-br from-purple/5 to-purple/2 dark:from-purple/20 dark:to-purple/10">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gradient-to-r from-purple/5 to-purple/2 dark:from-purple/20 dark:to-purple/10">
                <TableRow className="border-purple/20 dark:border-purple/40">
                  <TableHead className="w-16 font-bold">Image</TableHead>
                  <TableHead className="font-bold">Product Name</TableHead>
                  <TableHead className="font-bold">Price</TableHead>
                  <TableHead className="font-bold">Stock</TableHead>
                  <TableHead className="font-bold">Store</TableHead>
                  <TableHead className="text-right font-bold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((p, idx) => (
                  <TableRow
                    key={p.id}
                    className="border-purple/10 dark:border-purple/20 hover:bg-purple/5 dark:hover:bg-purple/20 transition-colors"
                  >
                    <TableCell>
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-gradient-to-br from-muted to-muted/60 border border-purple/20 dark:border-purple/40 flex items-center justify-center">
                        {p.image ? (
                          <Image
                            src={p.image || "/placeholder.svg"}
                            alt={p.name}
                            fill
                            className="object-contain p-1"
                            sizes="48px"
                          />
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            No image
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{p.name}</TableCell>
                    <TableCell className="font-bold ">
                      {formatPrice(p.price)}
                    </TableCell>
                    <TableCell>
                      {p.stock === 0 ? (
                        <Badge className="bg-destructive/10 text-destructive border-destructive/20 dark:bg-destructive/20 dark:text-destructive dark:border-destructive/40 font-semibold">
                          ❌ Out
                        </Badge>
                      ) : p.stock < 5 ? (
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/50 dark:text-amber-200 dark:border-amber-800 font-semibold">
                          ⚠️ Low ({p.stock})
                        </Badge>
                      ) : (
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-200 dark:border-emerald-800 font-semibold">
                          ✅ {p.stock}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className=" font-medium">
                      {p.store?.name || "—"}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditing(p);
                          setOpen(true);
                        }}
                        title="Edit product"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10"
                            title="Delete product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              🗑️ Delete product?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently remove "{p.name}" from the
                              catalog. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(p.id)}
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

      <ProductFormDialog
        open={open}
        onOpenChange={setOpen}
        product={editing}
        mode={editing ? "edit" : "create"}
        onSaved={load}
      />
    </div>
  );
}
