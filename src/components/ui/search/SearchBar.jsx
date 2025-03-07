const SearchBar = ({
  searchFilters,
  onChange,
  onSubmit,
  onClear,
  categories,
  onToggleCategory,
}) => {
  return (
    <div className="">
      <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-600 sm:text-6xl dark:text-neutral-200">
            Find The Best One
          </h1>
          <p className="mt-3 text-gray-600 dark:text-neutral-400">
            Grab The Best Deals
          </p>
          <div className="relative mx-auto mt-7 max-w-2xl sm:mt-12">
            <form
              onSubmit={onSubmit}
              className="mb-8 flex flex-wrap items-center justify-center"
            >
              <div className="flex max-w-3xl flex-grow overflow-hidden rounded-lg shadow-lg">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchFilters.search || ""}
                  onChange={(e) =>
                    onChange({ ...searchFilters, search: e.target.value })
                  }
                  className="flex-grow bg-white px-4 py-3 text-zinc-900 focus:outline-none dark:bg-zinc-800 dark:text-zinc-100"
                />
                <div className="flex bg-white dark:bg-zinc-800">
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Min"
                      value={searchFilters.minPrice || ""}
                      onChange={(e) =>
                        onChange({ ...searchFilters, minPrice: e.target.value })
                      }
                      className="w-24 border-l border-zinc-200 bg-white py-3 pr-2 pl-8 text-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      placeholder="Max"
                      value={searchFilters.maxPrice || ""}
                      onChange={(e) =>
                        onChange({ ...searchFilters, maxPrice: e.target.value })
                      }
                      className="w-24 border-l border-zinc-200 bg-white py-3 pr-2 pl-8 text-zinc-900 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-600 px-6 py-3 text-white transition-colors duration-300 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={onClear}
                    className="bg-rose-600 px-4 py-3 text-white transition-colors duration-300 hover:bg-rose-700 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onToggleCategory(cat.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none ${
                    searchFilters.categories &&
                    searchFilters.categories.includes(cat.id)
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            {/* SVG Decoration (Optional) */}
            <div className="absolute end-0 top-0 hidden -translate-y-12 translate-x-20 md:block">
              <svg
                className="h-auto w-16 text-orange-500"
                width={121}
                height={135}
                viewBox="0 0 121 135"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164"
                  stroke="currentColor"
                  strokeWidth={10}
                  strokeLinecap="round"
                />
                <path
                  d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5"
                  stroke="currentColor"
                  strokeWidth={10}
                  strokeLinecap="round"
                />
                <path
                  d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874"
                  stroke="currentColor"
                  strokeWidth={10}
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="absolute start-0 bottom-0 hidden -translate-x-32 translate-y-10 md:block">
              <svg
                className="h-auto w-40 text-cyan-500"
                width={347}
                height={188}
                viewBox="0 0 347 188"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426"
                  stroke="currentColor"
                  strokeWidth={7}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
