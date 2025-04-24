
import { Edit, Search, Trash2, User } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"
import { USER_ROLES } from "../../constants"
import Badge from "../ui/Badge"
import Button from "../ui/Button"
import Modal from "../ui/Modal"
import TableFooter from "../ui/TableFooter"
import Text from "../ui/Text"

const UserTable = ({ users, pagination, onPageChange, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteUser, setDeleteUser] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.first_name && user.first_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.last_name && user.last_name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleDelete = async () => {
    if (!deleteUser) return

    setIsDeleting(true)
    try {
      await onDelete(deleteUser.id)
      toast.success("User deleted successfully")
      setDeleteUser(null)
    } catch (error) {
      toast.error("Failed to delete user")
    } finally {
      setIsDeleting(false)
    }
  }

  const getRoleBadge = (role) => {
    const roleMap = {
      [USER_ROLES.ADMIN]: { variant: "danger", label: "Admin" },
      [USER_ROLES.STORE_OWNER]: { variant: "primary", label: "Store Owner" },
      [USER_ROLES.CUSTOMER]: { variant: "secondary", label: "Customer" },
    }

    const { variant, label } = roleMap[role] || { variant: "secondary", label: role }

    return <Badge variant={variant}>{label}</Badge>
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm transition-colors focus:border-purple-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-800 dark:text-white"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
        <Button variant="primary" size="sm" onClick={() => onEdit(null)}>
          Add User
        </Button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-zinc-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
          <thead className="bg-gray-50 dark:bg-zinc-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Joined
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-zinc-700 dark:bg-zinc-900">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        {user.profile_picture ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={user.profile_picture || "/placeholder.svg"}
                            alt={user.username}
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-zinc-700">
                            <User className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <Text weight="medium">
                          {user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.username}
                        </Text>
                        <Text size="sm" muted>
                          @{user.username}
                        </Text>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Text>{user.email}</Text>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{getRoleBadge(user.role)}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Badge variant={user.is_active ? "success" : "secondary"} size="sm">
                      {user.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Text>{new Date(user.date_joined).toLocaleDateString()}</Text>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        leftIcon={<Edit className="h-4 w-4" />}
                        onClick={() => onEdit(user)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        leftIcon={<Trash2 className="h-4 w-4" />}
                        onClick={() => setDeleteUser(user)}
                        disabled={user.role === USER_ROLES.ADMIN}
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
                  <Text muted>No users found</Text>
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
        isOpen={!!deleteUser}
        onClose={() => setDeleteUser(null)}
        title="Delete User"
        footer={
          <Modal.Footer
            onCancel={() => setDeleteUser(null)}
            onConfirm={handleDelete}
            confirmText="Delete User"
            confirmVariant="danger"
            isLoading={isDeleting}
          />
        }
      >
        <Text>
          Are you sure you want to delete <strong>{deleteUser?.username}</strong>? This action cannot be undone.
        </Text>
      </Modal>
    </>
  )
}

export default UserTable
