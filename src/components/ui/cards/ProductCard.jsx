import { Eye, ShoppingCart, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useMouse } from "../../../hooks/useMouse";

const ProductCard = ({
  id,
  title,
  description,
  price,
  image,
  rating,
  categories = [],
  onShowDetails,
  onAddToCart,
  withArrow = false,
  circleSize = 400,
  className = "",
}) => {
  const [mouse, parentRef] = useMouse();

  return (
    <div
      ref={parentRef}
      className={`group relative overflow-hidden rounded-2xl bg-white/10 p-4 shadow-lg transition-transform hover:scale-[1.01] active:scale-95 ${className}`}
    >
      {/* Gradient Effect */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 transform-gpu rounded-full transition-opacity duration-500 group-hover:opacity-100"
        style={{
          maskImage: `radial-gradient(circle ${circleSize / 2}px at center, white, transparent)`,
          WebkitMaskImage: `radial-gradient(circle ${circleSize / 2}px at center, white, transparent)`,
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          left: `${mouse.elementX}px`,
          top: `${mouse.elementY}px`,
          background:
            "linear-gradient(135deg, #3BC4F2, #7A69F9, #F26378, #F5833F)",
          opacity: mouse.elementX === null || mouse.elementY === null ? 0 : 1,
        }}
      />

      {/* Background Overlay */}
      <div className="absolute inset-px rounded-xl bg-neutral-100/80 dark:bg-neutral-900/80" />

      {/* Product Image */}
      <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-lg bg-white/70 dark:bg-black/50">
        <Link to={`/product/${id}`}>
          <img
            src={image || "/placeholder.jpg"}
            alt={title}
            className="h-fit w-fit object-cover"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="relative px-4 pt-4 pb-2">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-300">
          {title}
        </h3>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          {description?.length > 200
            ? `${description.substring(0, 200)}...`
            : description}
        </p>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-200"
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}

        {/* Price & Rating */}
        <div className="my-2 flex flex-wrap items-center justify-between">
          <p className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
            ${price}
          </p>
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={16}
                fill={index < rating ? "#FFD700" : "none"}
                stroke={index < rating ? "#FFD700" : "#ccc"}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="my-2 flex justify-center gap-2 sm:flex-wrap">
          <Link
            to={`/product/${id}`}
            className="flex items-center justify-center gap-2 rounded-2xl border border-blue-600 px-3 py-2 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
          >
            <Eye size={16} />
            <span className="text-sm break-words">Show Details</span>
          </Link>
          <button
            onClick={() => onAddToCart(id)}
            type="button"
            className="flex items-center justify-center gap-2 rounded-full border border-emerald-600 px-3 py-2 text-sm font-semibold text-emerald-600 transition-colors hover:bg-emerald-600 hover:text-white"
          >
            <ShoppingCart size={16} />
            <span className="text-sm break-words">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

// ! AI

// import { Link } from "react-router-dom";
// import {
//   formatPrice,
//   generateRatingStars,
//   truncateText,
// } from "../../../utils/helpers";

// const ProductCard = ({
//   id,
//   title,
//   description,
//   price,
//   image,
//   rating,
//   categories,
//   onAddToCart,
// }) => {
//   const stars = generateRatingStars(rating);

//   return (
//     <div className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
//       {/* Discount badge would go here */}
//       <Link to={`/product/${id}`} className="block overflow-hidden">
//         <div className="relative h-48 overflow-hidden bg-gray-100">
//           <img
//             src={image || "/placeholder.jpg"}
//             alt={title}
//             className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
//             onError={(e) => {
//               e.target.src = "/placeholder.jpg";
//             }}
//           />
//         </div>
//       </Link>

//       <div className="p-4">
//         <div className="mb-2 flex items-center justify-between">
//           <div className="flex flex-wrap gap-1">
//             {categories &&
//               categories.map((category) => (
//                 <span
//                   key={category.id}
//                   className="inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
//                 >
//                   {category.name}
//                 </span>
//               ))}
//           </div>
//         </div>

//         <Link to={`/product/${id}`}>
//           <h3 className="hover:text-primary dark:hover:text-primary-light mb-1 text-lg font-semibold text-gray-800 transition-colors dark:text-white">
//             {truncateText(title, 40)}
//           </h3>
//         </Link>

//         <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
//           {truncateText(description, 60)}
//         </p>

//         <div className="mb-2 flex items-center">
//           {stars.map((type, index) => (
//             <span key={index}>
//               {type === "full" && (
//                 <svg
//                   className="h-4 w-4 text-yellow-400"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               )}
//               {type === "half" && (
//                 <svg
//                   className="h-4 w-4 text-yellow-400"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <defs>
//                     <linearGradient
//                       id="half-gradient"
//                       x1="0%"
//                       y1="0%"
//                       x2="100%"
//                       y2="0%"
//                     >
//                       <stop offset="50%" stopColor="currentColor" />
//                       <stop offset="50%" stopColor="#D1D5DB" />
//                     </linearGradient>
//                   </defs>
//                   <path
//                     fill="url(#half-gradient)"
//                     d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
//                   />
//                 </svg>
//               )}
//               {type === "empty" && (
//                 <svg
//                   className="h-4 w-4 text-gray-300"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               )}
//             </span>
//           ))}
//         </div>

//         <div className="mt-4 flex items-center justify-between">
//           <span className="text-xl font-bold text-gray-900 dark:text-white">
//             {formatPrice(price)}
//           </span>

//           <button
//             onClick={() => onAddToCart && onAddToCart(id)}
//             className="bg-primary hover:bg-primary-light focus:ring-primary rounded-full p-2 text-white shadow-md transition-all hover:shadow-lg focus:ring-2 focus:ring-offset-2 focus:outline-none dark:focus:ring-offset-gray-800"
//             aria-label="Add to cart"
//           >
//             <svg
//               className="h-5 w-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
