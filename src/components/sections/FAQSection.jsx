"use client"

import { useState } from "react"
import Section from "../common/Section"
import Container from "../common/Container"
import Heading from "../common/Heading"
import Text from "../common/Text"
import Grid from "../common/Grid"
import { ChevronDown, ChevronUp } from "lucide-react"

// Default FAQs
const defaultFaqs = [
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
      "Once your order is shipped, you'll receive a tracking link via email. You can also check your order status in your account.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit/debit cards, PayPal, and gift cards. Additional payment options may be available based on your region.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "We use industry-standard encryption to protect your payment details and ensure a secure checkout experience.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach us via our Contact Us page or email support@example.com. Our support team is available 24/7.",
  },
]

const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 py-4 dark:border-gray-700">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <Text size="lg" weight="semibold" className="text-gray-800 dark:text-gray-200">
          {faq.question}
        </Text>
        <span className="ml-2 flex-shrink-0 text-gray-500 dark:text-gray-400">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      <div
        id={`faq-answer-${index}`}
        className={`mt-2 transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}
      >
        <Text muted>{faq.answer}</Text>
      </div>
    </div>
  )
}

const FAQSection = ({
  faqs = defaultFaqs,
  title = "Frequently asked questions",
  subtitle = "Find answers to common questions about our products and services.",
  className = "",
  ...props
}) => {
  return (
    <Section background="white" className={className} {...props}>
      <Container>
        <Grid cols={5} gap={10} className="items-start">
          <div className="md:col-span-2">
            <div className="max-w-xs">
              <Heading>{title}</Heading>
              <Text muted className="mt-4 hidden md:block">
                {subtitle}
              </Text>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {faqs.map((faq, index) => (
                <FAQItem key={index} faq={faq} index={index} />
              ))}
            </div>
          </div>
        </Grid>
      </Container>
    </Section>
  )
}

export default FAQSection

