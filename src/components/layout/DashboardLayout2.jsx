import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { NAV_LINKS, USER_ROLES } from "../../constants";
import AuthContext from "../../context/AuthContext";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./SideBar";

const DashboardLayout2 = () => {
  const { user, logout } = useContext(AuthContext);
  // Single shared state to control sidebar visibility
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Determine which links to show based on user role
  const getDashboardLinks = () => {
    const links = [...NAV_LINKS.dashboard.common];
    if (user.role === USER_ROLES.ADMIN) {
      links.push(...NAV_LINKS.dashboard.admin);
    } else if (user.role === USER_ROLES.STORE_OWNER) {
      links.push(...NAV_LINKS.dashboard.storeOwner);
    } else if (user.role === USER_ROLES.CUSTOMER) {
      links.push(...NAV_LINKS.dashboard.customer);
    }
    return links;
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Pass the toggle function and state to Sidebar component */}
      <Sidebar
        links={getDashboardLinks()}
        user={user}
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        toggleSidebar={toggleSidebar} // Pass the toggle function
      />

      <div className="flex flex-col lg:pl-64">
        {/* Pass the toggle function to Header */}
        <DashboardHeader
          user={user}
          logout={logout}
          toggleSidebar={toggleSidebar}
        />

        {/* Main content */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout2;
