/**
 * Products API Service
 * Centralized product-related API calls and logic
 */

import { API_ENDPOINTS } from "@/constants/api";
import { apiFetch } from "@/lib/fetchClient";

/**
 * Fetch all products (public)
 */
export async function fetchProducts(pageSize = "all", page = 1) {
    return apiFetch(`${API_ENDPOINTS.PRODUCTS.LIST}?page_size=${pageSize}&page=${page}`, {
        auth: false,
    });
}

/**
 * Fetch single product details
 */
export async function fetchProduct(id) {
    return apiFetch(API_ENDPOINTS.PRODUCTS.DETAIL(id), {
        auth: false,
    });
}

/**
 * Fetch current user's products
 */
export async function fetchMyProducts(page = 1) {
    return apiFetch(`${API_ENDPOINTS.PRODUCTS.MY_PRODUCTS}?page=${page}`);
}

/**
 * Create a new product
 */
export async function createProduct(data) {
    return apiFetch(API_ENDPOINTS.PRODUCTS.CREATE, {
        method: "POST",
        body: data,
        isFormData: true,
    });
}

/**
 * Update product
 */
export async function updateProduct(id, data) {
    return apiFetch(API_ENDPOINTS.PRODUCTS.UPDATE(id), {
        method: "PATCH",
        body: data,
        isFormData: true,
    });
}

/**
 * Delete product
 */
export async function deleteProduct(id) {
    return apiFetch(API_ENDPOINTS.PRODUCTS.DELETE(id), {
        method: "DELETE",
    });
}

/**
 * Add or update product review
 */
export async function submitReview(productId, reviewData) {
    return apiFetch(API_ENDPOINTS.PRODUCTS.REVIEWS(productId), {
        method: "POST",
        body: reviewData,
    });
}

/**
 * Delete product review
 */
export async function deleteReview(productId) {
    return apiFetch(API_ENDPOINTS.PRODUCTS.REVIEWS(productId), {
        method: "DELETE",
    });
}

/**
 * Search products with filters
 */
export async function searchProducts(filters = {}) {
    const params = new URLSearchParams();

    if (filters.search) params.append("search", filters.search);
    if (filters.category) params.append("category", filters.category);
    if (filters.brand) params.append("brand", filters.brand);
    if (filters.priceMin) params.append("price_min", filters.priceMin);
    if (filters.priceMax) params.append("price_max", filters.priceMax);
    if (filters.page) params.append("page", filters.page);
    if (filters.pageSize) params.append("page_size", filters.pageSize);

    const query = params.toString();
    const url = query ? `${API_ENDPOINTS.PRODUCTS.LIST}?${query}` : API_ENDPOINTS.PRODUCTS.LIST;

    return apiFetch(url, {
        auth: filters.auth !== false,
    });
}

/**
 * Fetch all categories
 */
export async function fetchCategories() {
    return apiFetch(API_ENDPOINTS.CATEGORIES.LIST, {
        auth: false,
    });
}

/**
 * Fetch all brands
 */
export async function fetchBrands() {
    return apiFetch(API_ENDPOINTS.BRANDS.LIST, {
        auth: false,
    });
}
