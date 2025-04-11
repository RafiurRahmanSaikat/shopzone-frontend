import React from "react";

// Define spinner sizes with increased values
const spinnerSizes = {
  xs: "w-4 h-4",
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10",
  xl: "w-14 h-14",
  "2xl": "w-30 h-30",
};

// Define spinner variants with dark mode adjustments
const spinnerVariants = {
  primary: "text-indigo-600 dark:text-indigo-400",
  secondary: "text-purple-600 dark:text-purple-400",
  white: "text-white",
  gray: "text-gray-500 dark:text-gray-300",
  gradient: "", // special handling in SVG for gradient
};

export default function Spinner({
  containerClass = "",
  size = "2xl",
  variant = "primary",
}) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${containerClass}`}
    >
      <div className="flex flex-col items-center justify-center sm:flex-row">
        <svg
          className={`${spinnerSizes[size]} animate-spin ${
            variant !== "gradient" ? spinnerVariants[variant] : ""
          }`}
          role="status"
          aria-label="Loading..."
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          {variant === "gradient" && (
            <defs>
              <linearGradient
                id="spinner-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#9333ea" />
              </linearGradient>
            </defs>
          )}
          <circle
            className="opacity-90"
            cx="12"
            cy="12"
            r="10"
            stroke={
              variant === "gradient" ? "url(#spinner-gradient)" : "currentColor"
            }
            strokeWidth="4"
            strokeDasharray="1, 3"
          ></circle>
        </svg>
        {/* "Loading..." text is hidden on small devices */}
        <span
          className={`ml-4 hidden text-xl font-medium sm:inline md:text-5xl ${
            spinnerVariants[variant] || ""
          }`}
        >
          Loading...
        </span>
      </div>
    </div>
  );
}
