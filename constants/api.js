/**
 * Centralized API constants and configuration
 * - API endpoints
 * - Request/response constants
 * - Configuration values
 */

// API Endpoints
export const API_ENDPOINTS = {
    // Authentication
    AUTH: {
        LOGIN: "/token/",
        REGISTER: "/accounts/users/register/",
        ME: "/accounts/users/me/",
        LOGOUT: "/token/logout/",
        REFRESH: "/token/refresh/",
    },

    // Products
    PRODUCTS: {
        LIST: "/products/",
        MY_PRODUCTS: "/products/my_products",
        DETAIL: (id) => `/products/${id}/`,
        CREATE: "/products/",
        UPDATE: (id) => `/products/${id}/`,
        DELETE: (id) => `/products/${id}/`,
        REVIEWS: (productId) => `/products/${productId}/add_review/`,
    },

    // Orders
    ORDERS: {
        LIST: "/orders/",
        DETAIL: (id) => `/orders/${id}/`,
        CREATE: "/orders/",
        UPDATE_STATUS: (id) => `/orders/${id}/update_status/`,
        CANCEL: (id) => `/orders/${id}/cancel/`,
    },

    // Categories
    CATEGORIES: {
        LIST: "/categories/",
    },

    // Brands
    BRANDS: {
        LIST: "/brands/",
    },

    // Stores
    STORES: {
        LIST: "/stores/",
        MY_STORES: "/stores/my_stores",
        DETAIL: (id) => `/stores/${id}/`,
        CREATE: "/stores/",
        UPDATE: (id) => `/stores/${id}/`,
        DELETE: (id) => `/stores/${id}/`,
    },

    // Store Categories
    STORE_CATEGORIES: {
        LIST: "/store_categories/",
        CREATE: "/store_categories/",
        DELETE: (id) => `/store_categories/${id}/`,
    },
};

// Pagination defaults
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
};

// Product statuses
export const PRODUCT_STATUSES = {
    Pending: "Pending",
    Shipped: "Processing",
    Cancelled: "Shipped",
    Confirmed: "Delivered",
    Delivere: "Cancelled",

};

// Stock levels
export const STOCK_LEVELS = {
    LOW_THRESHOLD: 5,
    CRITICAL_THRESHOLD: 1,
};

// Cache durations (in milliseconds)
export const CACHE_DURATION = {
    SHORT: 5 * 60 * 1000,      // 5 minutes
    MEDIUM: 15 * 60 * 1000,    // 15 minutes
    LONG: 60 * 60 * 1000,      // 1 hour
};
