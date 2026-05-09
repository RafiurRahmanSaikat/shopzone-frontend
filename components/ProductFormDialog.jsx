"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { API_BASE_URL, apiFetch } from "@/lib/fetchClient";
import { ImageIcon, Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function getImageUrl(imagePath) {
  if (!imagePath) return null;
  if (imagePath.startsWith("http") || imagePath.startsWith("blob:"))
    return imagePath;
  const baseUrl = API_BASE_URL.replace(/\/api\/?$/, "");
  return `${baseUrl}${imagePath.startsWith("/") ? "" : "/"}${imagePath}`;
}

export default function ProductFormDialog({
  open,
  onOpenChange,
  product,
  onSaved,
  mode = "create",
}) {
  const editing = mode === "edit" && !!product;
  const fileInputRef = useRef(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    brand_id: "",
    store_id: "",
    category_ids: [],
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [removeImage, setRemoveImage] = useState(false);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stores, setStores] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;
    Promise.all([
      apiFetch("/brands/", { auth: false }).catch(() => null),
      apiFetch("/categories/", { auth: false }).catch(() => null),
      apiFetch("/stores/").catch(() => null),
    ]).then(([b, c, s]) => {
      setBrands(Array.isArray(b) ? b : b?.results || []);
      setCategories(Array.isArray(c) ? c : c?.results || []);
      setStores(Array.isArray(s) ? s : s?.results || []);
    });
  }, [open]);

  useEffect(() => {
    if (editing && product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        price: String(product.price ?? ""),
        stock: String(product.stock ?? ""),
        brand_id: product.brand?.id ? String(product.brand.id) : "",
        store_id: product.store?.id ? String(product.store.id) : "",
        category_ids: (product.categories || []).map((c) => c.id),
      });
      setExistingImage(product.image ? getImageUrl(product.image) : null);
      setImageFile(null);
      setImagePreview(null);
      setRemoveImage(false);
    } else if (open && !editing) {
      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        brand_id: "",
        store_id: "",
        category_ids: [],
      });
      setExistingImage(null);
      setImageFile(null);
      setImagePreview(null);
      setRemoveImage(false);
    }
  }, [product, editing, open]);

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setRemoveImage(false);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setImagePreview(null);
    setRemoveImage(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function toggleCategory(id) {
    setForm((f) => ({
      ...f,
      category_ids: f.category_ids.includes(id)
        ? f.category_ids.filter((x) => x !== id)
        : [...f.category_ids, id],
    }));
  }

  async function submit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Use FormData for multipart upload when there's an image
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      if (form.brand_id) formData.append("brand_id", form.brand_id);
      if (form.store_id) formData.append("store_id", form.store_id);
      form.category_ids.forEach((id) => formData.append("category_ids", id));

      // Handle image
      if (imageFile) {
        formData.append("image", imageFile);
      } else if (removeImage && editing) {
        formData.append("image", ""); // Signal to remove image
      }

      const url = editing ? `/products/${product.id}/` : "/products/";
      const method = editing ? "PUT" : "POST";

      await apiFetch(url, { method, body: formData, isFormData: true });

      toast.success(editing ? "Product updated" : "Product created");
      onSaved && onSaved();
      onOpenChange(false);
    } catch (err) {
      const msg =
        (err?.data && typeof err.data === "object"
          ? Object.values(err.data).flat().join(" ")
          : null) ||
        err.message ||
        "Failed to save product";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  const displayImage = imagePreview || (removeImage ? null : existingImage);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {editing ? "Edit product" : "Add new product"}
          </DialogTitle>
          <DialogDescription>
            {editing
              ? "Update product details."
              : "Add a product to your store."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Product Image</Label>
            <div className="flex items-start gap-4">
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 border-dashed border-border bg-muted flex items-center justify-center">
                {displayImage ? (
                  <>
                    <Image
                      src={displayImage}
                      alt="Product preview"
                      fill
                      className="object-contain p-1"
                      sizes="96px"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground shadow-sm hover:bg-destructive/90"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </>
                ) : (
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="product-image-input"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  {displayImage ? "Change image" : "Upload image"}
                </Button>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG or WebP. Max 5MB.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="p_name">Name</Label>
            <Input
              id="p_name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="p_desc">Description</Label>
            <Textarea
              id="p_desc"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="p_price">Price (USD)</Label>
              <Input
                id="p_price"
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p_stock">Stock</Label>
              <Input
                id="p_stock"
                type="number"
                min="0"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="p_brand">Brand</Label>
              <Select
                value={form.brand_id}
                onValueChange={(v) => setForm({ ...form, brand_id: v })}
              >
                <SelectTrigger id="p_brand">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((b) => (
                    <SelectItem key={b.id} value={String(b.id)}>
                      {b.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="p_store">Store</Label>
              <Select
                value={form.store_id}
                onValueChange={(v) => setForm({ ...form, store_id: v })}
              >
                <SelectTrigger id="p_store">
                  <SelectValue placeholder="Select store" />
                </SelectTrigger>
                <SelectContent>
                  {stores.map((s) => (
                    <SelectItem key={s.id} value={String(s.id)}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Categories</Label>
            <div className="flex max-h-40 flex-wrap gap-2 overflow-y-auto rounded-md border border-border p-3">
              {categories.length === 0 && (
                <span className="text-xs text-muted-foreground">
                  No categories available
                </span>
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
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {editing ? "Save changes" : "Create product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
