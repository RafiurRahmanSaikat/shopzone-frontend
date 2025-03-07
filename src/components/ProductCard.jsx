import { Heart, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { id, name, price, image, rating, stock, categories } = product;

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

  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl">
      {/* Product badges */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
        {discount > 0 && (
          <span className="rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
            {discount}% OFF
          </span>
        )}
        {isNew && (
          <span className="rounded bg-green-500 px-2 py-1 text-xs font-bold text-white">
            NEW
          </span>
        )}
        {stock < 5 && stock > 0 && (
          <span className="rounded bg-amber-500 px-2 py-1 text-xs font-bold text-white">
            Low Stock
          </span>
        )}
        {stock === 0 && (
          <span className="rounded bg-gray-500 px-2 py-1 text-xs font-bold text-white">
            Out of Stock
          </span>
        )}
      </div>

      {/* Wishlist button */}
      <button
        className="absolute top-2 right-2 z-10 rounded-full bg-white/80 p-1.5 text-gray-700 backdrop-blur-sm transition-all hover:bg-white hover:text-red-500"
        aria-label="Add to wishlist"
      >
        <Heart size={18} />
      </button>

      {/* Product image */}
      <Link to={`/products/${id}`} className="block overflow-hidden">
        <img
          src={image || "/placeholder.svg?height=200&width=200"}
          alt={name}
          className="h-48 w-full object-contain object-center transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      {/* Quick add button */}
      <div className="absolute inset-x-0 bottom-0 translate-y-full bg-white/90 p-2 backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
        <button
          className={`flex w-full items-center justify-center rounded px-4 py-2 text-sm font-medium transition-colors ${
            stock > 0
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "cursor-not-allowed bg-gray-300 text-gray-500"
          }`}
          disabled={stock === 0}
        >
          <ShoppingCart size={16} className="mr-2" />
          {stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>

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
                  className="inline-block text-xs text-blue-600 hover:text-blue-800"
                >
                  {category.name}
                </Link>
              ))
              .reduce((prev, curr) => [prev, " • ", curr])}
        </div>

        <Link to={`/products/${id}`} className="block">
          <h3 className="mb-1 line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-blue-600">
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
                className={`${i < Math.floor(rating) ? "fill-yellow-400" : "fill-gray-200"}`}
              />
            ))}
          </div>
          <span className="ml-1 text-xs text-gray-500">({rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-center">
          {discount > 0 ? (
            <>
              <span className="text-lg font-bold text-gray-900">
                ${formatPrice(discountedPrice)}
              </span>
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${formatPrice(Number.parseFloat(price))}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-900">
              ${formatPrice(Number.parseFloat(price))}
            </span>
          )}
        </div>

        {/* Stock */}
        <div className="mt-1 text-xs text-gray-500">
          {stock > 0 ? `${stock} in stock` : "Out of stock"}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
