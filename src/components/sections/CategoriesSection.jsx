import { Link } from "react-router-dom";
import { Container, Grid, Heading, Text } from "../../components";

// Default category images if not provided by API
const categoryImages = {
  Electronics: {
    icon: "/icons/electronics.svg",
    gradient: "from-blue-500 to-indigo-600",
  },
  Fashion: {
    icon: "/icons/fashion.svg",
    gradient: "from-pink-500 to-rose-600",
  },
  "Home & Kitchen": {
    icon: "/icons/home.svg",
    gradient: "from-amber-500 to-orange-600",
  },
  Sports: {
    icon: "/icons/sports.svg",
    gradient: "from-green-500 to-emerald-600",
  },
  Furniture: {
    icon: "/icons/furniture.svg",
    gradient: "from-purple-500 to-violet-600",
  },
  Mobile: {
    icon: "/icons/mobile.svg",
    gradient: "from-blue-400 to-cyan-600",
  },
};

// Fallback gradient for categories without a specific gradient
const fallbackGradients = [
  "from-blue-500 to-indigo-600",
  "from-pink-500 to-rose-600",
  "from-amber-500 to-orange-600",
  "from-green-500 to-emerald-600",
  "from-purple-500 to-violet-600",
  "from-red-500 to-pink-600",
  "from-cyan-500 to-blue-600",
  "from-yellow-500 to-amber-600",
];

const CategoriesSection = ({
  categories = [],

  maxCategories = 5,
}) => {
  // Display up to maxCategories, or fewer if less are available
  const displayCategories = categories.slice(0, maxCategories);

  return (
    <section className="py-10">
      <Container>
        <div className="mb-12 text-center">
          <Heading>
            Shop by{" "}
            <span className="text-violet-600 dark:text-violet-400">
              Category
            </span>
          </Heading>

          <Text size="lg" muted className="mx-auto mt-4 max-w-2xl">
            {"Explore our wide range of products across different categories"}
          </Text>
        </div>

        <Grid
          cols={5}
          gap={6}
          className="grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
        >
          {displayCategories.map((category, index) => {
            const categoryInfo = categoryImages[category.name] || {
              icon: "/icons/default.svg",
              gradient: fallbackGradients[index % fallbackGradients.length],
            };

            return (
              <Link
                key={category.id}
                to={`/products/?categories=${category.id}`}
                className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border dark:border-zinc-700 dark:bg-zinc-800"
              >
                {/* <div
                  className={`h-40 overflow-hidden bg-gradient-to-br ${categoryInfo.gradient}`}
                >
                  <div className="absolute inset-0 bg-black opacity-10 transition-opacity group-hover:opacity-20"></div>
                  <img
                    src={categoryInfo.icon || "/placeholder.svg"}
                    alt={category.name}
                    className="animate-float mx-auto mt-8 h-24 w-24 transform transition-transform group-hover:scale-110"
                  />
                </div> */}
                <div className="p-4 text-center">
                  <Text
                    weight="semibold"
                    className="text-zinc-900 group-hover:text-violet-600 dark:text-zinc-100 dark:group-hover:text-violet-400"
                  >
                    {category.name}
                  </Text>
                  <Text size="sm" muted>
                    Explore {category.name}
                  </Text>
                </div>
              </Link>
            );
          })}
        </Grid>
      </Container>
    </section>
  );
};

export default CategoriesSection;
