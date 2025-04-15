import { LogOut, Menu, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../theme/useTheme";
import { Button } from "../ui";

const DashboardHeader = ({ user, logout, toggleSidebar }) => {
  const { ThemeToggleButton } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white dark:border-neutral-700 dark:bg-neutral-800">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          {/* Hamburger menu first */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Toggle Button */}
          <ThemeToggleButton />

          {/* User Info and Logout */}
          {user && (
            <div className="flex items-center gap-3">
              {/* User Info - Only visible on larger screens */}
              <div className="hidden flex-col text-right md:flex">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.username}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {user.email}
                </span>
              </div>
              {/* Profile Picture */}
              {user.profile_picture ? (
                <img
                  src={user.profile_picture}
                  alt="User Avatar"
                  className="h-8 w-8 rounded-full border border-gray-300 object-cover"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-700">
                  <User
                    size={16}
                    className="text-gray-500 dark:text-gray-300"
                  />
                </div>
              )}
              {/* Logout Button */}
              <Button
                variant="danger"
                size="sm"
                shape="rounded"
                onClick={handleLogout}
                aria-label="Logout"
              >
                <LogOut size={18} />
                <span className="sr-only">Logout</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
