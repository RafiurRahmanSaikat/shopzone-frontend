const Flex = ({
  children,
  direction = "row",
  justify = "start",
  align = "start",
  wrap = false,
  gap = 0,
  className = "",
  ...props
}) => {
  // Direction classes
  const directionClasses = {
    row: "flex-row",
    col: "flex-col",
    "row-reverse": "flex-row-reverse",
    "col-reverse": "flex-col-reverse",
  }

  // Justify classes
  const justifyClasses = {
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
  }

  // Align classes
  const alignClasses = {
    start: "items-start",
    end: "items-end",
    center: "items-center",
    baseline: "items-baseline",
    stretch: "items-stretch",
  }

  // Wrap classes
  const wrapClasses = wrap ? "flex-wrap" : "flex-nowrap"

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
  const baseClasses = `flex ${directionClasses[direction] || directionClasses.row} ${justifyClasses[justify] || justifyClasses.start} ${alignClasses[align] || alignClasses.start} ${wrapClasses} ${gapClasses[gap] || gapClasses[0]}`

  // Combined classes
  const classes = `${baseClasses} ${className}`

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}

export default Flex

