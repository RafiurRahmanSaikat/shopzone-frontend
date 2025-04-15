"use client"

import { useState, useEffect, useContext } from "react"
import { toast } from "react-hot-toast"
import { AuthContext } from "../../contexts/AuthContext"
import { USER_ROLES } from "../../constants"
import Heading from "../../components/ui/Heading"
import Text from "../../components/ui/Text"
import Card from "../../components/ui/Card"
import Modal from "../../components/ui/Modal"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import Grid from "../../components/ui/Grid"
import ProductTable from "../../components/dashboard/ProductTable"
import Spinner from "../../components/ui/Spinner"
import NoData from "../../components/ui/NoData"
import { Package, Upload } from "lucide-react"
import productService from "../../services/productService"
import storeService from "../../services/storeService"

const ProductsManagePage = () => {
  const { user } = useContext(AuthContext)
  const [products, setProducts] = useState([])
  const [stores, setStores] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const initialFormData = {
    name: "",
    description: "",
    price: "",
    stock: "",
    categories: [],
    store: "",
    is_active: true,
  }

  const [formData, setFormData] = useState(initialFormData)

  const fetchProducts = async (page = 1) => {
    setLoading(true)
    try {
      const params = { page }

      // If store owner, only fetch their products
      if (user.role === USER_ROLES.STORE_OWNER) {
        params.store_owner = user.id
      }

      const response = await productService.getProducts(params)
      setProducts(response.data.results)
      setPagination({
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
      })
      setError(null)
    } catch (err) {
      setError("Failed to load products")
      toast.error("Failed to load products")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchStores = async () => {
    try {
      const params = {}

      // If store owner, only fetch their stores
      if (user.role === USER_ROLES.STORE_OWNER) {
        params.owner = user.id
      }

      const response = await storeService.getStores(params)
      setStores(response.data.results)
    } catch (err) {
      console.error("Failed to load stores:", err)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await productService.getCategories()
      setCategories(response.data.results)
    } catch (err) {
      console.error("Failed to load categories:", err)
    }
  }

  useEffect(() => {
    fetchProducts()
    fetchStores()
    fetchCategories()
  }, [user])

  const handlePageChange = (page) => {
    fetchProducts(page)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target
    setFormData((prev) => {
      if (checked) {
        return {
          ...prev,
          categories: [...prev.categories, value],
        }
      } else {
        return {
          ...prev,
          categories: prev.categories.filter((cat) => cat !== value),
        }
      }
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleEdit = (product) => {
    setSelectedProduct(product)
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categories: product.categories.map((cat) => cat.id.toString()),
      store: product.store?.id.toString() || "",
      is_active: product.is_active,
    })
    setImagePreview(product.image)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setSelectedProduct(null)
    setFormData(initialFormData)
    setImageFile(null)
    setImagePreview(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (productId) => {
    try {
      await productService.deleteProduct(productId)
      toast.success("Product deleted successfully")
      fetchProducts()
    } catch (error) {
      toast.error("Failed to delete product")
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const productData = {
        ...formData,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
      }

      if (imageFile) {
        productData.image = imageFile
      }

      if (selectedProduct) {
        // Update existing product
        await productService.updateProduct(selectedProduct.id, productData)
        toast.success("Product updated successfully")
      } else {
        // Create new product
        await productService.createProduct(productData)
        toast.success("Product created successfully")
      }

      setIsModalOpen(false)
      fetchProducts()
    } catch (error) {
      toast.error(selectedProduct ? "Failed to update product" : "Failed to create product")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Heading as="h1" size="h3">
            Products
          </Heading>
          <Text muted>
            {user?.role === USER_ROLES.STORE_OWNER ? "Manage your store products" : "Manage all products in the system"}
          </Text>
        </div>
        <Button variant="primary" leftIcon={<Package className="h-4 w-4" />} onClick={handleAdd}>
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
        ) : products.length === 0 ? (
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
            products={products}
            pagination={pagination}
            onPageChange={handlePageChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </Card>

      {/* Product Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedProduct ? "Edit Product" : "Add New Product"}
        footer={
          <Modal.Footer
            onCancel={() => setIsModalOpen(false)}
            onConfirm={handleSubmit}
            confirmText={selectedProduct ? "Update Product" : "Create Product"}
            isLoading={isSubmitting}
          />
        }
      >
        <form onSubmit={handleSubmit}>
          <Grid cols={1} gap={4} className="mb-4">
            <Input label="Product Name" name="name" value={formData.name} onChange={handleInputChange} required />

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none dark:border-gray-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-purple-800"
                required
              ></textarea>
            </div>

            <Grid cols={2} gap={4}>
              <Input
                label="Price ($)"
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={handleInputChange}
                required
              />

              <Input
                label="Stock"
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Store</label>
              <select
                name="store"
                value={formData.store}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none dark:border-gray-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-purple-800"
                required
              >
                <option value="">Select Store</option>
                {stores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Categories</label>
              <div className="flex flex-wrap gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category.id}`}
                      value={category.id}
                      checked={formData.categories.includes(category.id.toString())}
                      onChange={handleCategoryChange}
                      className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600"
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Product Image</label>
              <div className="mb-4 flex items-center justify-center">
                {imagePreview ? (
                  <div className="relative h-40 w-40">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Product Preview"
                      className="h-full w-full rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null)
                        setImagePreview(null)
                      }}
                      className="absolute top-0 right-0 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="mb-3 h-10 w-10 text-gray-400" />
                      <Text size="sm" muted className="text-center">
                        Click to upload
                      </Text>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={formData.is_active}
                onChange={handleInputChange}
                className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600"
              />
              <label htmlFor="is_active" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Active (visible to customers)
              </label>
            </div>
          </Grid>
        </form>
      </Modal>
    </div>
  )
}

export default ProductsManagePage
