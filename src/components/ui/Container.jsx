const Container = ({ children, className = "", fluid = false, as = "div", ...props }) => {
  const Component = as

  // Base classes
  const baseClasses = fluid ? "w-full px-4 sm:px-6 lg:px-8" : "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"

  // Combined classes
  const classes = `${baseClasses} ${className}`

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}

export default Container

