import { ShieldCheck, ShoppingBag, Truck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-12 dark:bg-zinc-900">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              ShopZone
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Your ultimate destination for seamless online shopping. Discover
              the latest products, exclusive deals, and a hassle-free
              experience.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Customer Service
            </h3>
            <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Stay Connected
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Subscribe to our newsletter for the latest updates and exclusive
              offers.
            </p>
            <div className="mt-4 flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="mr-2 w-full rounded-md bg-white px-4 py-2 text-gray-900 outline-none dark:text-gray-700"
              />
              <button className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-300 pt-6 md:flex-row dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} ShopZone. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <Truck className="h-5 w-5" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <ShieldCheck className="h-5 w-5" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
              <ShoppingBag className="h-5 w-5" />
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
