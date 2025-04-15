import Pagination from "./Pagination";

export default function TableFooter({
  count,
  next,
  previous,
  handlePageChange,
}) {
  return (
    <div className="gap-3 border-t border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between dark:border-neutral-700">
      <div>
        <p className="text-sm text-gray-600 dark:text-neutral-400">
          <span className="font-semibold text-gray-600 dark:text-neutral-200">
            {count}{" "}
          </span>
          results
        </p>
      </div>
      <Pagination
        next={next}
        previous={previous}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
