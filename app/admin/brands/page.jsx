"use client";

import NameCrudManager from "@/components/NameCrudManager";

export default function AdminBrandsPage() {
  return (
    <NameCrudManager
      title="🏷️ Brands"
      description="Manage product brands across the platform"
      listEndpoint="/brands/"
      itemEndpoint={(id) => `/brands/${id}/`}
      listAuth={false}
      isAdmin={true}
      adminColor="red"
    />
  );
}
