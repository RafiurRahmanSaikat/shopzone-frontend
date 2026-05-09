"use client";

import NameCrudManager from "@/components/NameCrudManager";

export default function AdminStoreCategoriesPage() {
  return (
    <NameCrudManager
      title="🎁 Store Categories"
      description="Manage store categories across the platform"
      listEndpoint="/stores/storeCategory"
      itemEndpoint={(id) => `/stores/storeCategory/${id}/`}
      isAdmin={true}
      adminColor="red"
    />
  );
}
