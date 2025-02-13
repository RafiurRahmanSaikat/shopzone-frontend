import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { handleDeleteRequest, handlePutRequest } from "../../../utils/Actions";

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(item.quantity.toString());

  const handleQuantityChange = async (newQty) => {
    if (newQty < 1 || isUpdating) return;
    setIsUpdating(true);
    try {
      await handlePutRequest(`/cart/${item.id}/`, { quantity: newQty });
      onUpdateQuantity(item.id, newQty);
      setInputValue(newQty.toString());
      toast.success("Cart updated successfully");
    } catch (error) {
      toast.error("Failed to update quantity");
      setInputValue(item.quantity.toString());
    } finally {
      setIsUpdating(false);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleInputBlur = () => {
    const newQty = parseInt(inputValue);
    if (!isNaN(newQty) && newQty >= 1) {
      handleQuantityChange(newQty);
    } else {
      setInputValue(item.quantity.toString());
    }
    setIsEditing(false);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      e.target.blur();
    }
  };

  const handleRemove = async () => {
    if (isRemoving) return;
    setIsRemoving(true);
    try {
      await handleDeleteRequest(`/cart/${item.id}/`);
      onRemove(item.id);
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <div className="mb-6 rounded-lg bg-white p-4 shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl dark:bg-zinc-900">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Left Section: Product Details */}
        <div className="flex items-center space-x-4">
          <img
            className="h-24 w-28 rounded-lg border border-gray-200 object-cover shadow-md dark:border-zinc-700"
            src={item.product_image || "/placeholder.jpg"}
            alt={item.product_name}
          />
          <div>
            <p className="text-xl font-semibold text-zinc-900 dark:text-white">
              {item.product_name}
            </p>
            <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
              ${item.product_price.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Right Section: Quantity Controls, Delete Button & Total Price */}
        <div className="mt-4 flex flex-col items-end space-y-3 md:mt-0">
          <div className="flex items-center space-x-4">
            {/* Quantity Controls */}
            <div className="flex items-center space-x-2 rounded-lg border border-zinc-300 p-2 dark:border-zinc-600">
              <button
                className="rounded-full p-2 text-zinc-700 hover:bg-zinc-100 disabled:opacity-50 dark:text-zinc-300 dark:hover:bg-zinc-700"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={isUpdating || item.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>

              {isEditing ? (
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  onKeyPress={handleInputKeyPress}
                  className="w-12 border-none bg-transparent text-center font-medium text-zinc-900 focus:outline-none dark:text-white"
                  autoFocus
                />
              ) : (
                <span
                  className="w-12 cursor-pointer text-center font-medium text-zinc-900 hover:bg-zinc-100 dark:text-white dark:hover:bg-zinc-800"
                  onClick={() => setIsEditing(true)}
                >
                  {isUpdating ? "..." : item.quantity}
                </span>
              )}

              <button
                className="rounded-full p-2 text-zinc-700 hover:bg-zinc-100 disabled:opacity-50 dark:text-zinc-300 dark:hover:bg-zinc-700"
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={isUpdating}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Delete Button */}
            <button
              className="flex items-center space-x-1 rounded-full p-2 text-red-500 hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-900/30"
              onClick={handleRemove}
              disabled={isRemoving}
            >
              <Trash2 className="h-4 w-4" />
              <span className="text-sm font-medium">Delete</span>
            </button>
          </div>

          {/* Total Price */}
          <div className="flex justify-between text-xl font-bold text-zinc-900 dark:text-white">
            <p className="items-start">Subtotal Price:</p>
            <p className="ml-1 text-blue-600 dark:text-blue-400">
              ${(item.product_price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
