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
import UserTable from "../../components/dashboard/UserTable"
import Spinner from "../../components/ui/Spinner"
import NoData from "../../components/ui/NoData"
import { Users, Upload } from "lucide-react"
import userService from "../../services/userService"

const UsersManagePage = () => {
  const { user } = useContext(AuthContext)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const initialFormData = {
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
    role: USER_ROLES.CUSTOMER,
    phone_number: "",
    address: "",
    is_active: true,
  }

  const [formData, setFormData] = useState(initialFormData)

  // Check if user is admin
  useEffect(() => {
    if (user && user.role !== USER_ROLES.ADMIN) {
      setError("You don't have permission to access this page")
    }
  }, [user])

  const fetchUsers = async (page = 1) => {
    setLoading(true)
    try {
      const response = await userService.getUsers({ page })
      setUsers(response.data.results)
      setPagination({
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
      })
      setError(null)
    } catch (err) {
      setError("Failed to load users")
      toast.error("Failed to load users")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user && user.role === USER_ROLES.ADMIN) {
      fetchUsers()
    }
  }, [user])

  const handlePageChange = (page) => {
    fetchUsers(page)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleEdit = (userData) => {
    if (userData) {
      setSelectedUser(userData)
      setFormData({
        username: userData.username,
        email: userData.email,
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        password: "",
        confirm_password: "",
        role: userData.role,
        phone_number: userData.phone_number || "",
        address: userData.address || "",
        is_active: userData.is_active,
      })
      setImagePreview(userData.profile_picture)
    } else {
      setSelectedUser(null)
      setFormData(initialFormData)
      setImageFile(null)
      setImagePreview(null)
    }
    setIsModalOpen(true)
  }

  const handleDelete = async (userId) => {
    try {
      await userService.deleteUser(userId)
      toast.success("User deleted successfully")
      fetchUsers()
    } catch (error) {
      toast.error("Failed to delete user")
      console.error(error)
    }
  }

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.role) {
      toast.error("Please fill in all required fields")
      return false
    }

    if (!selectedUser && (!formData.password || formData.password.length < 8)) {
      toast.error("Password must be at least 8 characters long")
      return false
    }

    if (!selectedUser && formData.password !== formData.confirm_password) {
      toast.error("Passwords don't match")
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const userData = { ...formData }

      // Remove confirm_password as it's not needed for API
      delete userData.confirm_password

      // Only include password if it's provided (for new users or password changes)
      if (!userData.password) {
        delete userData.password
      }

      if (imageFile) {
        userData.profile_picture = imageFile
      }

      if (selectedUser) {
        // Update existing user
        await userService.updateUser(selectedUser.id, userData)
        toast.success("User updated successfully")
      } else {
        // Create new user
        await userService.createUser(userData)
        toast.success("User created successfully")
      }

      setIsModalOpen(false)
      fetchUsers()
    } catch (error) {
      toast.error(selectedUser ? "Failed to update user" : "Failed to create user")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (error && error === "You don't have permission to access this page") {
    return (
      <NoData
        title="Access Denied"
        description="You don't have permission to access this page."
        icon={<Users size={64} className="text-gray-400" />}
        actionLink="/dashboard"
        actionText="Back to Dashboard"
      />
    )
  }

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Heading as="h1" size="h3">
            Users
          </Heading>
          <Text muted>Manage all users in the system</Text>
        </div>
        <Button variant="primary" leftIcon={<Users className="h-4 w-4" />} onClick={() => handleEdit(null)}>
          Add User
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
              title="Error Loading Users"
              description={error}
              icon={<Users size={64} className="text-gray-400" />}
              showAction={false}
            />
          </div>
        ) : users.length === 0 ? (
          <div className="p-6">
            <NoData
              title="No Users Found"
              description="There are no users in the system."
              icon={<Users size={64} className="text-gray-400" />}
              actionText="Add User"
              onActionClick={() => handleEdit(null)}
            />
          </div>
        ) : (
          <UserTable
            users={users}
            pagination={pagination}
            onPageChange={handlePageChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </Card>

      {/* User Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedUser ? "Edit User" : "Add New User"}
        footer={
          <Modal.Footer
            onCancel={() => setIsModalOpen(false)}
            onConfirm={handleSubmit}
            confirmText={selectedUser ? "Update User" : "Create User"}
            isLoading={isSubmitting}
          />
        }
      >
        <form onSubmit={handleSubmit}>
          <Grid cols={1} gap={4} className="mb-4">
            <Grid cols={2} gap={4}>
              <Input label="First Name" name="first_name" value={formData.first_name} onChange={handleInputChange} />
              <Input label="Last Name" name="last_name" value={formData.last_name} onChange={handleInputChange} />
            </Grid>

            <Grid cols={2} gap={4}>
              <Input label="Username" name="username" value={formData.username} onChange={handleInputChange} required />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Grid>

            {!selectedUser && (
              <Grid cols={2} gap={4}>
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required={!selectedUser}
                />
                <Input
                  label="Confirm Password"
                  name="confirm_password"
                  type="password"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                  required={!selectedUser}
                />
              </Grid>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none dark:border-gray-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-purple-800"
                required
              >
                <option value={USER_ROLES.CUSTOMER}>Customer</option>
                <option value={USER_ROLES.STORE_OWNER}>Store Owner</option>
                <option value={USER_ROLES.ADMIN}>Admin</option>
              </select>
            </div>

            <Input
              label="Phone Number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 transition-colors focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:outline-none dark:border-gray-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-purple-800"
              ></textarea>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">Profile Picture</label>
              <div className="mb-4 flex items-center justify-center">
                {imagePreview ? (
                  <div className="relative h-32 w-32">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Profile Preview"
                      className="h-full w-full rounded-full object-cover"
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
                  <label className="flex h-32 w-32 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-700 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="mb-3 h-8 w-8 text-gray-400" />
                      <Text size="sm" muted className="text-center">
                        Upload Photo
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
                Active Account
              </label>
            </div>
          </Grid>
        </form>
      </Modal>
    </div>
  )
}

export default UsersManagePage
