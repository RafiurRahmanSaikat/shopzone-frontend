import { ArrowUpRight, Star, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import Badge from "../common/Badge";
import Container from "../common/Container";
import Grid from "../common/Grid";
import Heading from "../common/Heading";
import Text from "../common/Text";

const TrendingSection = ({
  products = [],
  subtitle = "Discover our best-reviewed products loved by customers",
  badgeText = "Top Rated Products",
  className = "",
  ...props
}) => {
  return (
    <section className="py-10">
      <Container>
        <div className="mb-10 text-center">
          {badgeText && (
            <Badge
              variant="success"
              className="mb-4"
              icon={<TrendingUp className="mr-1 h-4 w-4" />}
            >
              {badgeText}
            </Badge>
          )}

          <Heading className="text-white">
            <span className="animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text font-bold text-transparent transition-all duration-300 hover:from-indigo-600 hover:to-purple-700">
              &quot; Trending &quot; ,{"  "}
            </span>
            Items
          </Heading>
          <Text
            size="lg"
            className="mx-auto mt-3 max-w-2xl text-zinc-800 dark:text-zinc-300"
          >
            {subtitle}
          </Text>
        </div>

        <Grid cols={2} gap={6}>
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group animate-fade-in relative overflow-hidden rounded-2xl bg-zinc-100 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-zinc-800"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute top-2 right-2 z-10 rounded-full bg-amber-600 p-2 font-semibold text-white">
                Top Rated!
              </div>

              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-64 w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>

              <div className="absolute right-0 bottom-0 left-0 translate-y-8 p-6 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <Text size="xl" weight="bold">
                  {product.name}
                </Text>

                <div className="mt-2 flex items-center">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-zinc-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm">({product.rating})</span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <Text size="lg" weight="bold">
                      ${product.price}
                    </Text>
                  </div>
                  <Link
                    to={`/products/${product.id}`}
                    className="rounded-full bg-amber-600 p-2 shadow-md transition-transform hover:scale-110"
                  >
                    <ArrowUpRight className="h-5 w-5 text-white" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default TrendingSection;
