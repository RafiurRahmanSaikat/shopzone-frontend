/**
 * useFilters - Reusable filter state management
 * Handles multiple filter state with reset functionality
 */

import { useCallback, useState } from "react";

/**
 * Hook for managing multiple filter states
 * @param {object} initialFilters - Initial filter values
 * @returns {object} Filter state and methods
 */
export function useFilters(initialFilters = {}) {
    const [filters, setFilters] = useState(initialFilters);

    const setFilter = useCallback((key, value) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value,
        }));
    }, []);

    const setMultipleFilters = useCallback((newFilters) => {
        setFilters((prev) => ({
            ...prev,
            ...newFilters,
        }));
    }, []);

    const resetFilters = useCallback(() => {
        setFilters(initialFilters);
    }, [initialFilters]);

    const clearFilter = useCallback((key) => {
        setFilters((prev) => {
            const updated = { ...prev };
            delete updated[key];
            return updated;
        });
    }, []);

    const hasActiveFilters = useCallback(() => {
        return Object.keys(filters).some((key) => filters[key] !== initialFilters[key]);
    }, [filters, initialFilters]);

    return {
        filters,
        setFilter,
        setMultipleFilters,
        resetFilters,
        clearFilter,
        hasActiveFilters,
    };
}
