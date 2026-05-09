# ShopZone — Modern E-Commerce Platform

<div align="center">

[![Next.js 16.2.5](https://img.shields.io/badge/Next.js-16.2.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React 19.2.4](https://img.shields.io/badge/React-19.2.4-61dafb?style=for-the-badge&logo=react)](https://react.dev)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind%20CSS-4-38b2ac?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Django REST](https://img.shields.io/badge/Django%20REST-3.14-092e20?style=for-the-badge&logo=django)](https://www.django-rest-framework.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A **production-grade, full-stack e-commerce platform** combining a scalable Django REST backend with a modern Next.js App Router frontend. Built for performance, accessibility, and developer experience.

[Features](#-key-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Architecture](#-architecture) • [Contributing](#-contributing)

</div>

---

## 🎯 Overview

ShopZone is a complete e-commerce solution featuring multi-vendor storefronts, advanced product discovery, order management, and admin analytics. The platform emphasizes:

- **User Experience**: Responsive design, dark mode, fast loading with Next.js Image optimization
- **Scalability**: Microservices-ready backend, pagination, efficient API design
- **Developer Experience**: Centralized utilities, reusable components, clean architecture
- **Security**: Authentication, authorization, CORS-protected API, input validation

**Live Features:**

- 🛍️ Browse 20+ products from multiple stores
- 🛒 Advanced cart with persistent state
- ⭐ Product reviews and ratings
- 📦 Order tracking and history
- 🏪 Multi-vendor store management
- 👨‍💼 Admin dashboard with analytics
- 🌓 Dark/light theme with system preference detection
- 📱 Fully responsive on mobile, tablet, desktop

---

## 🎨 Key Features

### Customer Features

- **Smart Product Discovery**
  - Search and filtering by category, brand, price range
  - Product sorting (trending, newest, price)
  - Advanced pagination

- **Cart & Checkout**
  - Persistent cart (localStorage + context)
  - Real-time quantity updates
  - Checkout flow with status tracking

- **Reviews & Ratings**
  - 5-star rating system with product reviews
  - User review moderation
  - Average rating display and analytics

- **Order Management**
  - Order history with detailed item breakdown
  - Status tracking (Pending → Processing → Shipped → Delivered)
  - Order cancellation support

### Store Owner Features

- **Product Management**
  - CRUD operations for products
  - Bulk editing capabilities
  - Image upload and optimization
  - Stock tracking

- **Analytics**
  - Order volume metrics
  - Revenue tracking
  - Top-performing products
  - Customer engagement data

### Admin Features

- **Platform Administration**
  - Global product catalog management
  - Order status override capabilities
  - Store and brand management
  - Category and store-category management
  - User account oversight

- **System Health**
  - API response monitoring
  - Performance metrics
  - Error tracking and logging

---

## 🏗️ Architecture

### System Design

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js App Router                      │
│   (Frontend - SSR/SSG with Turbopack, Tailwind CSS v4)     │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
   ┌─────────┐ ┌──────────┐ ┌─────────────┐
   │ API     │ │ Services │ │  Hooks &    │
   │ Fetch   │ │ Layer    │ │ Utilities   │
   │ Client  │ │ (Products│ │ (Formatters,│
   └─────────┘ │ Orders)  │ │  Status)    │
               └──────────┘ └─────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
    ┌──────────────────────────────────────┐
    │      Django REST Framework API       │
    │    (PostgreSQL/SQLite Backend)       │
    └──────────────────────────────────────┘
        │            │            │
        ▼            ▼            ▼
    [Products]  [Orders]    [Reviews]
    [Stores]     [Users]     [Analytics]
```

### Frontend Structure

```
shopzone/
├── app/                          # Next.js App Router pages
│   ├── page.jsx                  # Home with featured products
│   ├── products/                 # Product listing & detail
│   ├── cart/                     # Shopping cart
│   ├── orders/                   # Customer order history
│   ├── profile/                  # User profile
│   ├── dashboard/                # Store owner dashboard
│   ├── admin/                    # Admin panel
│   └── layout.jsx                # Root layout with themes
│
├── components/                   # Reusable React components
│   ├── ui/                       # Shadcn/ui primitives
│   ├── ProductCard.jsx           # Product grid item
│   ├── OrdersTable.jsx           # Order display
│   ├── ProductFilters.jsx        # Search & filter UI
│   ├── PaginationControls.jsx    # Pagination component
│   ├── sections/                 # Page sections (carousel, deals, etc)
│   └── ...
│
├── services/                     # API service layer
│   ├── productsService.js        # Product API calls
│   └── ordersService.js          # Order API calls
│
├── hooks/                        # Custom React hooks
│   ├── usePagination.js          # Pagination logic
│   ├── useFilters.js             # Filter management
│   └── useApiFetch.jsx           # Data fetching
│
├── lib/                          # Utility functions
│   ├── formatters.js             # formatPrice, formatDate, etc
│   ├── status.js                 # Order status utilities
│   ├── fetchClient.js            # HTTP client
│   ├── media.js                  # Image URL resolution
│   └── utils.js                  # General utilities
│
├── context/                      # React context (state management)
│   ├── AuthContext.jsx           # User authentication
│   └── CartContext.jsx           # Shopping cart state
│
├── constants/                    # App constants
│   └── api.js                    # API endpoints
│
└── public/                       # Static assets
```

### Backend Structure (Django)

```
shopzone_backend/
├── manage.py
├── db.sqlite3
├── requirements.txt
│
├── shopzone_backend/             # Project settings
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
│
├── account/                      # User management
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
├── product/                      # Product catalog
│   ├── models.py                 # Product, Review, Category
│   ├── filters.py                # DRF filters
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
├── order/                        # Order processing
│   ├── models.py                 # Order, OrderItem
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
├── store/                        # Multi-vendor stores
│   ├── models.py                 # Store, StoreBrand, StoreCategory
│   ├── serializers.py
│   ├── views.py
│   └── urls.py
│
└── core/                         # Common utilities
    ├── pagination.py
    └── views.py
```

---

## 🚀 Tech Stack

### Frontend

| Technology       | Version             | Purpose                              |
| ---------------- | ------------------- | ------------------------------------ |
| **Next.js**      | 16.2.5              | Framework with App Router, SSR, SSG  |
| **React**        | 19.2.4              | UI library with hooks                |
| **Tailwind CSS** | 4.0                 | Utility-first styling with dark mode |
| **Shadcn/ui**    | Latest              | High-quality component library       |
| **Turbopack**    | Bundler             | Next.js fast bundler                 |
| **Sonner**       | Toast notifications | Error/success feedback               |
| **Lucide React** | Icons               | Icon library                         |

### Backend

| Technology              | Version | Purpose              |
| ----------------------- | ------- | -------------------- |
| **Django**              | 5.0+    | Web framework        |
| **Django REST**         | 3.14+   | REST API framework   |
| **PostgreSQL** / SQLite | 14+ / - | Database             |
| **Gunicorn**            | -       | WSGI server          |
| **CORS Headers**        | -       | Cross-origin support |

### Development

| Tool         | Purpose                         |
| ------------ | ------------------------------- |
| **pnpm**     | Fast, efficient package manager |
| **ESLint**   | Code linting                    |
| **Prettier** | Code formatting                 |
| **Git**      | Version control                 |

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** 18+ (for frontend)
- **Python** 3.10+ (for backend)
- **pnpm** 8+ (or npm/yarn)

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd shopzone
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Create environment file** (`.env` or `.env.local`)

   ```bash
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:8000/api
   NEXT_PUBLIC_API_TIMEOUT=10000
   ```

4. **Start development server**

   ```bash
   pnpm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

5. **Build for production**
   ```bash
   pnpm run build
   pnpm start
   ```

### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd shopzone_backend
   ```

2. **Create virtual environment**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Apply migrations**

   ```bash
   python manage.py migrate
   ```

5. **Create superuser**

   ```bash
   python manage.py createsuperuser
   ```

6. **Start development server**
   ```bash
   python manage.py runserver
   ```
   API available at [http://localhost:8000](http://localhost:8000)

---

## 📚 API Documentation

### Base URL

```
http://localhost:8000/api
```

### Authentication

Endpoints requiring authentication use **token-based authentication**:

```http
Authorization: Token your-auth-token-here
```

### Key Endpoints

#### Products

```http
GET    /products/                      # List all products
GET    /products/?page_size=all        # Get all products
GET    /products/{id}/                 # Get product detail
POST   /products/                      # Create product (auth required)
PATCH  /products/{id}/                 # Update product (auth required)
DELETE /products/{id}/                 # Delete product (auth required)
POST   /products/{id}/add_review/      # Add/update review
DELETE /products/{id}/add_review/      # Delete review
```

#### Orders

```http
GET    /orders/                        # List user orders (auth required)
GET    /orders/?page=1                 # Paginated orders
POST   /orders/                        # Create order (auth required)
PATCH  /orders/{id}/update_status/     # Update order status (admin only)
```

#### User Accounts

```http
POST   /auth/login/                    # User login
POST   /auth/logout/                   # User logout
POST   /auth/register/                 # User registration
GET    /auth/profile/                  # Get user profile
```

### Status Codes

| Code | Meaning      |
| ---- | ------------ |
| 200  | Success      |
| 201  | Created      |
| 400  | Bad Request  |
| 401  | Unauthorized |
| 403  | Forbidden    |
| 404  | Not Found    |
| 500  | Server Error |

---

## 📖 Development Guide

### Component Patterns

#### Creating a New Page Component

```javascript
"use client";

import { useState, useEffect } from "react";
import useApiFetch from "@/hooks/useApiFetch";
import PageShell from "@/components/PageShell";
import { ErrorDisplay } from "@/components/ErrorDisplay";

export default function MyPage() {
  const { data, loading, error, refetch } = useApiFetch(
    "/endpoint/?page_size=all",
  );

  if (error) return <ErrorDisplay error={error} onRetry={refetch} />;
  if (loading) return <div>Loading...</div>;

  return <PageShell>{/* Content */}</PageShell>;
}
```

#### Using Centralized Utilities

```javascript
// Formatters
import { formatPrice, formatDate } from "@/lib/formatters";

console.log(formatPrice(99.99)); // $99.99
console.log(formatDate("2024-05-09")); // May 9, 2024

// Status management
import { normalizeStatus, statusVariant } from "@/lib/status";
const status = normalizeStatus("pending"); // Pending
const variant = statusVariant(status); // outline

// Services
import { getProducts, getOrderById } from "@/services/productsService";
const products = await getProducts({ page: 1, page_size: 20 });
```

#### Using Hooks

```javascript
// Pagination
const { page, goToPage, nextPage, prevPage, calculateTotal } = usePagination(
  1,
  10,
);

// Filters
const { filters, updateFilter, reset } = useFilters({
  category: null,
  search: "",
});
```

### Adding a New Feature

1. **Create the service** (`lib/` or `services/`)
2. **Create the hook** if needed (`hooks/`)
3. **Create the component** (`components/`)
4. **Integrate into page** (`app/`)

---

## 🔒 Security

- **Authentication**: Token-based with Django REST framework
- **CORS**: Properly configured for frontend domain
- **Input Validation**: Server-side validation on all endpoints
- **XSS Protection**: React escaping, CSP headers
- **CSRF**: Django CSRF middleware
- **Rate Limiting**: Configurable per endpoint
- **Permissions**: Role-based access control (Customer, Store Owner, Admin)

---

## 📊 Performance

### Optimizations Implemented

- ✅ **Image Optimization**: Next.js Image component with srcset and lazy loading
- ✅ **Code Splitting**: Automatic route-based code splitting
- ✅ **API Caching**: Response caching with appropriate TTLs
- ✅ **Pagination**: Efficient list pagination (default: 10 items/page)
- ✅ **Component Memoization**: React.memo where needed
- ✅ **CSS**: Tailwind CSS with purging
- ✅ **Bundling**: Turbopack for fast builds

### Metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 2.5s
- **Lighthouse Score**: 85+

---

## 🧪 Testing

### Running Tests

```bash
# Frontend tests (if configured)
pnpm test

# Backend tests
python manage.py test
```

---

## 📱 Responsive Design

| Breakpoint | Device  | Notes                     |
| ---------- | ------- | ------------------------- |
| 640px      | Mobile  | Single column, full-width |
| 768px      | Tablet  | Two-column grid           |
| 1024px     | Desktop | Three-column grid         |
| 1280px     | Large   | Four-column grid          |

---

## 🌐 Environment Variables

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_API_TIMEOUT=10000
```

### Backend (`.env`)

```env
DEBUG=True
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=sqlite:///db.sqlite3
```

---

## 📦 Deployment

### Frontend (Vercel)

```bash
pnpm run build
# Deploy to Vercel via GitHub
```

### Backend (Heroku/PythonAnywhere)

```bash
pip freeze > requirements.txt
# Configure environment variables
# Deploy using platform CLI
```

---

## 🐛 Troubleshooting

### Common Issues

**API Connection Failed**

- Check `NEXT_PUBLIC_API_URL` is correct
- Verify backend is running on port 8000
- Check CORS configuration

**Images Not Loading**

- Verify `next.config.mjs` has correct domain patterns
- Check image URL format
- Inspect network tab for 404 errors

**Authentication Errors**

- Clear localStorage: `localStorage.clear()`
- Re-login to refresh token
- Check token expiration

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Code Standards

- Use **Prettier** for formatting
- Follow **ESLint** rules
- Write meaningful commit messages
- Add comments for complex logic

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI Components from [Shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Backend powered by [Django](https://www.djangoproject.com)

---

## 📞 Support

For issues, questions, or suggestions:

- 📧 Email: support@shopzone.dev
- 🐛 [Report a Bug](https://github.com/shopzone/issues)
- 💬 [Discussions](https://github.com/shopzone/discussions)

---

<div align="center">

Made with ❤️ by the ShopZone Team

[⬆ Back to Top](#shopzone--modern-e-commerce-platform)

</div>
