// Text sizes
const sizes = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
}

// Text weights
const weights = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
}

const Text = ({ children, size = "md", weight = "normal", className = "", as = "p", muted = false, ...props }) => {
  const Component = as

  // Base classes
  const baseClasses = `${sizes[size] || sizes.md} ${weights[weight] || weights.normal}`

  // Text color
  const colorClass = muted ? "text-gray-500 dark:text-gray-400" : "text-gray-900 dark:text-white"

  // Combined classes
  const classes = `${baseClasses} ${colorClass} ${className}`

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}

export default Text

