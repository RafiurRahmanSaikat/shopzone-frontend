import { Upload, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UseFetch from "../../../hooks/UseFetch";
import { handlePostRequest, handlePutRequest } from "../../../utils/Actions";
import uploadImage from "../../../utils/UploadImage";
import Modal from "./Modal";

const ProductModal = ({ isOpen, onClose, initialData = null, onSuccess }) => {
  // Local state
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: null,
    brand_id: "",
    category_ids: [],
    store_id: "",
  });

  // Fetch options for dropdowns/checkboxes
  const { data: stores } = UseFetch("/stores");
  const { data: brands } = UseFetch("/brands");
  const { data: categories } = UseFetch("/categories");

  // When editing, extract the proper IDs from nested objects
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price || "",
        stock: initialData.stock || "",
        // Expecting nested objects – adjust if necessary:
        brand_id: initialData.brand ? initialData.brand.id : "",
        category_ids: initialData.categories
          ? initialData.categories.map((cat) => cat.id)
          : [],
        store_id: initialData.store ? initialData.store.id : "",
      });
      if (initialData.image) {
        setImage({
          preview: initialData.image,
          existing: true,
        });
      }
    } else {
      // If no initial data, reset the form
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        brand_id: "",
        category_ids: [],
        store_id: "",
      });
      setImage(null);
    }
  }, [initialData]);

  // Handle file selection for image upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage({
        file,
        preview: URL.createObjectURL(file),
        existing: false,
      });
    }
  };

  // Handle regular input changes (text, number, and dropdowns)
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  // Handle toggling categories via checkboxes
  const handleCategoryCheckboxChange = (categoryId) => {
    setFormData((prev) => {
      const selected = prev.category_ids;
      if (selected.includes(categoryId)) {
        return {
          ...prev,
          category_ids: selected.filter((id) => id !== categoryId),
        };
      } else {
        return { ...prev, category_ids: [...selected, categoryId] };
      }
    });
  };

  // Submit handler: first upload image (if any), then send JSON payload using axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = null;
      // If there is a new image file, upload it first.
      if (image?.file) {
        imageUrl = await uploadImage(image.file);
      } else if (image?.existing) {
        imageUrl = image.preview;
      } else {
        // If no image is provided, you can leave it as null
        imageUrl = null;
      }

      // Prepare payload (make sure numbers are properly parsed)
      const payload = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
        image: imageUrl,
        brand_id: parseInt(formData.brand_id, 10),
        category_ids: formData.category_ids.map((id) => parseInt(id, 10)),
        store_id: parseInt(formData.store_id, 10),
      };

      let response;
      if (initialData) {
        // Update an existing product (PUT)
        response = await handlePutRequest(
          `/products/${initialData.id}/`,
          payload,
        );
      } else {
        // Create a new product (POST)
        response = await handlePostRequest(`/products/`, payload);
      }

      // Check for a successful status code (2xx)
      if (response.status >= 200 && response.status < 300) {
        toast.success(
          `Product ${initialData ? "updated" : "created"} successfully!`,
        );
        onSuccess?.();
        onClose();
      } else {
        throw new Error(response.data.message || "Failed to save product");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${initialData ? "Edit" : "Add"} Product`}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Image Upload Section */}
        <div className="relative mt-1">
          {image?.preview ? (
            <div className="relative h-40 w-full overflow-hidden rounded-lg">
              <img
                src={image.preview}
                alt="Preview"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 rounded-full bg-white/80 p-1 hover:bg-white dark:bg-black/50 dark:hover:bg-black/80"
              >
                <X className="h-4 w-4 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          ) : (
            <label className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:border-gray-400 dark:border-gray-600 dark:bg-gray-700/50 dark:hover:border-gray-500">
              <Upload className="mb-2 h-6 w-6 text-gray-400 dark:text-gray-500" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Upload Product Image
              </span>
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </label>
          )}
        </div>

        {/* Product Name and Price */}
        <div className="grid gap-2 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-zinc-900 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-zinc-900 dark:text-white"
              required
              step="0.01"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 w-full rounded border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-zinc-900 dark:text-white"
            rows="3"
            required
          />
        </div>

        {/* Stock and Store */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-zinc-900 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Store
            </label>
            <select
              name="store_id"
              value={formData.store_id}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-zinc-900 dark:text-white"
              required
            >
              <option value="">Select Store</option>
              {stores?.results?.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Brand and Categories */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Brand
            </label>
            <select
              name="brand_id"
              value={formData.brand_id}
              onChange={handleChange}
              className="mt-1 w-full rounded border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-zinc-900 dark:text-white"
              required
            >
              <option value="">Select Brand</option>
              {brands?.results?.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
              Categories
            </label>
            <div className="mt-1 flex flex-wrap gap-2">
              {categories?.results?.map((category) => (
                <label
                  key={category.id}
                  className="inline-flex items-center space-x-1"
                >
                  <input
                    type="checkbox"
                    name="category_ids"
                    value={category.id}
                    checked={formData.category_ids.includes(category.id)}
                    onChange={() => handleCategoryCheckboxChange(category.id)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {category.name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-end space-x-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-gray-200 px-3 py-1 text-gray-800 hover:bg-gray-300 dark:bg-zinc-900 dark:text-white dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {isSubmitting ? "Saving..." : initialData ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductModal;
