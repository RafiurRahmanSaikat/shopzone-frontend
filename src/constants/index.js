export const BASE_URL_BACKEND = "http://127.0.0.1:8000/api";

// export const BASE_URL_BACKEND = "https://shopzone-backend-gilt.vercel.app/api";

export const sidebarLinks = {
  admin: [
    { name: "Profile", path: "/dashboard/profile" },
    { name: "Users", path: "/dashboard/users" },
    { name: "Products", path: "/dashboard/products" },
    { name: "Stores", path: "/dashboard/stores" },
    { name: "Orders", path: "/dashboard/orders" },
  ],
  customer: [
    { name: "My Orders", path: "/dashboard/my_orders" },
    { name: "Profile", path: "/dashboard/profile" },
    { name: "Cart", path: "/dashboard/cart" },
  ],
  store_owner: [
    { name: "Manage", path: "/dashboard/manage_stores" },
    { name: "Products", path: "/dashboard/manage_products" },
    { name: "Orders", path: "/dashboard/manage_orders" },
    { name: "Profile", path: "/dashboard/profile" },
  ],
};
