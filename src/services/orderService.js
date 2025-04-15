import api from "./api"
import { API_ENDPOINTS } from "../constants"

const orderService = {
  // Get all orders
  getOrders: async (params = {}) => {
    return api.get(API_ENDPOINTS.ORDERS, { params })
  },

  // Get order by ID
  getOrder: async (id) => {
    return api.get(API_ENDPOINTS.ORDER_DETAILS(id))
  },

  // Create a new order
  createOrder: async (orderData) => {
    return api.post(API_ENDPOINTS.ORDERS, orderData)
  },

  // Update order status
  updateOrderStatus: async (id, status) => {
    return api.patch(API_ENDPOINTS.UPDATE_ORDER_STATUS(id), { status })
  },

  // Cancel an order
  cancelOrder: async (id, reason) => {
    return api.post(`${API_ENDPOINTS.ORDER_DETAILS(id)}/cancel/`, { reason })
  },

  // Get order history for current user (same as getOrders for customers)
  getOrderHistory: async () => {
    return api.get(API_ENDPOINTS.ORDERS)
  },

  // Save shipping information
  saveShippingInfo: async (shippingData) => {
    return api.post(`${API_ENDPOINTS.ORDERS}/shipping-info/`, shippingData)
  },

  // Process payment
  processPayment: async (paymentData) => {
    return api.post(`${API_ENDPOINTS.ORDERS}/process-payment/`, paymentData)
  },
}

export default orderService
