import { API_ENDPOINTS } from "../constants";
import api from "./api";

const productService = {
  // Get all products with optional filters
  getProducts: async (params = {}) => {
    return api.get(API_ENDPOINTS.PRODUCTS, { params });
  },

  // Get featured products - using regular products endpoint with featured param
  getFeaturedProducts: async () => {
    return api.get(API_ENDPOINTS.PRODUCTS, { params: { featured: true } });
  },

  // Get product by ID
  getProduct: async (id) => {
    return api.get(API_ENDPOINTS.PRODUCT_DETAILS(id));
  },

  // Create a new product
  createProduct: async (productData) => {
    const formData = new FormData();

    // Convert productData to FormData
    Object.keys(productData).forEach((key) => {
      if (key === "category_ids" && Array.isArray(productData[key])) {
        productData[key].forEach((category) => {
          formData.append("category_ids", category);
        });
      } else if (key === "image" && productData[key] instanceof File) {
        formData.append("image", productData[key]);
      } else {
        formData.append(key, productData[key]);
      }
    });

    return api.post(API_ENDPOINTS.PRODUCTS, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Update an existing product
  // updateProduct: async (id, productData) => {
  //   const formData = new FormData();

  //   // Convert productData to FormData
  //   Object.keys(productData).forEach((key) => {
  //     if (key === "category_ids" && Array.isArray(productData[key])) {
  //       productData[key].forEach((category) => {
  //         formData.append("category_ids", category);
  //       });
  //     } else if (key === "image" && productData[key] instanceof File) {
  //       formData.append("image", productData[key]);
  //     } else {
  //       formData.append(key, productData[key]);
  //     }
  //   });

  //   return api.put(API_ENDPOINTS.PRODUCT_DETAILS(id), formData, {
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   });
  // },
  updateProduct: async (id, productData) => {
    const formData = new FormData();

    // Append all product data properly
    Object.entries(productData).forEach(([key, value]) => {
      if (key === "category_ids" && Array.isArray(value)) {
        value.forEach((catId) => {
          formData.append("category_ids", parseInt(catId, 10));
        });
      } else if (key === "image" && value instanceof File) {
        formData.append("image", value);
      } else {
        formData.append(key, value);
      }
    });

    return api.put(`/products/${id}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // Delete a product
  deleteProduct: async (id) => {
    return api.delete(API_ENDPOINTS.PRODUCT_DETAILS(id));
  },

  // Get product categories
  getCategories: async () => {
    return api.get(API_ENDPOINTS.CATEGORIES);
  },

  // Add a review to a product
  addReview: async (productId, reviewData) => {
    return api.post(API_ENDPOINTS.PRODUCT_REVIEWS(productId), reviewData);
  },

  // Get reviews for a product
  getReviews: async (productId) => {
    return api.get(API_ENDPOINTS.PRODUCT_REVIEWS(productId));
  },
};

export default productService;
