import { Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button";

const ProductCard = ({ product, onAddToCart }) => {
  const { id, name, price, image, rating, stock, categories } = product;
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // Check if product is on sale (for Friday Specials - 50% off for products over $500)
  const isOnSale = Number.parseFloat(price) > 500;
  const discount = isOnSale ? 50 : 0;

  // Calculate discounted price
  const discountedPrice = discount
    ? Number.parseFloat(price) - Number.parseFloat(price) * (discount / 100)
    : Number.parseFloat(price);

  // Format price to 2 decimal places
  const formatPrice = (value) => {
    return value.toFixed(2);
  };

  // Check if product is new (for demonstration, we'll consider products with id > 15 as new)
  const isNew = id > 15;

  // Handle add to cart with loading state
  const handleAddToCart = () => {
    if (stock === 0 || isAddingToCart) return;

    setIsAddingToCart(true);
    if (onAddToCart) {
      onAddToCart();
    }
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 600);
  };

  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:bg-zinc-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
        {discount > 0 && (
          <span className="rounded bg-red-500 px-2 py-1 text-xs font-bold text-white shadow-md">
            {discount}% OFF
          </span>
        )}
        {isNew && (
          <span className="rounded bg-green-500 px-2 py-1 text-xs font-bold text-white shadow-md">
            NEW
          </span>
        )}
        {stock < 5 && stock > 0 && (
          <span className="rounded bg-amber-500 px-2 py-1 text-xs font-bold text-white shadow-md">
            Low Stock
          </span>
        )}
        {stock === 0 && (
          <span className="rounded bg-gray-500 px-2 py-1 text-xs font-bold text-white shadow-md">
            Out of Stock
          </span>
        )}
      </div>

      {/* Product image */}
      <Link to={`/products/${id}`} className="block overflow-hidden">
        <div className="relative h-48 bg-gray-100 dark:bg-zinc-900">
          <img
            src={image || "/placeholder.svg?height=200&width=200"}
            alt={name}
            className="h-full w-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Image overlay on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : ""
            }`}
          ></div>
        </div>
      </Link>

      {/* Product info */}
      <div className="p-4">
        {/* Categories */}
        <div className="mb-1 flex flex-wrap gap-1">
          {categories &&
            categories
              .map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="inline-block text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  {category.name}
                </Link>
              ))
              .reduce((prev, curr) => [prev, " • ", curr], [])}
        </div>

        <Link to={`/products/${id}`} className="block">
          <h3 className="mb-1 line-clamp-2 text-sm font-medium text-gray-900 transition-colors duration-200 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            {name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mb-2 flex items-center">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${
                  i < Math.floor(rating)
                    ? "fill-yellow-400"
                    : "fill-gray-200 dark:fill-gray-700"
                }`}
              />
            ))}
          </div>
          <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">
            ({rating.toFixed(2)})
          </span>
        </div>

        {/* Price */}
        <div className="mb-2 flex items-center">
          {discount > 0 ? (
            <>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                ${formatPrice(discountedPrice)}
              </span>
              <span className="ml-2 text-sm text-gray-500 line-through dark:text-gray-400">
                ${formatPrice(Number.parseFloat(price))}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${formatPrice(Number.parseFloat(price))}
            </span>
          )}
        </div>

        {/* Stock */}
        <div className="mt-1 mb-3 text-xs text-gray-500 dark:text-gray-400">
          {stock > 0 ? (
            <div className="flex items-center">
              <span
                className={`mr-1.5 h-2 w-2 rounded-full ${
                  stock > 10 ? "bg-green-500" : "bg-amber-500"
                }`}
              ></span>
              {stock} in stock
            </div>
          ) : (
            <div className="flex items-center">
              <span className="mr-1.5 h-2 w-2 rounded-full bg-red-500"></span>
              Out of stock
            </div>
          )}
        </div>

        {/* Static Add to Cart button inside card */}
        <Button
          disabled={stock === 0 || isAddingToCart}
          variant="primary"
          onClick={handleAddToCart}
          className={`w-full`}
        >
          {stock > 0 ? "Add to Cart" : "Out of Stock"}
        </Button>
        {/* <button
          onClick={handleAddToCart}
          disabled={stock === 0 || isAddingToCart}
          className={`flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-medium shadow-md transition-all duration-300 ${
            stock > 0
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "cursor-not-allowed bg-gray-300 text-gray-500"
          }`}
        >
          {isAddingToCart ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
          ) : (
            <>
              <ShoppingCart size={16} className="mr-2" />
              {stock > 0 ? "Add to Cart" : "Out of Stock"}
            </>
          )}
        </button> */}
      </div>
    </div>
  );
};

export default ProductCard;
