import { Activity, Bell, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "../../../theme/useTheme";

const SearchBar = () => (
  <div className="relative hidden md:block">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
      <Search className="size-4 text-gray-400 dark:text-white/60" />
    </div>
    <input
      type="text"
      className="block w-full rounded-lg border-gray-200 bg-white py-2 pr-16 pl-10 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
      placeholder="Search"
    />
  </div>
);

export default function DashboardHeader() {
  const { toggleTheme, currentTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 flex w-full border-b bg-white py-2.5 lg:pl-64 dark:border-neutral-700 dark:bg-neutral-800">
      <nav className="mx-auto flex w-full items-center px-4 sm:px-6">
        <div className="flex w-full items-center justify-between">
          <SearchBar />
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="rounded-lg p-2 transition-colors hover:bg-purple-400 dark:text-white"
              aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
            >
              {currentTheme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <button className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-neutral-700">
              <Bell className="h-5 w-5 text-gray-500 dark:text-white" />
            </button>
            <button className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-neutral-700">
              <Activity className="h-5 w-5 text-gray-500 dark:text-white" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
