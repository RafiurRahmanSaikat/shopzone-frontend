// src/components/checkout/CheckoutFormNew.jsx
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai"; // You may replace this with a Lucide icon if preferred
import PaymentForm from "../forms/PaymentForm"; // Ensure the path is correct

const CheckoutFormNew = ({ total, onPaymentSuccess, isProcessing }) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    cardHolder: "",
    billingAddress: "United States",
    zipCode: "",
    city: "",
    discountCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // For simplicity, the non-payment fields are collected but not submitted separately.
  // The PaymentForm handles Stripe payment, and on success, onPaymentSuccess is triggered.
  return (
    <form className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-[1rem] font-medium text-gray-800"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="joylawson@gmail.com"
          value={formData.email}
          onChange={handleChange}
          className="mt-0.5 w-full rounded border border-gray-200 px-3 py-2 outline-none focus:border-[#0FABCA]"
        />
      </div>
      <div>
        <label
          htmlFor="phone"
          className="mb-1 block text-[1rem] font-medium text-gray-800"
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
            value={formData.phone}
            onChange={handleChange}
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
            className="flex items-center gap-1 text-[0.9rem] text-blue-600"
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
              <div className="mt-0.5 flex items-center gap-1 pl-5">
                <p className="text-[0.9rem] text-gray-500">Visa •</p>
                <p className="cursor-pointer text-[0.9rem] text-gray-500 hover:text-[#0FABCA]">
                  Edit
                </p>
              </div>
            </div>
            <img
              src="https://i.ibb.co/NFwm4jb/Visa.png"
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
              <div className="mt-0.5 flex items-center gap-1 pl-5">
                <p className="text-[0.9rem] text-gray-500">Paypal •</p>
                <p className="cursor-pointer text-[0.9rem] text-gray-500 hover:text-[#0FABCA]">
                  Edit
                </p>
              </div>
            </div>
            <img
              src="https://i.ibb.co/W3ykxd5/paypal.png"
              alt="PayPal"
              className="w-[50px]"
            />
          </label>
        </div>
      </div>
      <div>
        <label
          htmlFor="cardHolder"
          className="mb-1 block text-[1rem] font-medium text-gray-800"
        >
          Card holder name
        </label>
        <input
          type="text"
          id="cardHolder"
          placeholder="Ex. Jane Cooper"
          value={formData.cardHolder}
          onChange={handleChange}
          className="mt-0.5 w-full rounded border border-gray-200 px-3 py-2 outline-none focus:border-[#0FABCA]"
        />
      </div>
      <div>
        <label
          htmlFor="billingAddress"
          className="mb-1 block text-[1rem] font-medium text-gray-800"
        >
          Billing address
        </label>
        <select
          id="billingAddress"
          value={formData.billingAddress}
          onChange={handleChange}
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
            className="mb-1 block text-[1rem] font-medium text-gray-800"
          >
            Zip code
          </label>
          <input
            type="text"
            id="zipCode"
            placeholder="Ex. 73923"
            value={formData.zipCode}
            onChange={handleChange}
            className="mt-0.5 w-full rounded border border-gray-200 px-3 py-2 outline-none focus:border-[#0FABCA]"
          />
        </div>
        <div>
          <label
            htmlFor="city"
            className="mb-1 block text-[1rem] font-medium text-gray-800"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            placeholder="Ex. New York"
            value={formData.city}
            onChange={handleChange}
            className="mt-0.5 w-full rounded border border-gray-200 px-3 py-2 outline-none focus:border-[#0FABCA]"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="sameAsShipping" className="form-checkbox" />
        <label htmlFor="sameAsShipping" className="text-sm text-gray-600">
          Billing address is same as shipping
        </label>
      </div>
      {/* PaymentForm Component */}
      <div className="mt-6">
        <PaymentForm
          totalAmount={total}
          onPaymentSuccess={onPaymentSuccess}
          onCancel={() => {}}
        />
      </div>
    </form>
  );
};

export default CheckoutFormNew;
