import { ProductModal, TableFooter } from "@components";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import UseFetch from "../../../hooks/UseFetch";
import { handleDeleteRequest } from "../../../utils/Actions";
import Spinner from "../Spinner";

export const ProductActions = ({ product, onEdit, onDelete }) => (
  <div className="flex space-x-2">
    <button
      onClick={() => onEdit(product)}
      className="rounded-full p-2 text-blue-600 transition-colors duration-200 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900/20"
    >
      <Pencil className="h-4 w-4" />
    </button>
    <button
      onClick={() => onDelete(product.id)}
      className="rounded-full p-2 text-red-600 transition-colors duration-200 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  </div>
);

export const ProductTable = ({ products, onEdit, onDelete }) => (
  <div className="h-full overflow-auto">
    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
      <thead className="border-1 border-gray-500 dark:border-gray-50">
        <tr>
          {[
            "Product",
            "Price",
            "Stock",
            "Rating",
            "Review",
            "Category",
            "Actions",
          ].map((header) => (
            <th
              key={header}
              className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase dark:text-neutral-200"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white dark:divide-neutral-700 dark:bg-neutral-900">
        {products?.map((product) => (
          <tr
            key={product.id}
            className="transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-neutral-800"
          >
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <img
                  src={product.image || "placeholder.jpg"}
                  alt={product.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {product.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-neutral-400">
                    {product.brand?.name}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-neutral-400">
              ${parseFloat(product.price).toFixed(2)}
            </td>
            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-neutral-400">
              {product.stock}
            </td>
            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-neutral-400">
              {product.rating.toFixed(1)}
            </td>
            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-neutral-400">
              {product.reviews.length}
            </td>
            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-neutral-400">
              {product.categories.map((cat) => cat.name).join(", ")}
            </td>
            <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
              <ProductActions
                product={product}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const ProductList = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { data, loading, error, refetch } = UseFetch(`/products?page=${page}`);

  const handlePageChange = (newPage) => setPage(Math.max(1, Number(newPage)));

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await handleDeleteRequest(`/products/${productId}/`);
        refetch();
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product");
      }
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedProduct(null);
    refetch();
  };

  if (loading) return <Spinner />;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="flex h-[93vh] flex-col rounded-xl bg-white shadow-lg dark:bg-neutral-900">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Products
        </h2>
        <button
          onClick={handleAddProduct}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" /> Add Product
        </button>
      </div>

      {/* Table Container */}

      <div className="flex-1 overflow-hidden p-6 pt-0">
        <ProductTable
          products={data?.results}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </div>

      <div className="mt-auto">
        <TableFooter
          count={data?.count}
          next={data?.next}
          previous={data?.previous}
          handlePageChange={handlePageChange}
        />
      </div>
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialData={selectedProduct}
        onSuccess={refetch}
      />
    </div>
  );
};

export default ProductList;
