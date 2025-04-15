import { LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../../theme/useTheme";

const DashboardHeader = ({ user, logout }) => {
  const { ThemeToggleButton } = useTheme();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky inset-x-0 top-0 z-[48] flex w-full flex-wrap border-b bg-white py-3 text-sm md:flex-nowrap md:justify-start lg:ps-[260px] dark:border-neutral-700 dark:bg-neutral-800">
      <nav className="mx-auto flex w-full basis-full items-center px-4 sm:px-6">
        <div className="me-5 lg:me-0 lg:hidden">
          {/* Logo */}
          <Link
            to="/"
            className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-xl font-bold text-transparent"
          >
            ShopZone
          </Link>
          {/* End Logo */}
          <div className="ms-1 lg:hidden"></div>
        </div>
        <div className="ms-auto flex w-full items-center justify-end gap-x-3 md:gap-x-4">
          <div className="flex flex-row items-center gap-3">
            {/* Theme Toggle */}
            <ThemeToggleButton />

            {/* User Info */}
            {user && (
              <div className="flex items-center gap-3">
                {/* Profile Picture */}
                <div className="relative">
                  {user.profile_picture ? (
                    <img
                      src={user.profile_picture}
                      alt={user.username}
                      className="h-10 w-10 rounded-full border-2 border-gray-300 shadow-lg"
                    />
                  ) : (
                    <User className="h-10 w-10 text-gray-500" />
                  )}
                </div>
                {/* User Info */}
                <div className="hidden text-gray-700 sm:block dark:text-gray-300">
                  <p className="text-sm font-semibold">{user.username}</p>
                  <p className="text-xs">{user.email}</p>
                </div>
                {/* Logout Icon */}
                <button onClick={handleLogout}>
                  <LogOut className="h-5 w-5 rounded-full text-red-500" />
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DashboardHeader;
