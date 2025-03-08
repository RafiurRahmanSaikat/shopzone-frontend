// Updated Badge variants with improved dark mode readability and added borders
const variants = {
  primary:
    "bg-indigo-100 text-indigo-800 border border-indigo-500 dark:bg-indigo-700 dark:text-indigo-100 dark:border-indigo-400",
  secondary:
    "bg-purple-100 text-purple-800 border border-purple-500 dark:bg-purple-700 dark:text-purple-100 dark:border-purple-400",
  success:
    "bg-green-100 text-green-800 border border-green-500 dark:bg-green-700 dark:text-green-100 dark:border-green-400",
  danger:
    "bg-red-100 text-red-800 border border-red-500 dark:bg-red-700 dark:text-red-100 dark:border-red-400",
  warning:
    "bg-amber-100 text-amber-800 border border-amber-500 dark:bg-amber-700 dark:text-amber-100 dark:border-amber-400",
  info: "bg-blue-100 text-blue-800 border border-blue-500 dark:bg-blue-700 dark:text-blue-100 dark:border-blue-400",
  gray: "bg-gray-100 text-gray-800 border border-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-400",
  gradient:
    "bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 border border-indigo-500 dark:border-indigo-400",
};

// Adjusted Badge sizes for better padding and readability
const sizes = {
  sm: "px-3 py-1 text-xs",
  md: "px-4 py-1.5 text-sm",
  lg: "px-5 py-2 text-base",
};

const Badge = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  pulse = false,
  ...props
}) => {
  // Base classes with improved typography
  const baseClasses =
    "inline-flex items-center font-semibold rounded-full tracking-wide leading-tight";

  // Pulse animation
  const pulseClasses = pulse ? "animate-pulse" : "";

  // Combined classes
  const classes = `${baseClasses} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${pulseClasses} ${className}`;

  return (
    <span className={classes} {...props}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;
