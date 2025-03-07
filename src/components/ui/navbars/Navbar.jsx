import {
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Package,
  ScanFace,
  Search,
  Settings,
  Sun,
  UserRoundPlus,
  X,
} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import { useTheme } from "../../../theme/useTheme";

const Navbar = () => {
  const { currentTheme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const searchInputRef = useRef(null);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Focus search input when search is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
      setIsSearchOpen(false);
    }
  };

  // Common links for all users
  const commonLinks = [
    { href: "/", icon: <Home className="h-4 w-4" />, label: "Home" },
    {
      href: "/all_products",
      icon: <Package className="h-4 w-4" />,
      label: "Products",
    },
  ];

  // Auth-specific links
  const authLinks = user
    ? [
        {
          href: "/dashboard",
          icon: <LayoutDashboard className="h-4 w-4" />,
          label: "Dashboard",
        },
        {
          href: "/dashboard/profile",
          icon: <Settings className="h-4 w-4" />,
          label: "Profile",
        },
        {
          href: "#",
          icon: <LogOut className="h-4 w-4" />,
          label: "Logout",
          action: logout,
        },
      ]
    : [
        {
          href: "/login",
          icon: <ScanFace className="h-4 w-4" />,
          label: "Login",
        },
        {
          href: "/signup",
          icon: <UserRoundPlus className="h-4 w-4" />,
          label: "Register",
        },
      ];

  // Cart link (only for authenticated users)
  // const cartLink = user
  //   ? {
  //       href: "/dashboard/cart",
  //       icon: <ShoppingCart className="h-4 w-4" />,
  //       label: "Cart",
  //     }
  //   : null;

  // Combine all links
  const navLinks = [...commonLinks];
  // if (cartLink) navLinks.push(cartLink);
  navLinks.push(...authLinks);

  const ThemeToggleButton = () => (
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
  );

  const NavLink = ({ href, icon, label, action }) => (
    <Link
      to={href}
      onClick={(e) => {
        if (action) {
          e.preventDefault();
          action();
        }
      }}
      className="inline-flex items-center rounded-full px-4 py-2 transition-colors hover:bg-violet-500 hover:text-white dark:text-white dark:hover:bg-gray-700"
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Link>
  );

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 mx-auto mt-4 w-full max-w-7xl px-4 md:w-[90%]">
      <div className="rounded-3xl bg-white/80 px-4 py-3 shadow-md backdrop-blur-lg dark:bg-zinc-800/90">
        <div className="mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                ShopZone
              </span>
            </Link>
          </div>

          {/* Search button (mobile) or search bar (desktop) */}
          <div className="ml-4 flex-1 md:mx-4 md:max-w-md">
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-gray-300 bg-white/80 px-4 py-2 pr-10 text-sm focus:border-violet-500 focus:outline-none dark:border-gray-700 dark:bg-zinc-800/90 dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden items-center rounded-full border border-gray-300 bg-white/80 px-4 py-2 text-sm text-gray-500 hover:border-violet-500 hover:text-violet-600 md:flex dark:border-gray-700 dark:bg-zinc-800/90 dark:text-gray-400 dark:hover:border-violet-400 dark:hover:text-violet-400"
              >
                <Search className="mr-2 h-4 w-4" />
                <span>Search...</span>
              </button>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-1 md:flex">
            {navLinks.map((link) => (
              <NavLink key={link.href + link.label} {...link} />
            ))}
            <ThemeToggleButton />
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center md:hidden">
            {!isSearchOpen && (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="mr-2 rounded-full p-2 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <Search className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full p-2 text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-3 space-y-2 border-t border-gray-200 pt-3 md:hidden dark:border-gray-700">
            {navLinks.map((link) => (
              <div key={link.href + link.label} className="px-2">
                <NavLink {...link} />
              </div>
            ))}
            <div className="px-2 pt-2">
              <ThemeToggleButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

// import {
//   Home,
//   LayoutDashboard,
//   ListChecks,
//   LogOut,
//   Menu,
//   Moon,
//   Package,
//   ScanFace,
//   Settings,
//   ShoppingCart,
//   Store,
//   Sun,
//   UserRoundPlus,
//   Users,
// } from "lucide-react";
// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { sidebarLinks } from "../../../constants";
// import AuthContext from "../../../context/AuthContext";
// import { useTheme } from "../../../theme/useTheme";

// const Navbar = () => {
//   const { currentTheme, toggleTheme } = useTheme();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { user, logout } = useContext(AuthContext);

//   let navLinks = [];

//   if (user) {
//     navLinks.push(
//       { href: "/", icon: <Home className="h-4 w-4" />, label: "Home" },
//       {
//         href: "/dashboard",
//         icon: <LayoutDashboard className="h-4 w-4" />,
//         label: "Dashboard",
//       },
//       {
//         href: "#",
//         icon: <LogOut className="h-4 w-4" />,
//         label: "Logout",
//         action: logout,
//       },
//     );

//     const roleIcons = {
//       Profile: <Settings className="h-4 w-4" />,
//       Users: <Users className="h-4 w-4" />,
//       Products: <Package className="h-4 w-4" />,
//       Stores: <Store className="h-4 w-4" />,
//       Orders: <ListChecks className="h-4 w-4" />,
//       "My Orders": <ListChecks className="h-4 w-4" />,
//       Cart: <ShoppingCart className="h-4 w-4" />,
//       Manage: <Store className="h-4 w-4" />,
//     };

//     const roleLinks = sidebarLinks[user.role] || [];
//     roleLinks.forEach((link) => {
//       navLinks.unshift({
//         href: link.path,
//         icon: roleIcons[link.name] || <Settings className="h-4 w-4" />, // Default to Settings if no match
//         label: link.name,
//       });
//     });
//   } else {
//     navLinks.push(
//       {
//         href: "/login",
//         icon: <ScanFace className="h-4 w-4" />,
//         label: "Login",
//       },
//       {
//         href: "/signup",
//         icon: <UserRoundPlus className="h-4 w-4" />,
//         label: "Register",
//       },
//     );
//   }

//   const ThemeToggleButton = () => (
//     <button
//       onClick={toggleTheme}
//       className="rounded-lg p-2 transition-colors hover:bg-purple-400 dark:text-white"
//       aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
//     >
//       {currentTheme === "dark" ? (
//         <Sun className="h-5 w-5" />
//       ) : (
//         <Moon className="h-5 w-5" />
//       )}
//     </button>
//   );

//   const NavLink = ({ href, icon, label, action }) => (
//     <Link
//       to={href}
//       onClick={(e) => {
//         if (action) {
//           e.preventDefault();
//           action();
//         }
//       }}
//       className="inline-flex items-center rounded-full px-4 py-2 transition-colors hover:bg-violet-500 hover:text-white dark:text-white dark:hover:bg-gray-700"
//     >
//       {icon}
//       <span className="ml-2">{label}</span>
//     </Link>
//   );

//   return (
//     <nav className="fixed top-0 right-0 left-0 z-50 mx-auto mt-4 w-3/4 rounded-3xl shadow-sm backdrop-blur-2xl dark:bg-white/5">
//       <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-4">
//         <div className="flex items-center">
//           <Link to="/" className="flex items-center space-x-3">
//             <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
//               ShopZone
//             </span>
//           </Link>
//         </div>

//         <div className="hidden items-center space-x-1 md:flex">
//           {navLinks.map((link) => (
//             <NavLink key={link.href} {...link} />
//           ))}
//           <ThemeToggleButton />
//         </div>

//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="rounded-full p-2 transition-colors hover:bg-white/10 md:hidden"
//           aria-label="Toggle menu"
//           aria-expanded={isMenuOpen}
//         >
//           <Menu className="h-6 w-6" />
//         </button>
//       </div>

//       {isMenuOpen && (
//         <div className="px-4 pb-4 md:hidden">
//           {navLinks.map((link) => (
//             <NavLink key={link.href} {...link} />
//           ))}
//           <div className="mt-2">
//             <ThemeToggleButton />
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
