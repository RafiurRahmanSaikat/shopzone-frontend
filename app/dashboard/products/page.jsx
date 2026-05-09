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
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
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

export default function MyProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiFetch("/products/my_products?page=1");
      const list = Array.isArray(data) ? data : data?.results || [];
      setProducts(list);
    } catch (err) {
      toast.error(err.message || "Failed to load products");
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">📦 My Products</h1>
          <p className="mt-2 text-base text-muted-foreground">
            Manage and organize your product catalog
          </p>
        </div>
        <Button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="mr-2 h-5 w-5" /> Add product
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <div className="text-5xl mb-3">📦</div>
            <EmptyTitle>No products yet</EmptyTitle>
            <EmptyDescription>
              Start by adding your first product to your store.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <Card className="border-primary/20">
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-gradient-to-r from-primary/5 to-primary/2">
                <TableRow>
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
                {products.map((p, idx) => (
                  <TableRow
                    key={p.id}
                    className="border-primary/10 hover:bg-primary/5 transition-colors"
                  >
                    <TableCell>
                      <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-gradient-to-br from-muted to-muted/60 border border-border/60 flex items-center justify-center">
                        {p.image ? (
                          <Image
                            src={p.image || "/placeholder.svg"}
                            alt={p.name}
                            fill
                            className="object-contain p-1"
                            sizes="48px"
                          />
                        ) : (
                          <span className="text-xs">No image</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{p.name}</TableCell>
                    <TableCell className="font-bold text-primary">
                      {formatPrice(p.price)}
                    </TableCell>
                    <TableCell>
                      {p.stock === 0 ? (
                        <Badge className="bg-destructive/10 text-destructive border-destructive/20 font-semibold">
                          ❌ Out of Stock
                        </Badge>
                      ) : p.stock < 5 ? (
                        <Badge className="bg-amber-100 text-amber-800 border-amber-200 font-semibold">
                          ⚠️ Low ({p.stock})
                        </Badge>
                      ) : (
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 font-semibold">
                          ✅ {p.stock}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground font-medium">
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
                        className="text-primary hover:bg-primary/10"
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
                              This will permanently remove "{p.name}" from your
                              store. This action cannot be undone.
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
