// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import React, { useContext, useState } from "react";
// import { toast } from "react-toastify";
// import { API_URL } from "../../constants";
// import AuthContext from "../../context/AuthContext";
// import { handlePostRequest } from "../../utils/Actions";

// const PaymentForm = ({ totalAmount, onPaymentSuccess }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [isProcessing, setIsProcessing] = useState(false);
//   const { user } = useContext(AuthContext);

//   // Preload user info; user can change these if needed.
//   const [fullName, setFullName] = useState(user?.get_full_name || "");
//   const [email, setEmail] = useState(user?.email || "");
//   const [phone, setPhone] = useState(user?.phone_number || "");
//   const [address, setAddress] = useState(user?.address || "");

//   // Track whether the card details are complete.
//   const [cardComplete, setCardComplete] = useState(false);

//   // Form is valid only if all fields and card details are complete.
//   const isFormValid =
//     fullName.trim() !== "" &&
//     email.trim() !== "" &&
//     phone.trim() !== "" &&
//     address.trim() !== "" &&
//     cardComplete;

//   // Update cardComplete state when the CardElement changes.
//   const handleCardChange = (event) => {
//     setCardComplete(event.complete);
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements || !isFormValid) return;

//     setIsProcessing(true);
//     const amountInCents = Math.round(totalAmount * 100);

//     try {
//       // Create a payment intent and send the customer details.
//       const res = await handlePostRequest(
//         `${API_URL}/orders/create_payment_intent/`,
//         {
//           amount: amountInCents,
//           fullName,
//           email,
//           phone,
//           address,
//         },
//       );

//       if (res.data && res.data.error) {
//         toast.error("Payment failed: " + res.data.error);
//         setIsProcessing(false);
//         return;
//       }

//       const clientSecret = res.data.clientSecret;

//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: { name: fullName, email, phone },
//         },
//       });

//       if (result.error) {
//         toast.error(result.error.message);
//       } else if (
//         result.paymentIntent &&
//         result.paymentIntent.status === "succeeded"
//       ) {
//         toast.success("Payment successful!");
//         onPaymentSuccess();
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Payment failed, please try again.");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handlePayment}
//       className="rounded-lg bg-white p-6 shadow-md dark:bg-zinc-900"
//     >
//       <h2 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
//         Payment Details
//       </h2>

//       <div className="mb-4">
//         <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
//           Full Name
//         </label>
//         <input
//           type="text"
//           placeholder="Full Name"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-zinc-900 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-300 dark:bg-zinc-200 dark:text-zinc-900 dark:placeholder-gray-500"
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
//           Email
//         </label>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-zinc-900 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-300 dark:bg-zinc-200 dark:text-zinc-900 dark:placeholder-gray-500"
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
//           Phone
//         </label>
//         <input
//           type="text"
//           placeholder="Phone"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-zinc-900 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-300 dark:bg-zinc-200 dark:text-zinc-900 dark:placeholder-gray-500"
//           required
//         />
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
//           Shipping Address
//         </label>
//         <textarea
//           placeholder="Shipping Address"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-zinc-900 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none dark:border-gray-300 dark:bg-zinc-200 dark:text-zinc-900 dark:placeholder-gray-500"
//           required
//         />
//       </div>

//       <div className="mb-6 rounded border border-gray-300 bg-white p-4 dark:border-gray-600 dark:bg-zinc-200">
//         <CardElement
//           options={{ hidePostalCode: true }}
//           onChange={handleCardChange}
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={!stripe || isProcessing || !isFormValid}
//         className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
//       >
//         {isProcessing ? "Processing..." : "Proceed to Checkout"}
//       </button>
//     </form>
//   );
// };

// export default PaymentForm;
import { Button, Card, Heading, Input, Text } from "@components";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { ArrowLeft, CreditCard, Lock, Shield } from "lucide-react";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";
import orderService from "../../services/orderService";

const PaymentForm = ({ totalAmount, onPaymentSuccess, onCancel }) => {
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
      const paymentData = {
        amount: amountInCents,
        fullName,
        email,
        phone,
        address,
      };

      const res = await orderService.processPayment(paymentData);

      if (res?.data?.error) {
        toast.error("Payment failed: " + res.data.error);
        setIsProcessing(false);
        return;
      }

      const clientSecret = res?.data?.clientSecret;
      if (!clientSecret) {
        toast.error("Payment failed: No client secret received");
        setIsProcessing(false);
        return;
      }

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
        onPaymentSuccess?.();
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment failed, please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <Heading as="h2" size="lg">
          Payment Details
        </Heading>
        <Button
          variant="link"
          leftIcon={<ArrowLeft className="h-4 w-4" />}
          onClick={onCancel}
        >
          Back to Cart
        </Button>
      </div>

      <form onSubmit={handlePayment} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <Input
            label="Email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Phone"
            type="tel"
            placeholder="(123) 456-7890"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <div className="md:col-span-2">
            <Input
              label="Shipping Address"
              as="textarea"
              placeholder="123 Main St, City, State, ZIP"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              required
            />
          </div>
        </div>

        <div>
          <div className="mb-1 flex items-center">
            <CreditCard className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
            <Text as="label" weight="medium" size="sm">
              Card Information
            </Text>
          </div>
          <div className="rounded-lg border border-zinc-300 bg-white p-4 transition-colors focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 dark:border-zinc-600 dark:bg-zinc-700 dark:focus-within:ring-blue-800">
            <CardElement
              options={{ hidePostalCode: true }}
              onChange={handleCardChange}
            />
          </div>
          <Text size="xs" muted className="mt-2 flex items-center">
            <Lock className="mr-1 h-3 w-3" />
            Your payment information is encrypted
          </Text>
        </div>

        <Card className="bg-blue-50 p-4 dark:bg-blue-900/20">
          <div className="flex items-center">
            <Shield className="mr-2 h-5 w-5 text-blue-600 dark:text-blue-400" />
            <Heading
              as="h3"
              size="sm"
              className="text-blue-800 dark:text-blue-300"
            >
              Secure Checkout
            </Heading>
          </div>
          <Text size="sm" className="mt-2 text-blue-700 dark:text-blue-300">
            Your payment information is processed securely. We do not store
            credit card details.
          </Text>
        </Card>

        <div className="flex flex-col space-y-4">
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={!stripe || isProcessing || !isFormValid}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center">
                <svg
                  className="mr-2 h-4 w-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              `Pay ${totalAmount.toFixed(2)}`
            )}
          </Button>

          <div className="flex justify-center space-x-4">
            <img src="/visa-card.png" alt="Visa" className="h-8" />
          </div>
        </div>
      </form>
    </Card>
  );
};

export default PaymentForm;
