import { Search } from "lucide-react";
import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="relative mx-auto mt-10 w-full max-w-xl sm:mt-12">
      <form
        onSubmit={handleSearch}
        className="relative flex items-center rounded-lg border bg-white p-3 shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-lg border-transparent px-4 py-2.5 focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
          placeholder="Search for products..."
        />
        <button
          type="submit"
          className="ml-3 flex size-[46px] items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
        >
          <Search className="size-5" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
