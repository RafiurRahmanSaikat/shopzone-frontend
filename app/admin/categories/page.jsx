"use client";

import NameCrudManager from "@/components/NameCrudManager";

export default function AdminCategoriesPage() {
  return (
    <NameCrudManager
      title="📂 Categories"
      description="Manage product categories across the platform"
      listEndpoint="/categories/"
      itemEndpoint={(id) => `/categories/${id}/`}
      listAuth={false}
      isAdmin={true}
    />
  );
}
