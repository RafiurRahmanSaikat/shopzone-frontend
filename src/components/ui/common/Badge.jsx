// Badge variants
const variants = {
  primary:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
  secondary:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  success:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  danger: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  warning:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  gray: "bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-gray-300",
};

// Badge sizes
const sizes = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-sm",
  lg: "px-3 py-1 text-base",
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
  // Base classes
  const baseClasses = "inline-flex items-center font-medium rounded-full";

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
