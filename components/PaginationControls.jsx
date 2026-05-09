/**
 * Pagination Controls Component
 * Reusable pagination UI
 */

"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationControls({
  page = 1,
  totalPages = 1,
  onPreviousPage,
  onNextPage,
  onGoToPage,
  showPageNumbers = true,
  maxPageButtons = 5,
}) {
  const getPaginationButtons = () => {
    if (!showPageNumbers || totalPages <= 1) return [];

    const pages = [];
    const maxButtons = Math.min(maxPageButtons, totalPages);
    const half = Math.floor(maxButtons / 2);

    let start = Math.max(1, page - half);
    let end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pages = getPaginationButtons();

  return (
    <div className="flex items-center justify-center gap-1">
      <Button
        variant="outline"
        size="sm"
        onClick={onPreviousPage}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {pages.map((p) => (
        <Button
          key={p}
          variant={p === page ? "default" : "outline"}
          size="sm"
          onClick={() => onGoToPage(p)}
          className="min-w-8"
        >
          {p}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={onNextPage}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {totalPages > 0 && (
        <span className="text-xs text-muted-foreground ml-2">
          Page {page} of {totalPages}
        </span>
      )}
    </div>
  );
}
