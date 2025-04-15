import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "..";
import { sidebarLinks } from "../../constants";
import AuthContext from "../../context/AuthContext";

const DashboardLayout = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <section className="flex min-h-screen flex-col dark:bg-neutral-800">
      <Sidebar user={user} logout={logout} links={sidebarLinks[user?.role]} />
      <main className="flex-1 lg:ps-64">
        <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
          <Outlet />
        </div>
      </main>
    </section>
  );
};

export default DashboardLayout;
