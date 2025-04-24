import { Card, Heading, Text } from "@components";
import { ShoppingBag } from "lucide-react";

const OrderSummary = ({
  subtotal = 0,
  shipping = 0,
  tax = 0,
  total = 0,
  detailed = false,
}) => {
  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center">
        <ShoppingBag className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
        <Heading as="h2" size="md">
          Order Summary
        </Heading>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <Text muted>Subtotal</Text>
          <Text weight="medium">${subtotal.toFixed(2)}</Text>
        </div>

        <div className="flex justify-between">
          <Text muted>Shipping</Text>
          {shipping === 0 ? (
            <Text
              className="text-green-600 dark:text-green-400"
              weight="medium"
            >
              Free
            </Text>
          ) : (
            <Text weight="medium">${shipping.toFixed(2)}</Text>
          )}
        </div>

        <div className="flex justify-between">
          <Text muted>Tax (8%)</Text>
          <Text weight="medium">${tax.toFixed(2)}</Text>
        </div>

        {detailed && (
          <div className="pt-2">
            <Card className="bg-zinc-50 p-3 dark:bg-zinc-700">
              <Heading as="h3" size="sm" className="mb-2">
                Delivery Information
              </Heading>
              <Text size="sm" muted>
                Standard shipping: 3-5 business days
              </Text>
              {shipping === 0 && (
                <Text
                  size="sm"
                  className="mt-1 text-green-600 dark:text-green-400"
                  weight="medium"
                >
                  Free shipping on orders over $100!
                </Text>
              )}
            </Card>
          </div>
        )}

        <div className="my-4 h-px bg-zinc-200 dark:bg-zinc-700" />

        <div className="flex justify-between">
          <Text size="lg" weight="semibold">
            Total
          </Text>
          <Text
            size="lg"
            weight="semibold"
            className="text-blue-600 dark:text-blue-400"
          >
            ${total.toFixed(2)}
          </Text>
        </div>

        {subtotal > 0 && subtotal < 100 && (
          <Card className="bg-blue-50 p-3 dark:bg-blue-900/30">
            <Text size="sm" className="text-blue-800 dark:text-blue-300">
              Add ${(100 - subtotal).toFixed(2)} more to qualify for free
              shipping!
            </Text>
          </Card>
        )}
      </div>
    </Card>
  );
};

export default OrderSummary;
