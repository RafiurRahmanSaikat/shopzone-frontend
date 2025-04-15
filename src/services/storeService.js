import api from "./api"
import { API_ENDPOINTS } from "../constants"

const storeService = {
  // Get all stores
  getStores: async (params = {}) => {
    return api.get(API_ENDPOINTS.STORES, { params })
  },

  // Get store by ID
  getStore: async (id) => {
    return api.get(API_ENDPOINTS.STORE_DETAILS(id))
  },

  // Get stores for current user (filtered by owner in backend)
  getMyStores: async () => {
    return api.get(API_ENDPOINTS.STORES, { params: { owner: "me" } })
  },

  // Create a new store
  createStore: async (storeData) => {
    const formData = new FormData()

    // Convert storeData to FormData
    Object.keys(storeData).forEach((key) => {
      if (key === "category_ids" && Array.isArray(storeData[key])) {
        storeData[key].forEach((category) => {
          formData.append("category_ids", category)
        })
      } else if (key === "logo" && storeData[key] instanceof File) {
        formData.append("logo", storeData[key])
      } else if (key === "banner_image" && storeData[key] instanceof File) {
        formData.append("banner_image", storeData[key])
      } else {
        formData.append(key, storeData[key])
      }
    })

    return api.post(API_ENDPOINTS.STORES, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },

  // Update an existing store
  updateStore: async (id, storeData) => {
    const formData = new FormData()

    // Convert storeData to FormData
    Object.keys(storeData).forEach((key) => {
      if (key === "category_ids" && Array.isArray(storeData[key])) {
        storeData[key].forEach((category) => {
          formData.append("category_ids", category)
        })
      } else if (key === "logo" && storeData[key] instanceof File) {
        formData.append("logo", storeData[key])
      } else if (key === "banner_image" && storeData[key] instanceof File) {
        formData.append("banner_image", storeData[key])
      } else {
        formData.append(key, storeData[key])
      }
    })

    return api.put(API_ENDPOINTS.STORE_DETAILS(id), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  },

  // Delete a store
  deleteStore: async (id) => {
    return api.delete(API_ENDPOINTS.STORE_DETAILS(id))
  },

  // Get products for a store
  getStoreProducts: async (storeId, params = {}) => {
    return api.get(`${API_ENDPOINTS.STORE_DETAILS(storeId)}/products/`, { params })
  },

  // Get orders for a store
  getStoreOrders: async (storeId, params = {}) => {
    return api.get(`${API_ENDPOINTS.STORE_DETAILS(storeId)}/orders/`, { params })
  },
}

export default storeService
