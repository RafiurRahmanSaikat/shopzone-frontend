// Icon sizes
const sizes = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
  "2xl": "w-10 h-10",
}

const Icon = ({ children, size = "md", className = "", ...props }) => {
  // Base classes
  const baseClasses = `inline-block ${sizes[size] || sizes.md}`

  // Combined classes
  const classes = `${baseClasses} ${className}`

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  )
}

export default Icon

