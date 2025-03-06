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

// import { Eye, ShoppingCart, Star } from "lucide-react";
// import React from "react";
// import { Link } from "react-router-dom";
// import { useMouse } from "../../../hooks/useMouse";

// const ProductCard = ({
//   id,
//   title,
//   description,
//   price,
//   image,
//   rating,
//   categories = [],
//   onShowDetails,
//   onAddToCart,
//   withArrow = false,
//   circleSize = 400,
//   className = "",
// }) => {
//   const [mouse, parentRef] = useMouse();

//   return (
//     <div
//       ref={parentRef}
//       className={`group relative overflow-hidden rounded-2xl bg-white/10 p-4 shadow-lg transition-transform hover:scale-[1.01] active:scale-95 ${className}`}
//     >
//       {/* Gradient Effect */}

//       <div
//         className="absolute -translate-x-1/2 -translate-y-1/2 transform-gpu rounded-full transition-opacity duration-500 group-hover:opacity-100"
//         style={{
//           maskImage: `radial-gradient(circle ${circleSize / 2}px at center, white, transparent)`,
//           WebkitMaskImage: `radial-gradient(circle ${circleSize / 2}px at center, white, transparent)`,
//           width: `${circleSize}px`,
//           height: `${circleSize}px`,
//           left: `${mouse.elementX}px`,
//           top: `${mouse.elementY}px`,
//           background:
//             "linear-gradient(135deg, #3BC4F2, #7A69F9, #F26378, #F5833F)",
//           opacity: mouse.elementX === null || mouse.elementY === null ? 0 : 1,
//         }}
//       />

//       {/* Background Overlay */}
//       <div className="absolute inset-px rounded-xl bg-neutral-100/80 dark:bg-neutral-900/80" />

//       {/* Product Image */}
//       <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-lg bg-white/70 dark:bg-black/50">
//         <Link to={`/product/${id}`}>
//           <img
//             src={image || "/placeholder.jpg"}
//             alt={title}
//             className="h-fit w-fit object-cover"
//           />
//         </Link>
//       </div>

//       {/* Product Details */}
//       <div className="relative px-4 pt-4 pb-2">
//         <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-300">
//           {title}
//         </h3>
//         <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
//           {description?.length > 200
//             ? `${description.substring(0, 200)}...`
//             : description}
//         </p>

//         {/* Categories */}
//         {categories.length > 0 && (
//           <div className="mt-2 flex flex-wrap gap-2">
//             {categories.map((cat) => (
//               <span
//                 key={cat.id}
//                 className="rounded-full border border-gray-300 px-2 py-1 text-xs text-gray-600"
//               >
//                 {cat.name}
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Price & Rating */}
//         <div className="mt-4 flex items-center justify-between">
//           <p className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
//             ${price}
//           </p>
//           <div className="flex items-center space-x-1">
//             {[...Array(5)].map((_, index) => (
//               <Star
//                 key={index}
//                 size={16}
//                 fill={index < rating ? "#FFD700" : "none"}
//                 stroke={index < rating ? "#FFD700" : "#ccc"}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="mt-4 flex justify-between gap-2">
//           <Link
//             to={`/product/${id}`}
//             className="flex items-center gap-2 rounded-2xl border border-solid px-3 py-1 text-blue-600 transition-colors hover:text-blue-800 hover:underline"
//           >
//             <Eye size={16} />
//             Show Details
//           </Link>
//           <button
//             onClick={() => onAddToCart(id)}
//             type="button"
//             className="flex cursor-pointer items-center gap-2 rounded-full border border-solid px-3 py-1 text-center text-sm font-semibold text-emerald-600 shadow-xs transition-colors duration-500 hover:bg-emerald-600 hover:text-green-200 hover:underline"
//           >
//             <ShoppingCart size={16} />
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
