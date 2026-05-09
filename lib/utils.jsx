/**
 * Shared utility functions for components and hooks
 * Re-exports centralized utilities for backward compatibility
 */

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with conflict resolution
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export {
  formatDate,
  formatDateTime,
  formatPrice,
  formatTime,
  toNumber,
} from "@/lib/formatters";

// Re-export status utilities
export {
  getNextStatus,
  getStatusBorderColor,
  getStatusIcon,
  getValidNextStatuses,
  isFinalStatus,
  normalizeStatus,
  ORDER_STATUSES,
  statusVariant,
} from "@/lib/status";

/**
 * Debounce function for search and filter
 */
export function debounce(fn, delay = 300) {
  let timeoutId;
  return function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Handle API errors gracefully
 */
export function getErrorMessage(error) {
  if (!error) return "An unknown error occurred";
  if (typeof error === "string") return error;
  if (error.message) return error.message;
  if (error.data?.detail) return error.data.detail;
  if (error.data?.message) return error.data.message;
  return "An error occurred. Please try again.";
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error) {
  if (!error) return false;
  return (
    error.name === "TypeError" ||
    error.isNetworkError ||
    error.message?.includes("Failed to fetch") ||
    error.message?.includes("Cannot reach")
  );
}

/**
 * Check if error is authentication error
 */
export function isAuthError(error) {
  return error?.status === 401 || error?.message?.includes("Unauthorized");
}

/**
 * Calculate pagination info
 */
export function getPaginationInfo(data, items = []) {
  return {
    count: data?.count ?? items.length,
    pageSize: data?.page_size ?? 10,
    totalPages:
      data?.total_pages ??
      Math.max(
        1,
        Math.ceil((data?.count ?? items.length) / (data?.page_size ?? 10)),
      ),
    hasPrevious: Boolean(data?.previous),
    hasNext: Boolean(data?.next),
  };
}
