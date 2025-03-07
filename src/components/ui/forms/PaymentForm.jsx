import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL_BACKEND } from "../../../constants";
import AuthContext from "../../../context/AuthContext";
import { handlePostRequest } from "../../../utils/Actions";

const PaymentForm = ({ totalAmount, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useContext(AuthContext);

  // Preload user info; user can change these if needed.
  const [fullName, setFullName] = useState(user?.get_full_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone_number || "");
  const [address, setAddress] = useState(user?.address || "");

  // Track whether the card details are complete.
  const [cardComplete, setCardComplete] = useState(false);

  // Form is valid only if all fields and card details are complete.
  const isFormValid =
    fullName.trim() !== "" &&
    email.trim() !== "" &&
    phone.trim() !== "" &&
    address.trim() !== "" &&
    cardComplete;

  // Update cardComplete state when the CardElement changes.
  const handleCardChange = (event) => {
    setCardComplete(event.complete);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !isFormValid) return;

    setIsProcessing(true);
    const amountInCents = Math.round(totalAmount * 100);

    try {
      // Create a payment intent and send the customer details.
      const res = await handlePostRequest(
        `${BASE_URL_BACKEND}/orders/create_payment_intent/`,
        {
          amount: amountInCents,
          fullName,
          email,
          phone,
          address,
        },
      );

      if (res.data && res.data.error) {
        toast.error("Payment failed: " + res.data.error);
        setIsProcessing(false);
        return;
      }

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: fullName, email, phone },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else if (
        result.paymentIntent &&
        result.paymentIntent.status === "succeeded"
      ) {
        toast.success("Payment successful!");
        onPaymentSuccess();
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment failed, please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handlePayment}
      className="rounded-lg bg-white p-6 shadow-md dark:bg-zinc-900"
    >
      <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Payment Details
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
          Full Name
        </label>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-zinc-900 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-300 dark:bg-zinc-200 dark:text-zinc-900 dark:placeholder-gray-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-zinc-900 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-300 dark:bg-zinc-200 dark:text-zinc-900 dark:placeholder-gray-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
          Phone
        </label>
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-zinc-900 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-300 dark:bg-zinc-200 dark:text-zinc-900 dark:placeholder-gray-500"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
          Shipping Address
        </label>
        <textarea
          placeholder="Shipping Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-zinc-900 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-300 dark:bg-zinc-200 dark:text-zinc-900 dark:placeholder-gray-500"
          required
        />
      </div>

      <div className="mb-6 rounded border border-gray-300 bg-white p-4 dark:border-gray-600 dark:bg-zinc-200">
        <CardElement
          options={{ hidePostalCode: true }}
          onChange={handleCardChange}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing || !isFormValid}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isProcessing ? "Processing..." : "Proceed to Checkout"}
      </button>
    </form>
  );
};

export default PaymentForm;
