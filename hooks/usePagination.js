/**
 * usePagination - Reusable pagination state management
 * Handles page state, page size, and pagination calculations
 */

import { useCallback, useState } from "react";

/**
 * Hook for managing pagination
 * @param {number} initialPage - Starting page (default: 1)
 * @param {number} initialPageSize - Items per page (default: 10)
 * @returns {object} Pagination state and methods
 */
export function usePagination(initialPage = 1, initialPageSize = 10) {
    const [page, setPage] = useState(initialPage);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const goToPage = useCallback((newPage) => {
        setPage(Math.max(1, newPage));
    }, []);

    const nextPage = useCallback(() => {
        setPage((p) => p + 1);
    }, []);

    const prevPage = useCallback(() => {
        setPage((p) => Math.max(1, p - 1));
    }, []);

    const changePageSize = useCallback((newSize) => {
        setPageSize(newSize);
        setPage(1); // Reset to first page when changing page size
    }, []);

    const calculateTotal = useCallback((itemCount) => {
        return Math.max(1, Math.ceil(itemCount / pageSize));
    }, [pageSize]);

    const calculateOffset = useCallback(() => {
        return (page - 1) * pageSize;
    }, [page, pageSize]);

    return {
        page,
        pageSize,
        goToPage,
        nextPage,
        prevPage,
        changePageSize,
        calculateTotal,
        calculateOffset,
    };
}

/**
 * Hook for managing API paginated responses
 * @param {object} data - API response data with pagination info
 * @param {array} fallback - Fallback items if not paginated
 * @returns {object} Pagination info
 */
export function usePaginationInfo(data = {}, fallback = []) {
    const items = Array.isArray(data) ? data : data?.results || fallback;
    const count = data?.count ?? items.length;
    const pageSize = data?.page_size ?? 10;
    const totalPages = data?.total_pages ?? Math.max(1, Math.ceil(count / pageSize));
    const hasPrevious = Boolean(data?.previous);
    const hasNext = Boolean(data?.next);

    return {
        items,
        count,
        pageSize,
        totalPages,
        hasPrevious,
        hasNext,
    };
}
