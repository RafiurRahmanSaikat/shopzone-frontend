import { Link } from "react-router-dom";

// Button variants
const variants = {
  primary:
    "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg",
  secondary:
    "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 dark:bg-zinc-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700",
  outline:
    "bg-transparent border border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-900/30",
  ghost:
    "bg-transparent text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/30",
  danger: "bg-red-600 text-white hover:bg-red-700",
  success: "bg-green-600 text-white hover:bg-green-700",
};

// Button sizes
const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg",
  xl: "px-8 py-4 text-xl",
};

// Button shapes
const shapes = {
  default: "rounded-md",
  rounded: "rounded-full",
  square: "rounded-none",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  shape = "default",
  className = "",
  href,
  isLoading = false,
  leftIcon,
  rightIcon,
  ...props
}) => {
  // Base classes
  const baseClasses =
    "inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";

  // Combined classes
  const classes = `${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${shapes[shape] || shapes.default} ${className}`;

  // Loading spinner
  const LoadingSpinner = () => (
    <svg
      className="mr-2 -ml-1 h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  // If href is provided, render as Link
  if (href) {
    return (
      <Link to={href} className={classes} {...props}>
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button className={classes} disabled={isLoading} {...props}>
      {isLoading && <LoadingSpinner />}
      {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
