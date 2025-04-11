const Grid = ({ children, cols = 1, gap = 4, className = "", ...props }) => {
  // Responsive column classes
  const colClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
    6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
  }

  // Gap classes
  const gapClasses = {
    0: "gap-0",
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
    12: "gap-12",
  }

  // Base classes
  const baseClasses = `grid ${colClasses[cols] || colClasses[1]} ${gapClasses[gap] || gapClasses[4]}`

  // Combined classes
  const classes = `${baseClasses} ${className}`

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export default Grid

