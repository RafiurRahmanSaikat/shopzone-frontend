import {
  Home,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Menu,
  Moon,
  Package,
  ScanFace,
  Settings,
  ShoppingCart,
  Store,
  Sun,
  UserRoundPlus,
  Users,
} from "lucide-react";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { sidebarLinks } from "../../../constants";
import AuthContext from "../../../context/AuthContext";
import { useTheme } from "../../../theme/useTheme";

const Navbar = () => {
  const { currentTheme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  let navLinks = [];

  if (user) {
    navLinks.push(
      { href: "/", icon: <Home className="h-4 w-4" />, label: "Home" },
      {
        href: "/dashboard",
        icon: <LayoutDashboard className="h-4 w-4" />,
        label: "Dashboard",
      },
      {
        href: "#",
        icon: <LogOut className="h-4 w-4" />,
        label: "Logout",
        action: logout,
      },
    );

    const roleIcons = {
      Profile: <Settings className="h-4 w-4" />,
      Users: <Users className="h-4 w-4" />,
      Products: <Package className="h-4 w-4" />,
      Stores: <Store className="h-4 w-4" />,
      Orders: <ListChecks className="h-4 w-4" />,
      "My Orders": <ListChecks className="h-4 w-4" />,
      Cart: <ShoppingCart className="h-4 w-4" />,
      Manage: <Store className="h-4 w-4" />,
    };

    const roleLinks = sidebarLinks[user.role] || [];
    roleLinks.forEach((link) => {
      navLinks.unshift({
        href: link.path,
        icon: roleIcons[link.name] || <Settings className="h-4 w-4" />, // Default to Settings if no match
        label: link.name,
      });
    });
  } else {
    navLinks.push(
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
    );
  }

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
    <nav className="fixed top-0 right-0 left-0 z-50 mx-auto mt-4 w-3/4 rounded-3xl shadow-sm backdrop-blur-2xl dark:bg-white/5">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-3">
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
              ShopZone
            </span>
          </Link>
        </div>

        <div className="hidden items-center space-x-1 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
          <ThemeToggleButton />
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-full p-2 transition-colors hover:bg-white/10 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {isMenuOpen && (
        <div className="px-4 pb-4 md:hidden">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
          <div className="mt-2">
            <ThemeToggleButton />
          </div>
        </div>
      )}
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
//     <nav className="mx-auto mt-4 w-[90vw] rounded-3xl bg-gray-100 shadow-sm backdrop-blur-2xl dark:bg-white/5">
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
