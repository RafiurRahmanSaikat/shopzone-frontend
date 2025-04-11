import Container from "./Container";

// Background variants
const backgrounds = {
  white: "bg-white dark:bg-zinc-900",
  light: "bg-gray-50 dark:bg-zinc-800",
  dark: "bg-gray-900 text-white",
  gradient: "bg-gradient-to-br from-indigo-600 to-purple-600 text-white",
  transparent: "bg-transparent",
};

const Section = ({
  children,
  className = "",
  background = "white",
  containerClassName = "",
  fluid = false,
  py = "py-16",
  id,
  ...props
}) => {
  // Base classes
  const baseClasses = `${py} ${backgrounds[background] || backgrounds.white}`;

  // Combined classes
  const classes = `${baseClasses} ${className}`;

  return (
    <section className={classes} id={id} {...props}>
      <Container fluid={fluid} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
};

export default Section;
