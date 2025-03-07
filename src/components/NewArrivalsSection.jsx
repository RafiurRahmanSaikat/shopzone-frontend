import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const NewArrivalsSection = ({ products }) => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
          <div>
            <div className="mb-2 flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-blue-600" />
              <span className="text-sm font-semibold tracking-wider text-blue-600 uppercase">
                Just Arrived
              </span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
            <p className="mt-2 text-gray-600">
              Check out our latest products added this week
            </p>
          </div>
          <Link
            to="/products?sort=newest"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            View all new arrivals
            <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivalsSection;
