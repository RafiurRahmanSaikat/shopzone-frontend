import { Loading, NoData } from "@components";
import React, { useState } from "react";
import { toast } from "react-toastify";
import UseFetch from "../../../hooks/UseFetch";
import { handlePostRequest } from "../../../utils/Actions";
import PaymentForm from "../forms/PaymentForm";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";

const ShoppingCart = () => {
  const { data: cart, loading, error, refetch } = UseFetch("/cart");
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const createOrder = async () => {
    setIsCheckingOut(true);
    try {
      await handlePostRequest("/orders/", { from_cart: true });
      toast.success("Order placed successfully!");
      await refetch();
    } catch (error) {
      toast.error("Failed to place order");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-red-500 dark:text-red-400">
          Error loading cart: {error.message}
        </p>
        <button
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          onClick={refetch}
        >
          Try Again
        </button>
      </div>
    );
  }

  const shipping = 10.0;
  const tax = cart.item_subtotal * 0.08;
  const total = cart.item_subtotal + shipping + tax;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-8 text-2xl font-semibold text-zinc-900 dark:text-white">
        Shopping Cart
      </h1>

      {!cart?.cart_items || cart.cart_items.length === 0 ? (
        <NoData
          title="Your cart is empty"
          description="Add some products to cart"
        />
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4 rounded-lg border border-zinc-600 px-2 py-4 sm:px-6 lg:col-span-2 dark:border-zinc-500">
            {cart.cart_items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={refetch}
                onRemove={refetch}
              />
            ))}
          </div>

          <div className="space-y-4 lg:col-span-1">
            <PaymentForm totalAmount={total} onPaymentSuccess={createOrder} />
            <OrderSummary subtotal={cart.item_subtotal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
