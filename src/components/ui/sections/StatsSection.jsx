import Badge from "../common/Badge";
import Container from "../common/Container";
import Grid from "../common/Grid";
import Section from "../common/Section";
import Text from "../common/Text";

// Default stats
const defaultStats = {
  main: {
    value: "92%",
    label: "of U.S. adults have bought from businesses using our platform",
    badge: "+7% this month",
  },
  secondary: [
    {
      value: "99.95%",
      label: "in fulfilling orders",
    },
    {
      value: "2,000+",
      label: "partner with our platform",
    },
    {
      value: "85%",
      label: "growth this year alone",
    },
  ],
};

const StatsSection = ({ stats = defaultStats, className = "", ...props }) => {
  return (
    <Section background="light" className={className} {...props}>
      <Container>
        <Grid cols={12} gap={6} className="items-center">
          <div className="lg:col-span-4">
            {/* Main Stat */}
            <div className="lg:pr-6 xl:pr-12">
              <Text className="text-6xl leading-tight font-bold text-indigo-600">
                {stats.main.value}
                {stats.main.badge && (
                  <Badge
                    variant="gray"
                    size="sm"
                    className="ml-1 inline-flex items-center gap-x-1"
                  >
                    <svg
                      className="size-4 shrink-0"
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                    </svg>
                    {stats.main.badge}
                  </Badge>
                )}
              </Text>
              <Text muted className="mt-2 sm:mt-3">
                {stats.main.label}
              </Text>
            </div>
          </div>

          <div className="relative lg:col-span-8 lg:before:absolute lg:before:-start-12 lg:before:top-0 lg:before:h-full lg:before:w-px lg:before:bg-gray-200 lg:before:dark:bg-zinc-700">
            <Grid cols={3} gap={6} className="sm:gap-8">
              {stats.secondary.map((stat, index) => (
                <div key={index}>
                  <Text className="text-3xl font-semibold text-indigo-600">
                    {stat.value}
                  </Text>
                  <Text muted className="mt-1">
                    {stat.label}
                  </Text>
                </div>
              ))}
            </Grid>
          </div>
        </Grid>
      </Container>
    </Section>
  );
};

export default StatsSection;
