import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UseFetch from "../../hooks/UseFetch";
import { handlePatchRequest, handlePostRequest } from "../../utils/Actions";
import { Modal } from "../ui";

const StoreModal = ({ isOpen, onClose, initialData = null, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    location: "",
    category_ids: [],
  });

  // Fetch available store categories (for checkbox list)
  const { data: categories } = UseFetch("/stores/storeCategory");

  // When editing, use `store_categories` (if available) to pre‑populate category_ids.
  useEffect(() => {
    if (initialData) {
      let categoryIds = [];
      if (
        initialData.store_categories &&
        Array.isArray(initialData.store_categories) &&
        initialData.store_categories.length
      ) {
        // Map the nested store_categories to an array of numbers.
        categoryIds = initialData.store_categories.map((cat) => Number(cat.id));
      } else if (
        Array.isArray(initialData.category_ids) &&
        initialData.category_ids.length
      ) {
        categoryIds = initialData.category_ids.map((id) => Number(id));
      }
      setFormData({
        name: initialData.name || "",
        address: initialData.address || "",
        location: initialData.location || "",
        category_ids: categoryIds,
      });
    } else {
      // Reset the form for creating a new store.
      setFormData({
        name: "",
        address: "",
        location: "",
        category_ids: [],
      });
    }
  }, [initialData]);

  // Handle text/textarea field changes.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle a category checkbox. (Make sure to work with numbers.)
  const handleCategoryCheckboxChange = (categoryId) => {
    const id = Number(categoryId);
    setFormData((prev) => {
      const selected = prev.category_ids;
      if (selected.includes(id)) {
        return {
          ...prev,
          category_ids: selected.filter((catId) => catId !== id),
        };
      } else {
        return { ...prev, category_ids: [...selected, id] };
      }
    });
  };

  // Handle form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let response;
      if (initialData) {
        // PATCH request for update.
        response = await handlePatchRequest(
          `/stores/${initialData.id}/`,
          formData,
        );
      } else {
        // POST request for create.
        response = await handlePostRequest("/stores/", formData);
      }
      if (response.status >= 200 && response.status < 300) {
        toast.success(
          `Store ${initialData ? "updated" : "created"} successfully!`,
        );
        onSuccess?.();
        onClose();
      } else {
        throw new Error(response.data?.message || "Failed to save store");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${initialData ? "Edit" : "Add"} Store`}
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4 text-zinc-800 dark:text-zinc-100"
      >
        {/* Store Name */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border p-2 dark:bg-zinc-700"
            required
          />
        </div>

        {/* Store Address */}
        <div>
          <label className="block text-sm font-medium">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border p-2 dark:bg-zinc-700"
            rows="3"
            required
          />
        </div>

        {/* Store Location */}
        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border p-2 dark:bg-zinc-700"
            required
          />
        </div>

        {/* Store Categories as Checkboxes */}
        <div>
          <label className="block text-sm font-medium">Categories</label>
          <div className="mt-1 flex flex-wrap gap-2">
            {categories?.results.map((category) => (
              <label
                key={category.id}
                className="inline-flex items-center space-x-1"
              >
                <input
                  type="checkbox"
                  name="category_ids"
                  value={category.id}
                  checked={formData.category_ids.includes(Number(category.id))}
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

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {isSubmitting ? "Saving..." : initialData ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default StoreModal;
