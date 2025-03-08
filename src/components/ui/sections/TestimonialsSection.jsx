import { Star } from "lucide-react";
import Badge from "../common/Badge";
import Card from "../common/Card";
import Container from "../common/Container";
import Grid from "../common/Grid";
import Heading from "../common/Heading";
import Text from "../common/Text";

// Default testimonials
const defaultTestimonials = [
  {
    content:
      "The quality of the products exceeded my expectations. Fast shipping and excellent customer service. Will definitely shop here again!",
    author: "Sarah T.",
    role: "Loyal Customer",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 5,
  },
  {
    content:
      "I love the wide selection of products. The website is easy to navigate, and checkout is seamless. My new favorite online store!",
    author: "Michael R.",
    role: "New Customer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    content:
      "The return process was so easy when I needed to exchange a size. Customer service was helpful and responsive. Great experience overall!",
    author: "Emily L.",
    role: "Repeat Shopper",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
  },
];

const TestimonialsSection = ({
  testimonials = defaultTestimonials,
  title = "What Our Customers Say",
  subtitle = "Real experiences from our satisfied shoppers",
  badgeText = "Customer Love",
  cols = 3,
  className = "",
  ...props
}) => {
  return (
    <section>
      <Container>
        <div className="mb-12 text-center">
          {badgeText && <Badge className="mb-4">{badgeText}</Badge>}
          <Heading>
            What Our{" "}
            <span className="text-violet-600 dark:text-violet-400">
              Customers Say ..
            </span>
          </Heading>

          {subtitle && (
            <Text size="lg" muted className="mx-auto mt-4 max-w-2xl">
              {subtitle}
            </Text>
          )}
        </div>

        <Grid cols={cols} gap={8}>
          {testimonials.map((testimonial, index) => (
            <Card key={index} hover className="group h-full">
              <Card.Body>
                {/* Rating stars */}
                <div className="mb-4 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? "fill-yellow-400" : "fill-gray-200 dark:fill-gray-700"}`}
                    />
                  ))}
                </div>

                {/* Testimonial content */}
                <Text className="mb-6 group-hover:text-gray-900 dark:group-hover:text-white">
                  &quot;{testimonial.content}&quot;
                </Text>

                {/* Author info */}
                <div className="flex items-center">
                  {testimonial.avatar && (
                    <div className="h-12 w-12 overflow-hidden rounded-full">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.author}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="ml-3">
                    <Text
                      weight="semibold"
                      className="text-gray-900 dark:text-white"
                    >
                      {testimonial.author}
                    </Text>
                    <Text size="sm" muted>
                      {testimonial.role}
                    </Text>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
