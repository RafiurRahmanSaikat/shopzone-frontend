import { Badge, Button, Input, TableFooter, Text } from "@components";
import {
  Calendar,
  Download,
  Eye,
  FilterIcon,
  Package,
  Search,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ORDER_STATUSES } from "../../constants";
const OrderTable = ({ orders, pagination = {}, onPageChange, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("created_at");
  const [sortDirection, setSortDirection] = useState("desc");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        const searchMatch =
          String(order?.order_id || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          String(order?.user || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const statusMatch =
          statusFilter === "all" || order?.status === statusFilter;

        return searchMatch && statusMatch;
      })
      .sort((a, b) => {
        if (sortField === "created_at") {
          const dateA = new Date(a.created_at).getTime();
          const dateB = new Date(b.created_at).getTime();
          return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
        } else if (sortField === "item_subtotal") {
          return sortDirection === "asc"
            ? a.item_subtotal - b.item_subtotal
            : b.item_subtotal - a.item_subtotal;
        } else if (sortField === "status") {
          return sortDirection === "asc"
            ? a.status.localeCompare(b.status)
            : b.status.localeCompare(a.status);
        }
        return 0;
      });
  }, [orders, searchTerm, statusFilter, sortField, sortDirection]);

  const getStatusBadge = (status) => {
    const statusMap = {
      [ORDER_STATUSES.PENDING]: { variant: "warning", label: "Pending" },
      [ORDER_STATUSES.CONFIRMED]: { variant: "info", label: "Confirmed" },
      [ORDER_STATUSES.SHIPPED]: { variant: "primary", label: "Shipped" },
      [ORDER_STATUSES.DELIVERED]: { variant: "success", label: "Delivered" },
      [ORDER_STATUSES.CANCELLED]: { variant: "danger", label: "Cancelled" },
    };

    const { variant, label } = statusMap[status] || {
      variant: "secondary",
      label: status,
    };
    return <Badge variant={variant}>{label}</Badge>;
  };

  const getItemsCount = (orderProducts) => {
    return orderProducts.reduce(
      (total, product) => total + product.quantity,
      0,
    );
  };

  const formatOrderDate = (dateString) => {
    const date = new Date(dateString);
    const dateFormatted = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const timeFormatted = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Calculate relative time using built-in JavaScript
    const now = new Date();
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    let relativeTime;
    if (diffDays > 30) {
      const diffMonths = Math.floor(diffDays / 30);
      relativeTime = `${diffMonths} ${diffMonths === 1 ? "month" : "months"} ago`;
    } else if (diffDays > 0) {
      relativeTime = `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
    } else if (diffHours > 0) {
      relativeTime = `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
    } else if (diffMins > 0) {
      relativeTime = `${diffMins} ${diffMins === 1 ? "minute" : "minutes"} ago`;
    } else {
      relativeTime = "just now";
    }

    return { dateFormatted, timeFormatted, relativeTime };
  };

  // Create a truncated order ID for display
  const formatOrderId = (id) => {
    return id.slice(0, 8);
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return null;
    return (
      <span className="ml-1 inline-block">
        {sortDirection === "asc" ? "↑" : "↓"}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:w-72">
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={handleSearch}
            icon={<Search className="h-4 w-4" />}
            className="mb-0"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="focus:ring-opacity-50 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-colors focus:border-purple-500 focus:ring focus:ring-purple-200 dark:border-gray-700 dark:bg-zinc-800 dark:text-white"
          >
            <option value="all">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <FilterIcon className="h-4 w-4" /> More Filters
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow dark:border-zinc-700 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
            <thead className="bg-gray-50 dark:bg-zinc-800">
              <tr>
                <th
                  className="cursor-pointer px-6 py-3.5 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400"
                  onClick={() => handleSort("order_id")}
                >
                  <div className="flex items-center">
                    Order ID
                    <SortIcon field="order_id" />
                  </div>
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Customer
                </th>
                <th
                  className="cursor-pointer px-6 py-3.5 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400"
                  onClick={() => handleSort("created_at")}
                >
                  <div className="flex items-center">
                    Date
                    <SortIcon field="created_at" />
                  </div>
                </th>
                <th
                  className="cursor-pointer px-6 py-3.5 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400"
                  onClick={() => handleSort("item_subtotal")}
                >
                  <div className="flex items-center">
                    Total
                    <SortIcon field="item_subtotal" />
                  </div>
                </th>
                <th
                  className="cursor-pointer px-6 py-3.5 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase hover:text-purple-500 dark:text-gray-400 dark:hover:text-purple-400"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center">
                    Status
                    <SortIcon field="status" />
                  </div>
                </th>
                <th className="px-6 py-3.5 text-right text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const { dateFormatted, relativeTime } = formatOrderDate(
                    order.created_at,
                  );
                  const itemsCount = getItemsCount(order.order_products);

                  return (
                    <tr
                      key={order.order_id}
                      className="transition-colors hover:bg-gray-50 dark:hover:bg-zinc-800"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-50 dark:bg-purple-900">
                            <Package className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                          </div>
                          <div className="ml-3">
                            <Text
                              weight="medium"
                              className="text-purple-600 dark:text-purple-400"
                            >
                              #{formatOrderId(order.order_id)}
                            </Text>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Text weight="medium">User #{order.user}</Text>
                        <Text size="sm" muted>
                          Customer ID: {order.user}
                        </Text>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                          <div>
                            <Text>{dateFormatted}</Text>
                            <Text size="sm" muted>
                              {relativeTime}
                            </Text>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Text
                          weight="medium"
                          className="text-gray-800 dark:text-gray-200"
                        >
                          ${order.item_subtotal.toFixed(2)}
                        </Text>
                        <Text size="sm" muted>
                          {itemsCount} {itemsCount === 1 ? "item" : "items"}
                        </Text>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex justify-end space-x-2">
                          <Button
                            as={Link}
                            to={`/dashboard/orders/${order.order_id}`}
                            variant="outline"
                            size="sm"
                            className="inline-flex items-center border border-purple-500 px-2.5 py-1.5 text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="outline"
                            size="sm"
                            className="inline-flex items-center border border-red-500 px-2.5 py-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
                            onClick={() => onDelete && onDelete(order.order_id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Package className="h-10 w-10 text-gray-400" />
                      <Text size="lg" weight="medium">
                        No orders found
                      </Text>
                      <Text size="sm" muted>
                        Try adjusting your search or filter to find what
                        you&apos;re looking for.
                      </Text>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pagination?.count > 0 && (
        <TableFooter
          count={pagination?.count}
          next={pagination?.next}
          previous={pagination?.previous}
          handlePageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default OrderTable;
