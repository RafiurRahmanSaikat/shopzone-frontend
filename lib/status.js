/**
 * Centralized status management utilities
 * - Status normalization
 * - Badge variants
 * - Status constants
 * - No duplicated logic across components
 */

/**
 * Valid order statuses
 */
export const ORDER_STATUSES = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
];

/**
 * Normalize status string to standard format
 * @param {string} status - Raw status string
 * @returns {string} Normalized status
 */
export function normalizeStatus(status) {
    const raw = (status || "").toString().trim();
    if (!raw) return "Pending";
    return (
        ORDER_STATUSES.find((s) => s.toLowerCase() === raw.toLowerCase()) || raw
    );
}

/**
 * Get badge variant for status
 * @param {string} status - Order status
 * @returns {string} Badge variant (default, secondary, outline, destructive)
 */
export function statusVariant(status) {
    const s = normalizeStatus(status).toLowerCase();
    if (s === "delivered") return "default";
    if (s === "shipped") return "secondary";
    if (s === "pending" || s === "confirmed" || s === "processing") return "outline";
    if (s === "cancelled") return "destructive";
    return "outline";
}

/**
 * Get Tailwind border color for status
 * @param {string} status - Order status
 * @returns {string} Tailwind color class
 */
export function getStatusBorderColor(status) {
    const s = (status || "").toLowerCase();
    if (s === "delivered") return "border-emerald-500/30 dark:border-emerald-400/40";
    if (s === "shipped") return "border-blue-500/30 dark:border-blue-400/40";
    if (s === "confirmed" || s === "processing")
        return "border-amber-500/30 dark:border-amber-400/40";
    if (s === "cancelled") return "border-red-500/30 dark:border-red-400/40";
    return "border-zinc-300 dark:border-zinc-700";
}

/**
 * Get emoji icon for status
 * @param {string} status - Order status
 * @returns {string} Status emoji
 */
export function getStatusIcon(status) {
    const s = (status || "").toLowerCase();
    if (s === "delivered") return "✅";
    if (s === "shipped") return "📦";
    if (s === "confirmed" || s === "processing") return "⏳";
    if (s === "cancelled") return "❌";
    return "📋";
}

/**
 * Check if status is final (cannot change)
 * @param {string} status - Order status
 * @returns {boolean} True if final status
 */
export function isFinalStatus(status) {
    const s = normalizeStatus(status).toLowerCase();
    return s === "delivered" || s === "cancelled";
}

/**
 * Get next possible status in workflow
 * @param {string} currentStatus - Current order status
 * @returns {string|null} Next status or null if final
 */
export function getNextStatus(currentStatus) {
    const current = normalizeStatus(currentStatus).toLowerCase();
    const workflow = {
        pending: "processing",
        processing: "shipped",
        shipped: "delivered",
        delivered: null,
        cancelled: null,
    };
    return workflow[current] || null;
}

/**
 * Get all valid next statuses
 * @param {string} currentStatus - Current order status
 * @returns {string[]} Array of possible next statuses
 */
export function getValidNextStatuses(currentStatus) {
    const next = getNextStatus(currentStatus);
    const nextStatus = next ? [next] : [];
    // Cancelled can be reached from most states
    const canCancel = !isFinalStatus(currentStatus);
    return canCancel ? [...nextStatus, "Cancelled"] : nextStatus;
}
