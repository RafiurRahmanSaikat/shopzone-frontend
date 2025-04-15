import { ArrowRight, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button, Container, Heading, Text } from "../../components";

const NewsletterSection = ({
  title = "Join Our Newsletter",
  subtitle = "Subscribe to get exclusive offers, new arrival notifications, and personalized recommendations.",
  disclaimer = "By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.",
  className = "",
  ...props
}) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    // Simulate form submission
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }, 1000);
  };

  return (
    <section className={`relative overflow-hidden py-10`}>
      {/* Background Patterns */}
      {/* <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-indigo-500 opacity-20 blur-3xl"></div>
      <div className="absolute -right-16 -bottom-16 h-40 w-40 rounded-full bg-purple-500 opacity-20 blur-3xl"></div> */}

      {/* Decorative circles */}
      <div className="absolute top-12 right-12 h-8 w-8 rounded-full bg-black opacity-10 dark:bg-white"></div>
      <div className="absolute bottom-24 left-1/4 h-6 w-6 rounded-full bg-black opacity-10 dark:bg-white"></div>
      <div className="absolute top-1/3 left-12 h-4 w-4 rounded-full bg-black opacity-10 dark:bg-white"></div>

      <Container>
        <div className="text-center">
          <Heading className="mb-6">
            Join Our{" "}
            <span className="text-violet-600 dark:text-violet-400">
              Newsletter
            </span>
          </Heading>
          <Text size="xl" className="mx-auto mb-8 max-w-2xl">
            {subtitle}
          </Text>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="relative mx-auto max-w-md"
            aria-label="Newsletter Subscription"
          >
            {isSubmitted ? (
              <div className="flex items-center justify-center space-x-2 rounded-full bg-white/10 px-6 py-4 backdrop-blur-sm">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span className="font-medium">Thank you for subscribing!</span>
              </div>
            ) : (
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-full border-0 px-6 py-4 text-gray-900 placeholder-zinc-700 ring-2 shadow-md transition-all duration-300 focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:outline-none dark:placeholder-zinc-200"
                  required
                />
                <Button
                  type="submit"
                  variant="secondary"
                  shape="rounded"
                  size="lg"
                  className="font-semibold text-indigo-600"
                  isLoading={isLoading}
                  rightIcon={
                    !isLoading && (
                      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    )
                  }
                >
                  Subscribe
                </Button>
              </div>
            )}
            <Text size="sm" className="/60 mt-4">
              {disclaimer}
            </Text>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default NewsletterSection;
