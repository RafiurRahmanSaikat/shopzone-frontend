import { Check, X } from "lucide-react";
import React from "react";

const StatusBadge = ({ status }) => {
  const statusStyles = {
    Pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-500",
    Confirmed:
      "bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-500",
    Cancelled: "bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500",
  };

  const Icon =
    status === "Confirmed" ? Check : status === "Cancelled" ? X : null;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${statusStyles[status] || statusStyles["Pending"]}`}
    >
      {Icon && <Icon className="h-3 w-3" />}
      {status}
    </span>
  );
};

export default StatusBadge;
