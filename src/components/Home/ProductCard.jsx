import React from "react";
import { useMouse } from "../../hooks/useMouse";

const ProductCard = ({
  title,
  description,
  price,
  image,
  withArrow = false,
  circleSize = 400,
  className = "",
  children,
}) => {
  const [mouse, parentRef] = useMouse();

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-white/10 p-4 transition-transform hover:scale-[1.01] active:scale-95 ${className}`}
      ref={parentRef}
    >
      {withArrow && (
        <div className="absolute top-2 right-2 z-10 translate-y-4 text-neutral-700 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 dark:text-neutral-300">
          →
        </div>
      )}
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
            "linear-gradient(135deg, #3BC4F2, #7A69F9,#F26378,#F5833F)",
          opacity: mouse.elementX === null || mouse.elementY === null ? 0 : 1,
        }}
      />
      <div className="absolute inset-px rounded-xl bg-neutral-100/80 dark:bg-neutral-900/80" />

      <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-lg bg-white/70 dark:bg-black/50">
        <img
          src={image || "/placeholder.jpg"}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative px-4 pt-4 pb-2">
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-300">
          {title}
        </h3>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
        <p className="mt-4 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
          ${price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
