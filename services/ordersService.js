/**
 * Orders API Service
 * Centralized order-related API calls and logic
 */

import { API_ENDPOINTS } from "@/constants/api";
import { apiFetch } from "@/lib/fetchClient";

/**
 * Fetch user's orders
 */
export async function fetchOrders(page = 1) {
    return apiFetch(`${API_ENDPOINTS.ORDERS.LIST}?page=${page}`);
}

/**
 * Fetch single order details
 */
export async function fetchOrder(id) {
    return apiFetch(API_ENDPOINTS.ORDERS.DETAIL(id));
}

/**
 * Create a new order
 */
export async function createOrder(orderData) {
    return apiFetch(API_ENDPOINTS.ORDERS.CREATE, {
        method: "POST",
        body: orderData,
    });
}

/**
 * Update order status
 */
export async function updateOrderStatus(id, status) {
    return apiFetch(API_ENDPOINTS.ORDERS.UPDATE_STATUS(id), {
        method: "PATCH",
        body: { status },
    });
}

/**
 * Cancel order
 */
export async function cancelOrder(id, reason = "") {
    return apiFetch(API_ENDPOINTS.ORDERS.CANCEL(id), {
        method: "POST",
        body: { reason },
    });
}

/**
 * Get order status options
 * Returns valid status transitions from current status
 */
export function getValidStatusTransitions(currentStatus) {
    const transitions = {
        pending: ["processing", "cancelled"],
        processing: ["shipped", "cancelled"],
        shipped: ["delivered"],
        delivered: [],
        cancelled: [],
    };

    const key = (currentStatus || "").toLowerCase();
    return transitions[key] || [];
}

/**
 * Check if order can be modified (not in final state)
 */
export function canModifyOrder(status) {
    const finalStates = ["delivered", "cancelled"];
    return !finalStates.includes((status || "").toLowerCase());
}

/**
 * Format order for display
 */
export function formatOrderForDisplay(order) {
    return {
        ...order,
        orderId: order.order_id || order.id,
        items: order.order_products || order.items || [],
        createdAt: order.created_at,
        updatedAt: order.updated_at,
    };
}
