/* eslint-disable react/display-name */
// Card variants
const variants = {
  default: "bg-white dark:bg-zinc-900 shadow-md",
  elevated: "bg-white dark:bg-zinc-800 shadow-lg",
  outlined:
    "bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700",
  flat: "bg-gray-50 dark:bg-zinc-900",
  gradient:
    "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20",
};

const Card = ({
  children,
  variant = "default",
  className = "",
  hover = false,
  ...props
}) => {
  // Base classes
  const baseClasses = "rounded-xl overflow-hidden";

  // Hover effect
  const hoverClasses = hover
    ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    : "";

  // Combined classes
  const classes = `${baseClasses} ${variants[variant] || variants.default} ${hoverClasses} ${className}`;

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

// Card subcomponents
Card.Header = ({ children, className = "", ...props }) => (
  <div
    className={`border-b border-gray-200 p-4 dark:border-gray-700 ${className}`}
    {...props}
  >
    {children}
  </div>
);

Card.Body = ({ children, className = "", ...props }) => (
  <div className={`p-4 ${className}`} {...props}>
    {children}
  </div>
);

Card.Footer = ({ children, className = "", ...props }) => (
  <div
    className={`border-t border-gray-200 p-4 dark:border-gray-700 ${className}`}
    {...props}
  >
    {children}
  </div>
);

Card.Image = ({ src, alt, className = "", ...props }) => (
  <div className="relative w-full overflow-hidden">
    <img
      src={src || "/placeholder.png"}
      alt={alt || "Card image"}
      className={`w-full object-cover ${className}`}
      {...props}
    />
  </div>
);

export default Card;
