/* eslint-disable react/no-unescaped-entities */
import { Star } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <span className="mb-2 inline-block rounded-full px-3 py-1 text-sm font-semibold">
            Customer Love
          </span>
          <h2 className="font-heading mb-3 text-4xl font-bold text-gray-900">
            What Our Customers Say
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Real experiences from our satisfied shoppers
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="group rounded-xl bg-gray-50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
            <div className="mb-4 flex text-yellow-400">
              <Star className="h-5 w-5 fill-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400" />
            </div>
            <p className="mb-6 text-gray-700 group-hover:text-gray-900">
              "The quality of the products exceeded my expectations. Fast
              shipping and excellent customer service. Will definitely shop here
              again!"
            </p>
            <div className="flex items-center">
              <div className="h-12 w-12 overflow-hidden rounded-full">
                <img
                  src="https://randomuser.me/api/portraits/women/12.jpg"
                  alt="Sarah T."
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="ml-3">
                <div className="font-semibold text-gray-900">Sarah T.</div>
                <div className="text-sm text-gray-500">Loyal Customer</div>
              </div>
            </div>
          </div>

          <div className="group rounded-xl bg-gray-50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
            <div className="mb-4 flex text-yellow-400">
              <Star className="h-5 w-5 fill-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400" />
            </div>
            <p className="mb-6 text-gray-700 group-hover:text-gray-900">
              "I love the wide selection of products. The website is easy to
              navigate, and checkout is seamless. My new favorite online store!"
            </p>
            <div className="flex items-center">
              <div className="h-12 w-12 overflow-hidden rounded-full">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Michael R."
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="ml-3">
                <div className="font-semibold text-gray-900">Michael R.</div>
                <div className="text-sm text-gray-500">New Customer</div>
              </div>
            </div>
          </div>

          <div className="group rounded-xl bg-gray-50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-md">
            <div className="mb-4 flex text-yellow-400">
              <Star className="h-5 w-5 fill-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400" />
              <Star className="h-5 w-5 fill-yellow-400" />
            </div>
            <p className="mb-6 text-gray-700 group-hover:text-gray-900">
              "The return process was so easy when I needed to exchange a size.
              Customer service was helpful and responsive. Great experience
              overall!"
            </p>
            <div className="flex items-center">
              <div className="h-12 w-12 overflow-hidden rounded-full">
                <img
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Emily L."
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="ml-3">
                <div className="font-semibold text-gray-900">Emily L.</div>
                <div className="text-sm text-gray-500">Repeat Shopper</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
