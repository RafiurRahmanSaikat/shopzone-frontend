import { Gift, RotateCcw, Shield, Truck } from "lucide-react";

function FeaturesSection() {
  const features = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: "Free Shipping",
      description: "On orders over $50 within the US",
      bgColor: "bg-indigo-100 group-hover:bg-indigo-200",
      iconColor: "text-indigo-600",
    },
    {
      icon: <RotateCcw className="h-8 w-8" />,
      title: "Easy Returns",
      description: "30-day hassle-free returns",
      bgColor: "bg-purple-100 group-hover:bg-purple-200",
      iconColor: "text-purple-600",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure Payments",
      description: "Protected by industry-leading encryption",
      bgColor: "bg-blue-100 group-hover:bg-blue-200",
      iconColor: "text-blue-600",
    },
    {
      icon: <Gift className="h-8 w-8" />,
      title: "Loyalty Rewards",
      description: "Earn points with every purchase",
      bgColor: "bg-green-100 group-hover:bg-green-200",
      iconColor: "text-green-600",
    },
  ];

  return (
    <section className="border-t border-gray-200 py-20 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2"
            >
              <div
                className={`mb-4 rounded-full p-4 transition-colors duration-300 ${feature.bgColor} dark:bg-opacity-20`}
              >
                <span className={feature.iconColor}>{feature.icon}</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
