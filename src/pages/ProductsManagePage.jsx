import { Package, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Button, Card, Heading, NoData, Spinner, Text } from "../components";
import ProductTable from "../components/dashboard/ProductTable";
import ProductModal from "../components/product/ProductModal";
import UseFetch from "../hooks/UseFetch";
import productService from "../services/productService";

const ProductsManagePage = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([]);

  const { data, loading, error, refetch } = UseFetch(`/products?page=${page}`);
  const { data: storesData } = UseFetch("/stores");
  const { data: categoriesData } = UseFetch("/categories");

  useEffect(() => {
    if (storesData?.results) setStores(storesData.results);
  }, [storesData]);

  useEffect(() => {
    if (categoriesData?.results) setCategories(categoriesData.results);
  }, [categoriesData]);

  const handlePageChange = (newPage) => setPage(Math.max(1, Number(newPage)));

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (productId) => {
    try {
      await productService.deleteProduct(productId);
      toast.success("Product deleted successfully");
      refetch();
    } catch (error) {
      console.error("Error deleting product:", error);
      const errorMessage =
        error.response?.data?.detail || "Failed to delete product";
      toast.error(errorMessage);
    }
    // if (window.confirm("Are you sure you want to delete this product?")) {
    // }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    refetch();
  };

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Heading as="h1" size="h3">
            Products
          </Heading>
          <Text muted>Manage your store products</Text>
        </div>
        <Button
          variant="primary"
          leftIcon={<Plus className="h-4 w-4" />} // Changed icon for clarity
          onClick={handleAdd}
        >
          Add Product
        </Button>
      </div>

      <Card>
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <div className="p-6">
            <NoData
              title="Error Loading Products"
              description={error}
              icon={<Package size={64} className="text-gray-400" />}
              showAction={false}
            />
          </div>
        ) : data?.results?.length === 0 ? (
          <div className="p-6">
            <NoData
              title="No Products Found"
              description="You haven't added any products yet."
              icon={<Package size={64} className="text-gray-400" />}
              actionText="Add Product"
              onActionClick={handleAdd}
            />
          </div>
        ) : (
          <ProductTable
            products={data?.results}
            pagination={{
              count: data?.count,
              next: data?.next,
              previous: data?.previous,
            }}
            onPageChange={handlePageChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </Card>

      {/* Product Modal for Create/Edit */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialData={selectedProduct}
        onSuccess={closeModal}
        stores={stores}
        categories={categories}
      />
    </div>
  );
};

export default ProductsManagePage;
