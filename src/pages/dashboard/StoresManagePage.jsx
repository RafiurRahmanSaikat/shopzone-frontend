"use client"

import { useState, useEffect, useContext } from "react"
import { toast } from "react-hot-toast"
import { AuthContext } from "../../contexts/AuthContext"
import { USER_ROLES } from "../../constants"
import Heading from "../../components/ui/Heading"
import Text from "../../components/ui/Text"
import Grid from "../../components/ui/Grid"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import Modal from "../../components/ui/Modal"
import Spinner from "../../components/ui/Spinner"
import NoData from "../../components/ui/NoData"
import StoreCard from "../../components/dashboard/StoreCard"
import { StoreIcon, Upload } from "lucide-react"
import storeService from "../../services/storeService"

const StoresManagePage = () => {
  const { user } = useContext(AuthContext)
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedStore, setSelectedStore] = useState(null)
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [bannerFile, setBannerFile] = useState(null)
  const [bannerPreview, setBannerPreview] = useState(null)

  const initialFormData = {
    name: "",
    description: "",
    category: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    is_active: true,
  }

  const [formData, setFormData] = useState(initialFormData)

  const fetchStores = async () => {
    setLoading(true)
    try {
      const params = {}

      // If store owner, only fetch their stores
      if (user.role === USER_ROLES.STORE_OWNER) {
        params.owner = user.id
      }

      const response = await storeService.getStores(params)
      setStores(response.data.results)
      setError(null)
    } catch (err) {
      setError("Failed to load stores")
      toast.error("Failed to load stores")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStores()
  }, [user])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleLogoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLogoFile(file)
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  const handleBannerChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setBannerFile(file)
      setBannerPreview(URL.createObjectURL(file))
    }
  }

  const handleEdit = (store) => {
    setSelectedStore(store)
    setFormData({
      name: store.name,
      description: store.description || "",
      category: store.category || "",
      address: store.address || "",
      phone: store.phone || "",
      email: store.email || "",
      website: store.website || "",
      is_active: store.is_active,
    })
    setLogoPreview(store.logo)
    setBannerPreview(store.banner_image)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setSelectedStore(null)
    setFormData(initialFormData)
    setLogoFile(null)
    setLogoPreview(null)
    setBannerFile(null)
    setBannerPreview(null)
    setIsModalOpen(true)
  }

  const handleDelete = async (storeId) => {
    try {
      await storeService.deleteStore(storeId)
      toast.success("Store deleted successfully")
      fetchStores()
    } catch (error) {
      toast.error("Failed to delete store")
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const storeData = { ...formData }

      if (logoFile) {
        storeData.logo = logoFile
      }

      if (bannerFile) {
        storeData.banner_image = bannerFile
      }

      if (selectedStore) {
        // Update existing store
        await storeService.updateStore(selectedStore.id, storeData)
        toast.success("Store updated successfully")
      } else {
        // Create new store
        await storeService.createStore(storeData)
        toast.success("Store created successfully")
      }

      setIsModalOpen(false)
      fetchStores()
    } catch (error) {
      toast.error(selectedStore ? "Failed to update store" : "Failed to create store")
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
            Stores
          </Heading>
          <Text muted>
            {user?.role === USER_ROLES.STORE_OWNER ? "Manage your stores" : "Manage all stores in the system"}
          </Text>
        </div>
        <Button variant="primary" leftIcon={<StoreIcon className="h-4 w-4" />} onClick={handleAdd}>
          Add Store
        </Button>
      </div>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Spinner size="lg" />
        </div>
      ) : error ? (
        <NoData
          title="Error Loading Stores"
          description={error}
          icon={<StoreIcon size={64} className="text-gray-400" />}
          showAction={false}
        />
      ) : stores.length === 0 ? (
        <NoData
          title="No Stores Found"
          description="You haven't added any stores yet."
          icon={<StoreIcon size={64} className="text-gray-400" />}
          actionText="Add Store"
          onActionClick={handleAdd}
        />
      ) : (
        <Grid cols={3} gap={6}>
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </Grid>
      )}

      {/* Store Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedStore ? "Edit Store" : "Add New Store"}
        footer={
          <Modal.Footer
            onCancel={() => setIsModalOpen(false)}
            onConfirm={handleSubmit}
            confirmText={selectedStore ? "Update Store" : "Create Store"}
            isLoading={isSubmitting}
          />
        }
      >
        <form onSubmit={handleSubmit}>
          <Grid cols={1} gap={4} className="mb-4">
            <Input label="Store Name" name="name" value={formData.name} onChange={handleInputChange} required />

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

            <Input
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="e.g. Electronics, Fashion, etc."
            />

            <Input label="Address" name="address" value={formData.address} onChange={handleInputChange} />

            <Grid cols={2} gap={4}>
              <Input label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />

              <Input label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
            </Grid>

            <Input
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="https://example.com"
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Store Logo</label>
              <div className="mb-4 flex items-center justify-center">
                {logoPreview ? (
                  <div className="relative h-32 w-32">
                    <img
                      src={logoPreview || "/placeholder.svg"}
                      alt="Logo Preview"
                      className="h-full w-full rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setLogoFile(null)
                        setLogoPreview(null)
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
                  <label className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="mb-3 h-8 w-8 text-gray-400" />
                      <Text size="sm" muted className="text-center">
                        Upload Logo
                      </Text>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleLogoChange} />
                  </label>
                )}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Banner Image</label>
              <div className="mb-4 flex items-center justify-center">
                {bannerPreview ? (
                  <div className="relative h-40 w-full">
                    <img
                      src={bannerPreview || "/placeholder.svg"}
                      alt="Banner Preview"
                      className="h-full w-full rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setBannerFile(null)
                        setBannerPreview(null)
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
                  <label className="flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="mb-3 h-10 w-10 text-gray-400" />
                      <Text size="sm" muted className="text-center">
                        Upload Banner Image
                      </Text>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleBannerChange} />
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

export default StoresManagePage
