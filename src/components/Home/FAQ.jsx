import React from "react";
import { FAQ_QUES } from "../../constants";

const FAQ = () => {
  return (
    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="max-w-xs">
            <h2 className="text-2xl font-bold md:text-4xl md:leading-tight dark:text-zinc-100">
              Frequently
              <br />
              asked questions
            </h2>
            <p className="mt-1 hidden text-gray-600 md:block dark:text-zinc-400">
              Find answers to common questions about ShopZone.
            </p>
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="divide-y divide-gray-200 dark:divide-zinc-700">
            {FAQ_QUES.map((faq, index) => (
              <details key={index} className="py-4">
                <summary className="cursor-pointer text-lg font-semibold text-gray-600 dark:text-zinc-200">
                  {faq.question}
                </summary>
                <p className="mt-2 text-gray-600 dark:text-zinc-400">
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
