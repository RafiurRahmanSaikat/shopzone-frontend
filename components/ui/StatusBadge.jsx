/**
 * Reusable Status Badge Component
 * Displays order/status with consistent styling
 */

"use client";

import { Badge } from "@/components/ui/badge";
import { getStatusIcon, normalizeStatus, statusVariant } from "@/lib/status";

export default function StatusBadge({
  status,
  showIcon = true,
  className = "",
}) {
  const normalized = normalizeStatus(status);
  const variant = statusVariant(normalized);
  const icon = showIcon ? getStatusIcon(normalized) : null;

  return (
    <Badge
      variant={variant}
      className={`capitalize font-semibold ${className}`}
    >
      {icon} {normalized}
    </Badge>
  );
}
