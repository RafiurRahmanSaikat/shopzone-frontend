const OrderSummary = ({ subtotal }) => {
  const shipping = 10.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="sticky top-4 rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
      <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-white">
        Order Summary
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
          <span>Subtotal</span>
          <span className="font-medium text-zinc-900 dark:text-white">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
          <span>Shipping</span>
          <span className="font-medium text-zinc-900 dark:text-white">
            ${shipping.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
          <span>Tax</span>
          <span className="font-medium text-zinc-900 dark:text-white">
            ${tax.toFixed(2)}
          </span>
        </div>

        <div className="my-4 h-px bg-zinc-200 dark:bg-zinc-700" />

        <div className="flex justify-between text-zinc-900 dark:text-white">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
