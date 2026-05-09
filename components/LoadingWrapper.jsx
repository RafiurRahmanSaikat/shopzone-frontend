/**
 * Loading state wrapper component
 * Provides a consistent loading, error, and empty state experience
 */

"use client";

import { ErrorDisplay } from "@/components/ErrorDisplay";

export function LoadingWrapper({
  isLoading,
  error,
  isEmpty,
  onRetry,
  loadingComponent,
  emptyComponent,
  errorTitle = "Failed to load",
  children,
}) {
  if (isLoading && loadingComponent) {
    return loadingComponent;
  }

  if (error) {
    return <ErrorDisplay error={error} onRetry={onRetry} title={errorTitle} />;
  }

  if (isEmpty && emptyComponent) {
    return emptyComponent;
  }

  return children;
}

/**
 * Hook for managing async data with loading, error, and empty states
 */
export function useLoadingState(data, loading, error) {
  const isEmpty =
    !loading && !error && (!data || (Array.isArray(data) && data.length === 0));

  return {
    isLoading: loading,
    error,
    isEmpty,
    hasData:
      !loading && !error && data && (!Array.isArray(data) || data.length > 0),
  };
}
