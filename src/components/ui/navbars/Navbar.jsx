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
      href: "/products",
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

  // Combine all links
  const navLinks = [...commonLinks, ...authLinks];

  // Improved theme toggle with animation
  const ThemeToggleButton = () => (
    <button
      onClick={toggleTheme}
      className="relative overflow-hidden rounded-full p-2 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
    >
      {currentTheme === "dark" ? (
        <Sun className="ease-spring h-5 w-5 text-amber-400 transition-transform duration-300" />
      ) : (
        <Moon className="ease-spring h-5 w-5 text-indigo-600 transition-transform duration-300" />
      )}
      <span className="absolute inset-0 rounded-full bg-gray-200 opacity-0 transition-opacity dark:bg-zinc-700"></span>
    </button>
  );

  // Enhanced NavLink with animation and active state
  const NavLink = ({ href, icon, label, action }) => {
    const isActive = location.pathname === href;

    return (
      <Link
        to={href}
        onClick={(e) => {
          if (action) {
            e.preventDefault();
            action();
          }
        }}
        className={`group flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-300 ${
          isActive
            ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300"
            : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-200 dark:hover:bg-indigo-900/30 dark:hover:text-indigo-300"
        }`}
      >
        <span
          className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-indigo-600 dark:text-indigo-300" : ""}`}
        >
          {icon}
        </span>
        <span className={isActive ? "font-medium" : ""}>{label}</span>
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 mx-auto mt-4 w-full max-w-7xl px-4 md:w-[90%]">
      <div className="rounded-3xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur-lg transition-all duration-300 dark:bg-zinc-900/90 dark:shadow-gray-950/20">
        <div className="mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 hover:from-indigo-600 hover:to-purple-700">
                ShopZone
              </span>
            </Link>
          </div>

          {/* Search bar */}
          <div className="ml-4 flex-1 md:mx-4 md:max-w-md">
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="focus:ring-opacity-50 w-full rounded-full border border-gray-300 bg-white/90 px-4 py-2 pr-10 text-sm shadow-sm transition-all duration-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none dark:border-gray-700 dark:bg-zinc-800/90 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-800"
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden w-full items-center rounded-full border border-gray-300 bg-white/90 px-4 py-2 text-sm text-gray-500 shadow-sm transition-all duration-300 hover:border-indigo-500 hover:text-indigo-600 md:flex dark:border-gray-700 dark:bg-zinc-800/90 dark:text-gray-400 dark:hover:border-indigo-400 dark:hover:text-indigo-400"
              >
                <Search className="mr-2 h-4 w-4" />
                <span>Search products...</span>
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
                className="mr-2 rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <Search className="h-5 w-5" />
              </button>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu with animation */}
        {isMenuOpen && (
          <div className="mt-3 space-y-2 border-t border-gray-200 pt-3 md:hidden dark:border-gray-700">
            {navLinks.map((link) => (
              <div key={link.href + link.label} className="px-2">
                <NavLink {...link} />
              </div>
            ))}
            <div className="flex items-center justify-between px-2 pt-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Theme
              </span>
              <ThemeToggleButton />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
