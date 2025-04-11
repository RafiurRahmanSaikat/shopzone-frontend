import api from "./api"

const userService = {
  // Get all users (admin only)
  getUsers: async (params = {}) => {
    return api.get("/accounts/users/", { params })
  },

  // Get user by ID (admin only)
  getUser: async (id) => {
    return api.get(`/accounts/users/${id}/`)
  },

  // Get current user profile
  getCurrentUser: async () => {
    return api.get("/accounts/users/me/")
  },

  // Update user profile
  updateProfile: async (userData) => {
    const formData = new FormData()

    // Convert userData to FormData
    Object.keys(userData).forEach((key) => {
      if (key === "profile_picture" && userData[key] instanceof File) {
        formData.append("profile_picture", userData[key])
      } else {
        formData.append(key, userData[key])
      }
    })

    return api.patch("/accounts/users/me/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },

  // Create a new user (admin only)
  createUser: async (userData) => {
    return api.post("/accounts/users/", userData)
  },

  // Update a user (admin only)
  updateUser: async (id, userData) => {
    return api.put(`/accounts/users/${id}/`, userData)
  },

  // Delete a user (admin only)
  deleteUser: async (id) => {
    return api.delete(`/accounts/users/${id}/`)
  },

  // Change password
  changePassword: async (passwordData) => {
    return api.post("/accounts/users/change-password/", passwordData)
  },
}

export default userService
