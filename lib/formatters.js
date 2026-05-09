/**
 * Centralized formatting utilities
 * - Price formatting with currency
 * - Date formatting with locale support
 * - No duplicated code across components
 */

/**
 * Safely parse numeric values with fallback
 */
export function toNumber(value, fallback = 0) {
    const num = typeof value === "string" ? Number(value) : value;
    return Number.isNaN(num) || num == null ? fallback : num;
}

/**
 * Format price with USD currency
 * @param {number|string} value - Price value
 * @returns {string} Formatted price (e.g., "$123.45")
 */
export function formatPrice(value) {
    const num = toNumber(value);
    if (num === 0 && value === 0) return "$0.00";
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(num);
}

/**
 * Format date string to locale format
 * @param {string} dateStr - ISO date string
 * @param {object} options - Format options (month, day, year)
 * @returns {string} Formatted date (e.g., "Jan 15, 2026")
 */
export function formatDate(dateStr, options = {}) {
    if (!dateStr) return "—";
    try {
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: options.month || "short",
            day: options.day || "numeric",
            year: options.year || "numeric",
        });
    } catch {
        return "—";
    }
}

/**
 * Format time from date string
 * @param {string} dateStr - ISO date string
 * @returns {string} Time (e.g., "2:30 PM")
 */
export function formatTime(dateStr) {
    if (!dateStr) return "—";
    try {
        return new Date(dateStr).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    } catch {
        return "—";
    }
}

/**
 * Format combined date and time
 * @param {string} dateStr - ISO date string
 * @returns {string} Date and time (e.g., "Jan 15, 2026 at 2:30 PM")
 */
export function formatDateTime(dateStr) {
    if (!dateStr) return "—";
    try {
        const date = new Date(dateStr);
        return `${formatDate(dateStr)} at ${date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        })}`;
    } catch {
        return "—";
    }
}
