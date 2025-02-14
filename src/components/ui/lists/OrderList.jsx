import { Loading, TableFooter } from "@components";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import UseFetch from "../../../hooks/UseFetch";
import { handlePatchRequest } from "../../../utils/Actions";

const StatusDropdown = ({ order, onStatusUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isFinalStatus =
    order.status === "Delivered" || order.status == "Cancelled";

  const statuses = [
    "Pending",
    "Shipped",
    "Cancelled",
    "Confirmed",
    "Delivered",
  ];

  const statusColors = {
    Pending:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400",
    Shipped:
      "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400",
    Cancelled: "bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400",
    Confirmed:
      "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-400",
    Delivered:
      "bg-gray-100 text-gray-800 dark:bg-gray-500/20 dark:text-gray-400",
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className={`flex items-center rounded-md px-3 py-1 text-sm font-medium transition-colors duration-150 ${statusColors[order.status]}`}
        onClick={() => {
          if (!isFinalStatus) {
            setIsOpen(!isOpen);
          }
        }}
        disabled={isFinalStatus}
        title={isFinalStatus ? "Status cannot be changed" : "Change status"}
      >
        {order.status} <ChevronDown className="ml-2 h-4 w-4" />
      </button>
      {isOpen && !isFinalStatus && (
        <div className="absolute right-0 z-10 mt-2 w-40 rounded-md border border-gray-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800">
          {statuses.map((status) => (
            <button
              key={status}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700"
              onClick={() => {
                onStatusUpdate(order.order_id, status);
                setIsOpen(false);
              }}
            >
              {status}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const OrderList = () => {
  const [page, setPage] = useState(1);
  const {
    data: ordersData,
    loading,
    error,
    refetch,
  } = UseFetch(`/orders/?page=${page}`);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await handlePatchRequest(`/orders/${orderId}/update_status/`, {
        status: newStatus,
      });
      toast.info("Order Status Updated");
      refetch();
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!ordersData || !ordersData.results)
    return <p className="text-center">No orders found.</p>;

  return (
    <div className="flex h-[93vh] flex-col rounded-xl bg-white shadow-lg dark:bg-neutral-900">
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Orders Directory
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
            Manage and track customer orders
          </p>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-hidden p-6 pt-0">
        <div className="h-full overflow-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-neutral-800">
              <tr>
                {["Order ID", "Products", "Total", "Date", "Status"].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-neutral-400"
                    >
                      {header}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="relative divide-y divide-gray-200 bg-white dark:divide-neutral-700 dark:bg-neutral-900">
              {ordersData.results.map((order) => (
                <tr
                  key={order.order_id}
                  className="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-neutral-800"
                >
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900 dark:text-neutral-100">
                    {order.order_id.slice(0, 8)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-neutral-400">
                    <div className="flex flex-wrap justify-start gap-2">
                      {order.order_products.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center space-x-1 rounded-md border bg-gray-50 p-1 dark:bg-neutral-800"
                        >
                          <img
                            src={product.product_image || "/placeholder.jpg"}
                            alt={product.product_name}
                            className="h-10 w-10 rounded-md border object-cover"
                            title={product.product_name}
                          />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-neutral-100">
                              {product.product_name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-neutral-400">
                              Qty: {product.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-neutral-400">
                    ${order.item_subtotal.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500 dark:text-neutral-400">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusDropdown
                      order={order}
                      onStatusUpdate={handleStatusUpdate}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <TableFooter
          count={ordersData.count}
          next={ordersData.next}
          previous={ordersData.previous}
          handlePageChange={(newPage) => setPage(Math.max(1, newPage))}
        />
      </div>
    </div>
  );
};

export default OrderList;
