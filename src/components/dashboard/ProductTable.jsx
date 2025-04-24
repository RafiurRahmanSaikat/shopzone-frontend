"use client";

import { Edit, Eye, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import TableFooter from "../ui/TableFooter";
import Text from "../ui/Text";

const ProductTable = ({
  products,
  pagination,
  onPageChange,
  onEdit,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDelete = async () => {
    if (!deleteProduct) return;

    setIsDeleting(true);
    try {
      await onDelete(deleteProduct.id);
      toast.success("Product deleted successfully");
      setDeleteProduct(null);
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="m-4 flex items-center justify-between">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full rounded-lg border border-gray-300 bg-white py-2 pr-4 pl-10 text-sm transition-colors focus:border-purple-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-800 dark:text-white"
          />
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-zinc-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
          <thead className="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-zinc-700 dark:bg-zinc-900">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 dark:hover:bg-zinc-800"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4">
                        <Text weight="medium" className="line-clamp-1">
                          {product.name}
                        </Text>
                        <Text size="sm" muted className="line-clamp-1">
                          {product.description}
                        </Text>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Text weight="medium">${product.price}</Text>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Text>{product.stock}</Text>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {product.categories?.map((category) => (
                        <Badge key={category.id} variant="secondary" size="sm">
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge
                      variant={product.is_active ? "success" : "secondary"}
                      size="sm"
                    >
                      {product.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                    <div className="flex justify-end space-x-2">
                      <Button
                        as={Link}
                        to={`/products/${product.id}`}
                        variant="secondary"
                        size="sm"
                        leftIcon={<Eye className="h-4 w-4" />}
                      >
                        View
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        leftIcon={<Edit className="h-4 w-4" />}
                        onClick={() => onEdit(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        leftIcon={<Trash2 className="h-4 w-4" />}
                        onClick={() => setDeleteProduct(product)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">
                  <Text muted>No products found</Text>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination && (
        <TableFooter
          count={pagination.count}
          next={pagination.next}
          previous={pagination.previous}
          handlePageChange={onPageChange}
        />
      )}

      <Modal
        isOpen={!!deleteProduct}
        onClose={() => setDeleteProduct(null)}
        title="Delete Product"
        footer={
          <Modal.Footer
            onConfirm={handleDelete}
            confirmText="Delete Product"
            confirmVariant="danger"
            onCancel={() => setDeleteProduct(null)}
            isLoading={isDeleting}
          />
        }
      >
        <Text>
          Are you sure you want to delete <strong>{deleteProduct?.name}</strong>
          ? This action cannot be undone.
        </Text>
      </Modal>
    </>
  );
};

export default ProductTable;
