import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../../../theme/useTheme";

const Sidebar = ({ links = [], user, logout }) => {
  // console.log(user);
  const { ThemeToggleButton } = useTheme();
  const location = useLocation();
  const [isMobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen((prev) => !prev);

  const navLinks = (
    <nav className="mt-4 flex flex-col space-y-2 px-3">
      {links.map((link) => (
        <Link
          key={link.path}
          to={link.path}
          onClick={() => setMobileOpen(false)}
          className={`flex items-center gap-3.5 rounded-lg px-2.5 py-2 text-sm ${
            location.pathname === link.path
              ? "bg-gray-200 text-gray-900 dark:bg-neutral-700 dark:text-white"
              : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-700"
          }`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );

  const bottomSection = (
    <div className="border-t border-gray-200 px-4 py-4 dark:border-neutral-700">
      <div className="flex items-center gap-3">
        <img
          src={user?.profile_picture || "/placeholder.jpg"}
          alt="User Avatar"
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {user?.get_full_name || "Guest"}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {user?.email || "No email"}
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <ThemeToggleButton />
        <button
          onClick={logout}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* --- Mobile Header (visible on small screens) --- */}
      <div className="flex items-center justify-between border-b p-4 lg:hidden dark:border-neutral-700">
        <Link
          to="/"
          className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-xl font-bold text-transparent"
        >
          ShopZone
        </Link>
        <button
          onClick={toggleMobileMenu}
          className="text-gray-600 dark:text-gray-300"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- Mobile Drawer --- */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleMobileMenu}
          />
          <aside className="relative flex h-full w-64 flex-col bg-white dark:bg-neutral-800">
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="flex items-center px-6 pt-4">
                  <Link
                    to="/"
                    onClick={toggleMobileMenu}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-xl font-bold text-transparent"
                  >
                    ShopZone
                  </Link>
                </div>
                {navLinks}
              </div>
              {bottomSection}
            </div>
          </aside>
        </div>
      )}

      {/* --- Desktop Sidebar (visible on large screens) --- */}
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-gray-200 bg-white transition-all duration-300 lg:flex lg:flex-col dark:border-neutral-700 dark:bg-neutral-800"
        role="complementary"
      >
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="flex items-center px-6 pt-4">
              <Link
                to="/"
                className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-xl font-bold text-transparent"
              >
                ShopZone
              </Link>
            </div>
            {navLinks}
          </div>
          {bottomSection}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

// import { Link, useLocation } from "react-router-dom";

// const Sidebar = ({ links = [] }) => {
//   const location = useLocation();

//   return (
//     <aside
//       className="fixed inset-y-0 start-0 z-[60] hidden h-full w-[260px] border-e border-gray-200 bg-white transition-all duration-300 lg:block dark:border-neutral-700 dark:bg-neutral-800"
//       role="dialog"
//       tabIndex={-1}
//       aria-label="Sidebar"
//     >
//       <div className="relative flex h-full flex-col">
//         <div className="flex items-center px-6 pt-4">
//           <Link
//             to="/"
//             className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-xl font-bold text-transparent"
//           >
//             ShopZone
//           </Link>
//         </div>

//         <nav className="mt-4 flex flex-col space-y-2 px-3">
//           {links.map((link) => (
//             <Link
//               key={link.path}
//               to={link.path}
//               className={`flex items-center gap-3.5 rounded-lg px-2.5 py-2 text-sm ${
//                 location.pathname === link.path
//                   ? "bg-gray-200 text-gray-900 dark:bg-neutral-700 dark:text-white"
//                   : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-700"
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}
//         </nav>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
