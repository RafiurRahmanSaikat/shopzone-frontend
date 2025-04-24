import {
  Button,
  Card,
  Container,
  Heading,
  NoData,
  Spinner,
  Text,
} from "@components";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UseFetch from "../../hooks/UseFetch";
import orderService from "../../services/orderService";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";
import PaymentForm from "./PaymentForm";

const ShoppingCart = () => {
  const { data: cart, loading, error, refetch } = UseFetch("/cart");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const createOrder = async () => {
    setIsCheckingOut(true);
    try {
      await orderService.createOrder({ from_cart: true });
      toast.success("Order placed successfully!");
      await refetch();
      setShowPayment(false);
    } catch (error) {
      toast.error("Failed to place order");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-12">
        <Card className="p-6">
          <div className="text-center">
            <Text variant="error" className="mb-4">
              Error loading cart: {error.message}
            </Text>
            <Button variant="primary" onClick={refetch}>
              Try Again
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  const cartItems = cart?.cart_items || [];
  const itemCount = cartItems.length;
  const subtotal = cart?.item_subtotal || 0;
  const shipping = subtotal > 100 ? 0 : 10.0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <Container className="py-8">
      <div className="mb-8 flex items-center justify-between">
        <Heading as="h1" size="xl">
          {showPayment ? "Checkout" : "Shopping Cart"}
        </Heading>
        <Link to="/products">
          <Button variant="link" leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Continue Shopping
          </Button>
        </Link>
      </div>

      {!cartItems || cartItems.length === 0 ? (
        <Card className="p-8">
          <NoData
            title="Your cart is empty"
            description="Looks like you haven't added any products to your cart yet."
            icon={<ShoppingBag className="h-16 w-16" />}
          />
        </Card>
      ) : (
        <>
          {!showPayment ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                  <Heading as="h2" size="md">
                    Cart Items ({itemCount})
                  </Heading>
                  <Button variant="ghost" onClick={refetch}>
                    Refresh Cart
                  </Button>
                </div>

                <Card className="p-6">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={refetch}
                      onRemove={refetch}
                    />
                  ))}
                </Card>
              </div>

              <div className="space-y-6">
                <OrderSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  total={total}
                />

                <Card className="p-6">
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => setShowPayment(true)}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                  </Button>

                  <div className="mt-4 text-center">
                    <Text size="xs" muted>
                      Secure checkout powered by Stripe
                    </Text>
                    <div className="mt-2 flex justify-center space-x-2">
                      <img src="/visa-card.png" alt="Visa" className="h-6" />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <PaymentForm
                  totalAmount={total}
                  onPaymentSuccess={createOrder}
                  onCancel={() => setShowPayment(false)}
                />
              </div>
              <div>
                <OrderSummary
                  subtotal={subtotal}
                  shipping={shipping}
                  tax={tax}
                  total={total}
                  detailed={true}
                />
              </div>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default ShoppingCart;
