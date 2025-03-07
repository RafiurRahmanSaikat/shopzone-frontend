import { Link } from "react-router-dom";

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
  // Add more categories as needed
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

export function CategoriesSection({ categories = [] }) {
  // Display up to 5 categories, or fewer if less are available
  const displayCategories = categories.slice(0, 5);

  return (
    <section className="section p-20">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="font-heading mb-3 text-4xl font-bold text-zinc-800 md:text-5xl dark:text-gray-200">
            Shop by <span className="text-primary-600">Category</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg">
            Explore our wide range of products across different categories
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-5">
          {displayCategories.map((category, index) => {
            const categoryInfo = categoryImages[category.name] || {
              icon: "/icons/default.svg",
              gradient: fallbackGradients[index % fallbackGradients.length],
            };

            return (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
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
                  <h3 className="group-hover:text-primary-600 text-lg font-semibold text-gray-900">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Explore {category.name}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
