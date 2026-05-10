import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Headset, ShieldCheck, Truck } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure payments",
    description:
      "Protected checkout with fraud monitoring and buyer protection.",
  },
  {
    icon: Truck,
    title: "Fast delivery",
    description: "Reliable shipping with tracking from vetted sellers.",
  },
  {
    icon: Headset,
    title: "24/7 support",
    description: "Real people, quick resolutions, every day.",
  },
  {
    icon: CreditCard,
    title: "Flexible pay",
    description: "Split payments and pay later on eligible items.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-5">
        <span className="mb-2 inline-flex items-center rounded-full bg-gradient-to-r from-amber-300 to-orange-300 px-3 py-1 text-xs font-semibold text-zinc-900 shadow-sm">
          Why ShopZone
        </span>
        <h2 className="text-2xl font-semibold tracking-tight">
          Designed for confident shopping
        </h2>
        <p className="text-sm text-muted-foreground">
          Everything you need for a smooth, trustworthy marketplace experience.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card
              key={feature.title}
              className="border-border/70 bg-card/80 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <CardContent className="space-y-2 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent text-primary">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-sm font-semibold">{feature.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
