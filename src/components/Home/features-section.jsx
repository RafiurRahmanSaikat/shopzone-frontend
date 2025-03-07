import { Gift, RotateCcw, Shield, Truck } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="section border-t border-gray-200 py-20">
      <div className="container-custom">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group flex flex-col items-center text-center transition-transform hover:-translate-y-2">
            <div className="group-hover:bg-primary-200 mb-4 rounded-full p-4 transition-colors">
              <Truck className="text-primary-600 h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Free Shipping</h3>
            <p className="text-gray-600">On orders over $50 within the US</p>
          </div>

          <div className="group flex flex-col items-center text-center transition-transform hover:-translate-y-2">
            <div className="bg-secondary-100 group-hover:bg-secondary-200 mb-4 rounded-full p-4 transition-colors">
              <RotateCcw className="text-secondary-600 h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Easy Returns</h3>
            <p className="text-gray-600">30-day hassle-free returns</p>
          </div>

          <div className="group flex flex-col items-center text-center transition-transform hover:-translate-y-2">
            <div className="bg-accent-100 group-hover:bg-accent-200 mb-4 rounded-full p-4 transition-colors">
              <Shield className="text-accent-600 h-8 w-8" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Secure Payments</h3>
            <p className="text-gray-600">
              Protected by industry-leading encryption
            </p>
          </div>

          <div className="group flex flex-col items-center text-center transition-transform hover:-translate-y-2">
            <div className="mb-4 rounded-full bg-green-100 p-4 transition-colors group-hover:bg-green-200">
              <Gift className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Loyalty Rewards</h3>
            <p className="text-gray-600">Earn points with every purchase</p>
          </div>
        </div>
      </div>
    </section>
  );
}
