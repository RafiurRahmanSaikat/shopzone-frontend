import { Flame } from "lucide-react"
import Section from "../common/Section"
import Container from "../common/Container"
import Heading from "../common/Heading"
import Text from "../common/Text"
import Grid from "../common/Grid"
import Card from "../common/Card"

const FridayDealsSection = ({
  featuredProducts = [],
  title = "Premium Items",
  subtitle = "Exclusive savings on our premium products priced over $500. Limited-time offers on high-end items!",
  discountPercentage = 50,
  className = "",
  ...props
}) => {
  return (
    <Section className={`bg-gradient-to-br from-zinc-900 to-zinc-800 ${className}`} {...props}>
      <Container>
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
              <Flame className="mr-2 h-5 w-5 animate-pulse text-amber-400" />
              <span className="text-sm font-bold tracking-wide text-zinc-200 uppercase">
                Premium Products - {discountPercentage}% OFF
              </span>
            </div>

            <Heading className="mt-6 text-white">
              <span className="animate-pulse text-yellow-300">{discountPercentage}% OFF</span> {title}
            </Heading>

            <Text size="lg" className="mt-6 text-zinc-300">
              {subtitle}
            </Text>
          </div>

          <div className="relative">
            <div className="animate-spin-slow absolute -top-8 -right-8 h-32 w-32 rounded-full bg-white/10"></div>
            <div className="animate-spin-slow absolute -bottom-8 left-8 h-24 w-24 rounded-full bg-white/10"></div>

            <Card className="animate-float bg-white/10 p-6 backdrop-blur-sm">
              <Grid cols={2} gap={5}>
                {featuredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative overflow-hidden rounded-lg bg-white/10 shadow-md backdrop-blur-2xl"
                  >
                    <div className="absolute -top-12 -right-12 z-10 h-24 w-24 rotate-12 bg-violet-500 shadow"></div>
                    <span className="absolute top-1 right-1 z-20 text-xs font-bold text-white">
                      -{discountPercentage}%
                    </span>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-32 w-full object-cover object-center transition-transform group-hover:scale-110"
                    />
                    <div className="p-3">
                      <Text size="xs" weight="medium" className="truncate text-zinc-100">
                        {product.name}
                      </Text>
                      <div className="mt-1 flex items-center justify-between">
                        <Text size="sm" weight="bold" className="text-violet-400">
                          ${(Number.parseFloat(product.price) * (1 - discountPercentage / 100)).toFixed(2)}
                        </Text>
                        <Text size="xs" className="text-zinc-400 line-through">
                          ${product.price}
                        </Text>
                      </div>
                    </div>
                  </div>
                ))}
              </Grid>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  )
}

export default FridayDealsSection

