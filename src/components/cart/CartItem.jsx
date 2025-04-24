import { Button, Text } from "@components";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import cartService from "../../services/cartService";
const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [quantity, setQuantity] = useState(item?.quantity || 1);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || newQuantity > 99 || !item?.id) return;

    setQuantity(newQuantity);
    setIsUpdating(true);

    try {
      await cartService.updateCartItem(item.id, newQuantity);
      onUpdateQuantity?.();
    } catch (error) {
      toast.error("Failed to update quantity");
      setQuantity(item.quantity); // Reset to original quantity
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    if (!item?.id) return;

    setIsRemoving(true);
    try {
      await cartService.removeFromCart(item.id);
      toast.success("Item removed from cart");
      onRemove?.();
    } catch (error) {
      toast.error("Failed to remove item");
    } finally {
      setIsRemoving(false);
    }
  };

  if (!item) return null;
  console.log(item);
  const product = item || {};
  const productId = product?.product;
  const productName = product?.product_name || "Product";
  const productImage = product?.product_image || "/placeholder.jpg";
  const productPrice = product?.product_price || 0;
  const itemTotal = productPrice * quantity;

  return (
    <div
      className={`relative ${isRemoving ? "opacity-50" : ""} transition-opacity duration-300`}
    >
      <div className="flex flex-col border-b border-zinc-200 pb-4 sm:flex-row sm:items-center dark:border-zinc-700">
        <div className="flex-shrink-0">
          <Link to={`/products/${productId}`}>
            <img
              src={productImage || "/placeholder.svg"}
              alt={productName}
              className="h-24 w-24 rounded-lg object-cover"
            />
          </Link>
        </div>

        <div className="mt-4 flex flex-1 flex-col sm:mt-0 sm:ml-6">
          <div className="flex justify-between">
            <Link to={`/products/${productId}`}>
              <Text
                size="lg"
                weight="medium"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                {productName}
              </Text>
            </Link>
            <Text size="lg" weight="medium">
              ${itemTotal.toFixed(2)}
            </Text>
          </div>

          <Text size="sm" muted className="mt-1">
            ${productPrice.toFixed(2)} each
          </Text>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="outline"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1 || isUpdating}
              >
                <Minus className="h-3 w-3" />
              </Button>

              <input
                type="number"
                min="1"
                max="99"
                value={quantity}
                onChange={(e) =>
                  handleQuantityChange(Number.parseInt(e.target.value) || 1)
                }
                className="h-8 w-12 border-y border-zinc-300 bg-white px-2 text-center text-sm text-zinc-900 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
              />

              <Button
                variant="outline"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 99 || isUpdating}
              >
                <Plus className="h-3 w-3" />
              </Button>

              {isUpdating && (
                <Text size="xs" muted className="ml-2">
                  Updating...
                </Text>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
              onClick={handleRemove}
              disabled={isRemoving}
              leftIcon={<Trash2 className="h-4 w-4" />}
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
