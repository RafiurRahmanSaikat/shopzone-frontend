import { Home, Package, ShoppingBag, Users } from "lucide-react";
import { Link } from "react-router-dom";

const iconMap = {
  Dashboard: <Home size={20} />,
  Users: <Users size={20} />,
  Orders: <Package size={20} />,
  Products: <ShoppingBag size={20} />,
};

const SidebarNav = ({ links }) => {
  return (
    <nav className="flex flex-col space-y-2 p-3">
      {links?.map(({ name, path }) => (
        <Link
          key={path}
          to={path}
          className="flex items-center gap-2 rounded-lg p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-neutral-700"
        >
          {iconMap[name] || <Home size={20} />} {name}
        </Link>
      ))}
    </nav>
  );
};

export default function Sidebar({ links }) {
  return (
    <aside
      className="fixed inset-y-0 start-0 z-[60] hidden w-[260px] border-e border-gray-200 bg-white lg:block dark:border-neutral-700 dark:bg-neutral-800"
      role="dialog"
      aria-label="Sidebar"
    >
      <div className="flex items-center justify-center py-3">
        <Link to="/" className="flex items-center">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
            ShopZone
          </span>
        </Link>
      </div>
      {/* Sidebar Header */}

      {/* Sidebar Navigation */}
      <div className="flex-1 overflow-y-auto px-3">
        <SidebarNav links={links} />
      </div>
    </aside>
  );
}
