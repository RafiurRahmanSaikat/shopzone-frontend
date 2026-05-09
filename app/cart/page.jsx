"use client";

import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { apiFetch } from "@/lib/fetchClient";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, ShoppingCart } from "lucide-react";
import Link from "next/link";
import PageShell from "../../components/PageShell";

// ✅ Stripe init
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

const STRIPE_CARD_STYLE = {
  base: {
    fontSize: "14px",
    color: "#424770",
    "::placeholder": {
      color: "#aab7c4",
    },
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a",
  },
};

/* =========================
   PAYMENT FORM
========================= */
function PaymentForm({ total, onSuccess, isStripeReady }) {
  const stripe = useStripe();
  const elements = useElements();

  const { user } = useAuth();
  const { fetchCart } = useCart();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!stripe || !elements || total <= 0) return;

    setProcessing(true);
    setError(null);

    try {
      const { clientSecret } = await apiFetch(
        "/orders/create_payment_intent/",
        {
          method: "POST",
          body: {
            amount: Math.round(total * 100),
            fullName: user?.get_full_name || user?.username,
            email: user?.email,
            phone: user?.phone_number || "",
            address: user?.address || "",
          },
        },
      );

      if (!clientSecret) throw new Error("No client secret");

      const { error: paymentError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

      if (paymentError) throw new Error(paymentError.message);

      if (paymentIntent.status === "succeeded") {
        await apiFetch("/orders/", {
          method: "POST",
          body: { from_cart: true },
        });

        await fetchCart();
        onSuccess();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(false);
    }
  }

  if (total <= 0) return null;

  if (!isStripeReady) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
          <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div>
        <label className="text-sm font-medium text-muted-foreground block mb-2">
          Full Name
        </label>
        <input
          value={user?.get_full_name || ""}
          readOnly
          className="w-full border rounded-lg px-3 py-2 bg-muted text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-muted-foreground block mb-2">
          Email
        </label>
        <input
          value={user?.email || ""}
          readOnly
          className="w-full border rounded-lg px-3 py-2 bg-muted text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-muted-foreground block mb-2">
          Card Details
        </label>
        <div className="border rounded-lg p-3 bg-background">
          <CardElement options={{ style: STRIPE_CARD_STYLE }} />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full h-10 text-base"
        disabled={processing || !stripe || !elements}
      >
        {processing ? (
          <>
            <span className="inline-block h-4 w-4 mr-2 rounded-full border-2 border-background border-r-transparent animate-spin" />
            Processing...
          </>
        ) : (
          `Pay $${total.toFixed(2)}`
        )}
      </Button>
    </form>
  );
}

/* =========================
   MAIN CART PAGE
========================= */
export default function CartPage() {
  const { cart, loading, fetchCart, updateItem, removeItem } = useCart();
  const router = useRouter();
  const [isStripeReady, setIsStripeReady] = useState(false);

  useEffect(() => {
    fetchCart();
    // Simulate Stripe readiness after a short delay
    const timer = setTimeout(() => setIsStripeReady(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <PageShell>
        <div className="space-y-6 p-6">
          <Skeleton className="h-8 w-40" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 border-b py-4">
                  <Skeleton className="w-20 h-20 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
            <div className="border rounded-lg p-6 space-y-4 h-fit">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  const items = cart?.cart_items || [];
  const total =
    items.reduce((sum, item) => sum + item.product_price * item.quantity, 0) ||
    0;

  return (
    <PageShell>
      {items.length === 0 ? (
        /* =========================
           EMPTY STATE
        ========================= */
        <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <ShoppingCart className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Your cart is empty
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Ready to find something amazing?
          </p>
          <div className="mt-8 flex flex-col gap-3 w-full">
            <Button size="lg" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/orders">View My Orders</Link>
            </Button>
          </div>
        </div>
      ) : (
        /* =========================
           CART WITH ITEMS
        ========================= */
        <div className="max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: CART ITEMS (2 COLUMNS SPAN) */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border rounded-lg p-4 hover:border-primary/30 transition-colors bg-card"
                >
                  {/* PRODUCT IMAGE */}
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <div className="relative w-full h-full rounded-md overflow-hidden bg-muted">
                      <Image
                        src={item.product_image || "/placeholder.svg"}
                        alt={item.product_name}
                        fill
                        className="object-cover"
                        sizes="96px"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                  </div>

                  {/* PRODUCT DETAILS */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-base mb-1 line-clamp-2">
                      {item.product_name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      ${item.product_price.toFixed(2)} each
                    </p>

                    {/* QUANTITY CONTROLS */}
                    <div className="flex items-center gap-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateItem(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="h-8 w-8 p-0"
                      >
                        −
                      </Button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateItem(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* PRICE & ACTIONS */}
                  <div className="flex flex-col items-end justify-between">
                    <div className="text-right">
                      <p className="text-lg font-bold">
                        ${item.total_price.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: CHECKOUT SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 sticky top-6 bg-card shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              {/* ORDER DETAILS */}
              <div className="space-y-3 mb-6 pb-6 border-b">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              {/* TOTAL */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-3xl font-bold text-primary">
                  ${total.toFixed(2)}
                </span>
              </div>

              {/* PAYMENT FORM */}
              <Elements stripe={stripePromise}>
                <PaymentForm
                  total={total}
                  isStripeReady={isStripeReady}
                  onSuccess={() => router.push("/success")}
                />
              </Elements>

              {/* TRUST BADGES */}
              <div className="mt-6 space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  Secure payment processing
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  Money-back guarantee
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <span className="text-xs">✓</span>
                  </div>
                  Fast delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
