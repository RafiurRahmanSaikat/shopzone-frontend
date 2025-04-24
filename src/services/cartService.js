import { API_ENDPOINTS } from "../constants";
import api from "./api";

const cartService = {
  // Get cart items
  getCart: async () => {
    return api.get(API_ENDPOINTS.CART);
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1) => {
    return api.post(API_ENDPOINTS.CART, {
      product: productId,
      quantity,
    });
  },

  // Update cart item quantity
  updateCartItem: async (cartItemId, quantity) => {
    return api.put(`${API_ENDPOINTS.CART}${cartItemId}/`, {
      quantity,
    });
  },

  // Remove item from cart
  removeFromCart: async (cartItemId) => {
    return api.delete(`${API_ENDPOINTS.CART}${cartItemId}/`);
  },

  // Clear cart
  clearCart: async () => {
    return api.delete(API_ENDPOINTS.CART);
  },
};

export default cartService;
