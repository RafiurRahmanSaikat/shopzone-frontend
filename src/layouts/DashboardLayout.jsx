import { DashboardHeader, Sidebar } from "@components";
import { Outlet } from "react-router-dom";

const sidebarLinks = {
  admin: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Users", path: "/dashboard/users" },
    { name: "Orders", path: "/dashboard/orders" },
    { name: "Products", path: "/dashboard/products" },
    { name: "Test", path: "/dashboard/test" },
  ],
  customer: [
    { name: "My Orders", path: "/dashboard/orders" },
    { name: "Profile", path: "/dashboard/profile" },
  ],
  store_owner: [
    { name: "Store Dashboard", path: "/dashboard" },
    { name: "My Products", path: "/dashboard/products" },
    { name: "Orders", path: "/dashboard/orders" },
  ],
};

const DashboardLayout = ({ role, children }) => {
  return (
    <>
      <div className="flex">
        <Sidebar links={sidebarLinks["admin"]} />
        <div className="flex flex-1 flex-col">
          <DashboardHeader />
          <main className="p-6">
            <Outlet />
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
