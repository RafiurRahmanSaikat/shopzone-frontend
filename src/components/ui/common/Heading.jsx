// Heading sizes
const sizes = {
  h1: "text-4xl md:text-5xl lg:text-6xl font-bold",
  h2: "text-3xl md:text-4xl lg:text-5xl font-bold",
  h3: "text-2xl md:text-3xl font-bold",
  h4: "text-xl md:text-2xl font-semibold",
  h5: "text-lg md:text-xl font-semibold",
  h6: "text-base md:text-lg font-semibold",
};

const Heading = ({ children, as = "h2", size, className = "", ...props }) => {
  const Component = as;

  // Determine size class based on heading level if not explicitly provided
  const sizeClass = size ? sizes[size] : sizes[as] || sizes.h2;

  // Combined classes
  const classes = `${sizeClass} text-zinc-700 dark:text-zinc-200 ${className}`;

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Heading;
