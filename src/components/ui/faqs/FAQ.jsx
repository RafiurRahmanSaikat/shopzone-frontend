import React from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "Can I return or exchange an item?",
      answer:
        "Yes, we offer a hassle-free return and exchange policy within 30 days of purchase. Please visit our Returns & Exchanges page for more details.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Shipping times vary based on location and shipping method. Standard shipping usually takes 5-7 business days. Expedited options are available at checkout.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order is shipped, you'll receive a tracking link via email. You can also check your order status in your ShopZone account.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit/debit cards, PayPal, and ShopZone gift cards. Additional payment options may be available based on your region.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Absolutely! We use industry-standard encryption to protect your payment details and ensure a secure checkout experience.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach us via our Contact Us page or email support@shopzone.com. Our support team is available 24/7.",
    },
  ];

  return (
    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="max-w-xs">
            <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
              Frequently
              <br />
              asked questions
            </h2>
            <p className="mt-1 hidden text-gray-600 md:block dark:text-neutral-400">
              Find answers to common questions about ShopZone.
            </p>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="divide-y divide-gray-200 dark:divide-neutral-700">
            {faqs.map((faq, index) => (
              <details key={index} className="py-4">
                <summary className="cursor-pointer text-lg font-semibold text-gray-800 dark:text-neutral-200">
                  {faq.question}
                </summary>
                <p className="mt-2 text-gray-600 dark:text-neutral-400">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
