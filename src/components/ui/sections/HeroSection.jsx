import { ArrowRight } from "lucide-react";
import Button from "../common/Button";
import Container from "../common/Container";
import Flex from "../common/Flex";
import Heading from "../common/Heading";
import Section from "../common/Section";
import Text from "../common/Text";

const HeroSection = ({
  title,
  subtitle,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  image,
  backgroundPattern = true,
  className = "",
  ...props
}) => {
  return (
    <Section
      background="light"
      py="py-20"
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Background decoration */}
      {backgroundPattern && (
        <>
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-indigo-100 opacity-70 blur-3xl dark:bg-indigo-900/30"></div>
          <div className="absolute -right-32 -bottom-32 h-64 w-64 rounded-full bg-purple-100 opacity-70 blur-3xl dark:bg-purple-900/30"></div>
        </>
      )}

      <Container>
        <Flex direction="row" align="center" className="lg:gap-16">
          {/* Hero content */}
          <div className="w-full text-center lg:w-1/2 lg:text-left">
            <Heading as="h1" className="mb-6">
              {title || (
                <>
                  Discover the Latest
                  <span className="mt-1 block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                    Fashion Trends
                  </span>
                </>
              )}
            </Heading>

            <Text size="xl" muted className="mx-auto mb-8 max-w-lg lg:mx-0">
              {subtitle ||
                "Explore our curated collection of premium products at unbeatable prices. Free shipping on orders over $50!"}
            </Text>

            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              {primaryButtonLink && (
                <Button
                  href={primaryButtonLink}
                  variant="primary"
                  shape="rounded"
                  size="lg"
                  rightIcon={
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  }
                  className="group"
                >
                  {primaryButtonText || "Shop Now"}
                </Button>
              )}

              {secondaryButtonLink && (
                <Button
                  href={secondaryButtonLink}
                  variant="secondary"
                  shape="rounded"
                  size="lg"
                >
                  {secondaryButtonText || "Browse Categories"}
                </Button>
              )}
            </div>
          </div>

          {/* Hero image */}
          <div className="hidden w-1/2 lg:block">
            <div className="relative">
              <img
                src={image || "/placeholder.svg?height=400&width=600"}
                alt="Hero"
                className="rounded-2xl shadow-2xl"
              />

              {/* Floating product cards */}
              <div className="absolute -bottom-6 -left-6 rounded-xl bg-white/95 p-4 shadow-xl backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-zinc-800/95">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80"
                      alt="Smart Watch"
                      className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Smart Watch
                    </p>
                    <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                      $199.99
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Flex>
      </Container>
    </Section>
  );
};

export default HeroSection;
