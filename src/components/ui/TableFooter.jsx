"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

const Pagination = ({ next, previous, onPageChange }) => (
  <div className="inline-flex gap-x-2">
    <button
      disabled={!previous}
      onClick={() => {
        if (previous) {
          onPageChange(new URL(previous).searchParams.get("page"))
        }
      }}
      className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:opacity-50 dark:border-zinc-700 dark:bg-transparent dark:text-zinc-300 dark:hover:bg-zinc-800"
    >
      <ChevronLeft className="size-4" />
      Prev
    </button>

    <button
      disabled={!next}
      onClick={() => {
        if (next) {
          onPageChange(new URL(next).searchParams.get("page"))
        }
      }}
      className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-medium text-gray-600 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:opacity-50 dark:border-zinc-700 dark:bg-transparent dark:text-zinc-300 dark:hover:bg-zinc-800"
    >
      Next
      <ChevronRight className="size-4" />
    </button>
  </div>
)

const TableFooter = ({ count, next, previous, handlePageChange }) => {
  return (
    <div className="gap-3 border-t border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between dark:border-zinc-700">
      <div>
        <p className="text-sm text-gray-600 dark:text-zinc-400">
          <span className="font-semibold text-gray-600 dark:text-zinc-200">{count} </span>
          results
        </p>
      </div>
      <Pagination next={next} previous={previous} onPageChange={handlePageChange} />
    </div>
  )
}

export default TableFooter
