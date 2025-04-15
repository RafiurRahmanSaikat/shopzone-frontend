export const API_URL = "https://shopzone-backend-gilt.vercel.app/api";
// export const API_URL = "http://127.0.0.1:8000/api";

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

export const authLinks = [
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
];

export const USER_ROLES = {
  ADMIN: "admin",
  STORE_OWNER: "store_owner",
  CUSTOMER: "customer",
};

export const ORDER_STATUSES = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/token/",
  LOGOUT: "/logout/",
  REGISTER: "/accounts/users/",
  PROFILE: "/accounts/users/me/",
  CHANGE_PASSWORD: "/accounts/users/change_password/",

  // Products
  PRODUCTS: "/products/",
  PRODUCT_DETAILS: (id) => `/products/${id}/`,
  PRODUCT_REVIEWS: (id) => `/products/${id}/add_review/`,
  MY_PRODUCTS: "/products/my_products",

  // Cart
  CART: "/cart/",
  CART_ITEM: (id) => `/cart/${id}/`,
  CLEAR_CART: "/cart/clear/",

  // Orders
  ORDERS: "/orders/",
  ORDER_DETAILS: (id) => `/orders/${id}/`,
  UPDATE_ORDER_STATUS: (id) => `/orders/${id}/update_status/`,

  // Stores
  STORES: "/stores/",
  STORE_DETAILS: (id) => `/stores/${id}/`,
  STORE_CATEGORIES: "/stores/storeCategory",
  STORE_CATEGORY_DETAILS: (id) => `/stores/storeCategory/${id}/`,

  // Categories & Brands
  CATEGORIES: "/categories/",
  BRANDS: "/brands/",
};
// Navigation links
export const NAV_LINKS = {
  main: [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Cart", path: "/cart" },
  ],
  dashboard: {
    common: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Profile", path: "/dashboard/profile" },
    ],
    storeOwner: [
      { name: "My Products", path: "/dashboard/manage_products" },
      { name: "My Stores", path: "/dashboard/manage_stores" },
      { name: "Orders From Store", path: "/dashboard/manage_orders" },
    ],
    admin: [
      { name: "All Products", path: "/dashboard/products" },
      { name: "All Stores", path: "/dashboard/stores" },
      { name: "All Users", path: "/dashboard/users" },
      { name: "All Orders", path: "/dashboard/orders" },
    ],
    customer: [
      { name: "My Orders", path: "/dashboard/my_orders" },
      { name: "Cart", path: "/dashboard/cart" },
    ],
  },
};
// // Navigation links
// export const NAV_LINKS = {
//   main: [
//     { name: "Home", path: "/" },
//     { name: "Products", path: "/products" },
//     { name: "Cart", path: "/cart" },
//   ],
//   dashboard: {
//     common: [
//       { name: "Dashboard", path: "/dashboard" },
//       { name: "Profile", path: "/dashboard/profile" },
//       { name: "Orders", path: "/dashboard/orders" },
//     ],
//     storeOwner: [
//       { name: "My Products", path: "/dashboard/products" },
//       { name: "My Stores", path: "/dashboard/stores" },
//     ],
//     admin: [
//       { name: "All Products", path: "/dashboard/products" },
//       { name: "All Stores", path: "/dashboard/stores" },
//       { name: "Users", path: "/dashboard/users" },
//     ],
//   },
// };

// Product categories
export const PRODUCT_CATEGORIES = [
  { id: 1, name: "Electronics", icon: "laptop" },
  { id: 2, name: "Fashion", icon: "shirt" },
  { id: 3, name: "Home & Kitchen", icon: "home" },
  { id: 4, name: "Sports", icon: "dumbbell" },
  { id: 5, name: "Books", icon: "book-open" },
];

export const FAQ_QUES = [
  {
    question: "Can I return or exchange an item?",
    answer:
      "Yes, we offer a hassle-free return and exchange policy within 30 days of purchase. Please visit our Returns & Exchanges page for more details.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Shipping times vary based on location and shipping method. Standard shipping usually takes 5-7 business days. Expedited options are available at checkout.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order is shipped, you'll receive a tracking link via email. You can also check your order status in your ShopZone account.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit/debit cards, PayPal, and ShopZone gift cards. Additional payment options may be available based on your region.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "We use industry-standard encryption to protect your payment details and ensure a secure checkout experience.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach us via our Contact Us page or email support@shopzone.com. Our support team is available 24/7.",
  },
];
// Enhanced carousel data with more engaging content
export const CAROUSEL_SLIDES = [
  {
    id: 1,
    title: "Summer Collections 2025",
    description:
      "Discover trending styles for the summer season with up to 40% OFF.",
    image:
      "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2215&q=80",
    btnText: "Shop Collection",
    btnLink: "/products?category=Fashion",
    color: "from-indigo-600 to-purple-600",
  },
  {
    id: 2,
    title: "Tech Gadgets Showcase",
    description:
      "The latest tech innovations at unbeatable prices. Upgrade your devices today!",
    image:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80",
    btnText: "Explore Tech",
    btnLink: "/products?category=Electronics",
    color: "from-purple-600 to-pink-600",
  },
  {
    id: 3,
    title: "Home Essentials",
    description:
      "Transform your living space with our curated home collection. Free shipping on orders over $50.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80",
    btnText: "Shop Home",
    btnLink: "/products?category=Home & Kitchen",
    color: "from-amber-600 to-orange-600",
  },
];
