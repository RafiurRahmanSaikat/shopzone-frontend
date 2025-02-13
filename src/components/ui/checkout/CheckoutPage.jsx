import React from "react";

// react icons
import { AiOutlinePlus } from "react-icons/ai";

// global styles

const CheckoutPage = () => {
  return (
    <div className="flex w-full flex-col gap-8 md:flex-row md:gap-0">
      {/* Left Column - Order Summary */}
      <div className="flex-1 rounded-md bg-gray-50 p-4 md:p-8">
        {/* order summery */}
        <div>
          <h2 className="mb-6 text-[1.2rem] font-semibold text-gray-700">
            Your order
          </h2>
          <div className="rounded-md border border-gray-200">
            <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center">
              <div className="relative w-max rounded-md border border-gray-200 bg-white">
                <img
                  src="https://i.ibb.co.com/x6fq6nC/Rectangle-516.png"
                  alt="Nike Air Zoom Pegasus 39"
                  className="h-20 w-20 rounded object-cover"
                />

                <span className="absolute -top-2 -right-2 z-30 rounded-full border border-gray-200 bg-white px-[0.45rem] text-[0.9rem] text-gray-800 shadow-sm">
                  1
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Nike Air Zoom Pegasus 39</h3>
                <div className="mt-2 flex items-center gap-[30px]">
                  <p className="text-sm text-gray-500">
                    Size: <b className="text-gray-800">XL</b>
                  </p>
                  <p className="text-sm text-gray-500">
                    Color: <b className="text-gray-800">Blue</b>
                  </p>
                </div>
              </div>
              <span className="font-medium">$28.00</span>
            </div>
            <div className="flex flex-col gap-4 border-t border-gray-200 p-4 md:flex-row md:items-center">
              <div className="relative w-max rounded-md border border-gray-200 bg-white">
                <img
                  src="https://i.ibb.co.com/VJKrBt5/Rectangle-519.png"
                  alt="Nike React Pegasus Trail 4"
                  className="h-20 w-20 rounded object-cover"
                />

                <span className="absolute -top-2 -right-2 z-30 rounded-full border border-gray-200 bg-white px-1.5 text-[0.9rem] text-gray-800 shadow-sm">
                  3
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Nike Air Zoom Pegasus 39</h3>
                <div className="mt-2 flex items-center gap-[30px]">
                  <p className="text-sm text-gray-500">
                    Size: <b className="text-gray-800">XL</b>
                  </p>
                  <p className="text-sm text-gray-500">
                    Color: <b className="text-gray-800">Blue</b>
                  </p>
                </div>
              </div>
              <span className="font-medium">$28.00</span>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="mb-2 text-[1rem] font-medium text-gray-800">
              Discount Code
            </h3>
            <div className="relative flex gap-2">
              <img
                alt="discount/png"
                src="https://i.ibb.co.com/r7rF8xK/ticket-discount.png"
                className="absolute top-[50%] left-2 w-[25px] translate-y-[-50%] transform"
              />
              <input
                type="text"
                placeholder="BUYRI"
                className="w-full rounded border border-gray-200 bg-transparent py-2 pr-3 pl-10 outline-none focus:border-[#0FABCA]"
              />
              <button className="absolute top-[50%] right-5 translate-y-[-50%] transform text-[0.9rem] text-[#0FABCA]">
                Apply
              </button>
            </div>
          </div>
          <div className="mt-8 space-y-2 border-t border-gray-200 pt-6">
            <div className="flex justify-between">
              <span className="text-[1rem] text-gray-500">Subtotal</span>
              <span className="text-[1rem] font-medium text-gray-800">
                $56.00
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[1rem] text-gray-500">Shipping Cost</span>
              <span className="text-[1rem] font-medium text-gray-800">
                $8.00
              </span>
            </div>
            <div className="flex justify-between pb-3">
              <span className="text-[1rem] text-gray-500">Discount (10%)</span>
              <span className="text-[1rem] font-medium text-gray-800">
                -$13.00
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-5 font-medium">
              <span>Total</span>
              <span className="text-[1rem] font-medium text-gray-800">
                $51.00
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Checkout Form */}
      <div className="flex-1 md:px-8">
        <form className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="mb-1 text-[1rem] font-medium text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="joylawson@gmail.com"
              className="mt-0.5 w-full rounded border border-gray-200 px-3 py-2 outline-none focus:border-[#0FABCA]"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="mb-1 text-[1rem] font-medium text-gray-800"
            >
              Phone number
            </label>
            <div className="flex gap-2">
              <select className="mt-0.5 w-[100px] rounded border border-gray-200 px-3 py-2 outline-none focus:border-[#0FABCA]">
                <option value="us">🇺🇸 +1</option>
                <option value="uk">🇬🇧 +44</option>
                <option value="in">🇮🇳 +91</option>
                <option value="bd">🇧🇩 +880</option>
                <option value="au">🇦🇺 +61</option>
                <option value="ca">🇨🇦 +1</option>
                <option value="de">🇩🇪 +49</option>
                <option value="fr">🇫🇷 +33</option>
                <option value="jp">🇯🇵 +81</option>
                <option value="za">🇿🇦 +27</option>
              </select>
              <input
                type="tel"
                id="phone"
                placeholder="(201) 830-8210"
                className="mt-0.5 w-full rounded border border-gray-200 px-3 py-2 outline-none focus:border-[#0FABCA]"
              />
            </div>
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-[1rem] font-medium text-gray-800">
                Payment method
              </label>
              <button
                type="button"
                className="flex items-center gap-[5px] text-right text-[0.9rem] text-blue-600"
              >
                <AiOutlinePlus />
                Add new
              </button>
            </div>
            <div className="flex w-full flex-col gap-4 md:flex-row">
              <label className="flex flex-1 items-center justify-between gap-2 rounded-lg border border-gray-200 p-4">
                <div>
                  <div className="dark:text-[#abc2d3]">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      className="form-radio"
                      defaultChecked
                    />
                    <span> **** 8304</span>
                  </div>

                  <div className="mt-0.5 flex items-center gap-[5px] pl-5">
                    <p className="text-[0.9rem] text-gray-500">Visa •</p>
                    <p className="cursor-pointer text-[0.9rem] text-gray-500 hover:text-[#0FABCA]">
                      {" "}
                      Edit
                    </p>
                  </div>
                </div>
                <img
                  src="https://i.ibb.co.com/NFwm4jb/Visa.png"
                  alt="Visa"
                  className="w-[50px]"
                />
              </label>
              <label className="flex flex-1 items-center justify-between gap-2 rounded-lg border border-gray-200 p-4">
                <div>
                  <div className="dark:text-[#abc2d3]">
                    <input
                      type="radio"
                      name="payment"
                      value="paypal"
                      className="form-radio"
                    />
                    <span> **** 8304</span>
                  </div>

                  <div className="mt-0.5 flex items-center gap-[5px] pl-5">
                    <p className="text-[0.9rem] text-gray-500">Paypal •</p>
                    <p className="cursor-pointer text-[0.9rem] text-gray-500 hover:text-[#0FABCA]">
                      {" "}
                      Edit
                    </p>
                  </div>
                </div>
                <img
                  src="https://i.ibb.co.com/W3ykxd5/paypal.png"
                  alt="PayPal"
                  className="w-[50px]"
                />
              </label>
            </div>
          </div>
          <div>
            <label
              htmlFor="cardHolder"
              className="mb-1 text-[1rem] font-medium text-gray-800"
            >
              Card holder name
            </label>
            <input
              type="text"
              id="cardHolder"
              placeholder="Ex. Jane Cooper"
              className="mt-0.5 w-full rounded border border-gray-200 px-3 py-2 outline-none focus:border-[#0FABCA]"
            />
          </div>
          <div>
            <label
              htmlFor="billingAddress"
              className="mb-1 text-[1rem] font-medium text-gray-800"
            >
              Billing address
            </label>
            <select
              id="billingAddress"
              className="mt-0.5 w-full rounded border border-gray-200 px-3 py-2 outline-none focus:border-[#0FABCA]"
            >
              <option>United States</option>
              <option>United Kingdom</option>
              <option>India</option>
              <option>Bangladesh</option>
              <option>Australia</option>
              <option>Canada</option>
              <option>Germany</option>
              <option>France</option>
              <option>Japan</option>
              <option>South Africa</option>
            </select>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="zipCode"
                className="mb-1 text-[1rem] font-medium text-gray-800"
              >
                Zip code
              </label>
              <input
                type="text"
                id="zipCode"
                placeholder="Ex. 73923"
                className="mt-0.5 w-full rounded border border-gray-200 px-3 py-2 outline-none focus:border-[#0FABCA]"
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="mb-1 text-[1rem] font-medium text-gray-800"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                placeholder="Ex. New York"
                className="mt-0.5 w-full rounded border border-gray-200 px-3 py-2 outline-none focus:border-[#0FABCA]"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="sameAsShipping"
              className="form-checkbox"
            />
            <label htmlFor="sameAsShipping" className="text-sm text-gray-600">
              Billing address is same as shipping
            </label>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-[#0FABCA] py-3 text-white hover:bg-[#0FABCA]/90"
          >
            Pay $51.00
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
