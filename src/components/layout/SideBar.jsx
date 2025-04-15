import { User, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Modified to accept external state control
const Sidebar = ({
  links = [],
  user,
  isSidebarOpen,
  setSidebarOpen,
  toggleSidebar,
}) => {
  const location = useLocation();

  // Use the shared toggleSidebar function passed from parent
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {/* Overlay - only visible when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform overflow-y-auto border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out dark:border-neutral-700 dark:bg-neutral-800 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar Header with Close Button (Mobile Only) */}
          <div className="flex items-center justify-between p-4">
            <Link
              to="/"
              className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-xl font-bold text-transparent"
              onClick={closeSidebar}
            >
              ShopZone
            </Link>
            <button
              onClick={toggleSidebar}
              className="rounded p-1 text-gray-500 hover:bg-gray-100 lg:hidden dark:text-gray-400 dark:hover:bg-neutral-700"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-4 flex flex-col space-y-2 px-3">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeSidebar}
                className={`flex items-center gap-3.5 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                  location.pathname === link.path
                    ? "bg-gray-200 text-gray-900 dark:bg-neutral-700 dark:text-white"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-700"
                }`}
              >
                {link.icon && <span>{link.icon}</span>}
                {link.name}
              </Link>
            ))}
          </nav>

          {/* User Profile Section */}
          {user && (
            <div className="mt-auto border-t border-gray-200 px-4 py-4 dark:border-neutral-700">
              <div className="flex items-center gap-3">
                {user?.profile_picture ? (
                  <img
                    src={user.profile_picture}
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full border-2 border-gray-300 object-cover shadow-sm"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-700">
                    <User
                      size={20}
                      className="text-gray-500 dark:text-gray-300"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.get_full_name || user?.username || "Guest"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email || "No email"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Spacer - creates space for fixed sidebar on desktop */}
      <div className="lg:ps-64" />
    </>
  );
};

export default Sidebar;
