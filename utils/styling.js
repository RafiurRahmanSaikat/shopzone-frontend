/**
 * Styling utilities for semantic class generation
 * Ensures consistent use of CSS variables and theming
 */

/**
 * Get status badge styling classes
 */
export const STATUS_STYLES = {
    delivered: {
        badge: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
        border: "border-emerald-500/30 dark:border-emerald-400/40",
        text: "text-emerald-700 dark:text-emerald-400",
    },
    shipped: {
        badge: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
        border: "border-blue-500/30 dark:border-blue-400/40",
        text: "text-blue-700 dark:text-blue-400",
    },
    processing: {
        badge: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
        border: "border-amber-500/30 dark:border-amber-400/40",
        text: "text-amber-700 dark:text-amber-400",
    },
    pending: {
        badge: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
        border: "border-amber-500/30 dark:border-amber-400/40",
        text: "text-amber-700 dark:text-amber-400",
    },
    cancelled: {
        badge: "bg-red-500/10 text-red-700 dark:text-red-400",
        border: "border-red-500/30 dark:border-red-400/40",
        text: "text-red-700 dark:text-red-400",
    },
};

/**
 * Get status styling by status name
 */
export function getStatusStyles(status) {
    const key = (status || "").toLowerCase();
    return STATUS_STYLES[key] || STATUS_STYLES.pending;
}

/**
 * Get status border color class
 */
export function getStatusBorderClasses(status) {
    return getStatusStyles(status).border;
}

/**
 * Get status badge classes
 */
export function getStatusBadgeClasses(status) {
    return getStatusStyles(status).badge;
}

/**
 * Get status text color classes
 */
export function getStatusTextClasses(status) {
    return getStatusStyles(status).text;
}

/**
 * Stock status styling
 */
export const STOCK_STYLES = {
    inStock: "text-emerald-700 dark:text-emerald-400",
    lowStock: "text-amber-700 dark:text-amber-400",
    outOfStock: "text-red-700 dark:text-red-400",
};

/**
 * Get stock status styling
 */
export function getStockStatusClass(stock) {
    if (stock === undefined || stock === null) return STOCK_STYLES.inStock;
    if (stock === 0) return STOCK_STYLES.outOfStock;
    if (stock <= 5) return STOCK_STYLES.lowStock;
    return STOCK_STYLES.inStock;
}
