export function NewsletterSection() {
  return (
    <section className="from-primary to-primary-foreground relative overflow-hidden bg-gradient-to-r py-20 text-white">
      {/* Background Patterns */}
      <div className="bg-secondary absolute -top-32 -left-32 h-64 w-64 rounded-full opacity-20 blur-3xl"></div>
      <div className="bg-accent absolute -right-16 -bottom-16 h-40 w-40 rounded-full opacity-20 blur-3xl"></div>

      {/* Container */}
      <div className="relative mx-auto max-w-screen-lg px-6 text-center">
        <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">Join Our Newsletter</h2>
        <p className="mb-8 text-xl text-white/90">
          Subscribe to get exclusive offers, new arrival notifications, and personalized recommendations.
        </p>

        {/* Form */}
        <form
          className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4"
          aria-label="Newsletter Subscription"
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="focus:ring-offset-primary flex-1 rounded-full border-0 px-6 py-4 text-gray-900 placeholder-gray-500 shadow-md focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="text-primary hover:bg-primary-50 rounded-full bg-white px-8 py-4 font-semibold shadow-md transition-all hover:shadow-lg"
          >
            Subscribe
          </button>
        </form>

        <p className="mt-4 text-sm text-white/60">
          By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
        </p>
      </div>
    </section>
  )
}

