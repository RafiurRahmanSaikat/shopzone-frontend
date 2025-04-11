const Skeleton = ({ variant = "rectangle", width, height, className = "", ...props }) => {
  // Variant styles
  const variantStyles = {
    rectangle: "rounded",
    circle: "rounded-full",
    text: "rounded h-4 w-3/4",
  }

  // Custom dimensions
  const customStyles = {
    width: width ? `width: ${width}px` : "",
    height: height ? `height: ${height}px` : "",
  }

  return (
    <div
      className={`
        animate-pulse bg-gray-300 dark:bg-zinc-700
        ${variantStyles[variant]}
        ${className}
      `}
      style={{
        ...customStyles,
        ...props.style,
      }}
      {...props}
    />
  )
}

// Preset skeletons
Skeleton.Text = ({ lines = 3, className = "", ...props }) => (
  <div className={`space-y-2 ${className}`} {...props}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} variant="text" className={i === lines - 1 ? "w-1/2" : "w-full"} />
    ))}
  </div>
)

Skeleton.Card = ({ className = "", ...props }) => (
  <div className={`space-y-3 ${className}`} {...props}>
    <Skeleton className="h-40 w-full" />
    <Skeleton variant="text" />
    <Skeleton variant="text" />
    <Skeleton variant="text" className="w-1/2" />
  </div>
)

Skeleton.Avatar = ({ size = "md", className = "", ...props }) => {
  const sizeMap = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  }

  return <Skeleton variant="circle" className={`${sizeMap[size]} ${className}`} {...props} />
}

export default Skeleton
