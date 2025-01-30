export default function AnimatedCard() {
  return (
    <section className="overflow-hidden">
      {/* <h1 className="h-40 w-1/2 rounded-3xl bg-red-50 p-4">
        This card is desigbed by TailwindCss
      </h1> */}
      <div className="2xl:max-w-screen-3xl mx-auto flex h-svh max-w-screen-xl flex-col justify-center space-y-24 px-8 py-12 md:px-12 lg:py-24">
        <div className="mx-auto flex flex-col sm:flex-row">
          {/*- Starts component */}
          <a href="#_">
            <img
              src="https://images.unsplash.com/photo-1530035415911-95194de4ebcc?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="h-full w-full origin-bottom rotate-6 transform rounded-xl object-cover duration-500 hover:-translate-y-12 hover:rotate-0 hover:scale-150"
              alt="#_"
            />
          </a>
          <a href="#_">
            <img
              src="https://images.unsplash.com/photo-1487180144351-b8472da7d491?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "
              className="h-full w-full origin-bottom -rotate-12 transform rounded-xl object-cover duration-500 hover:-translate-y-12 hover:rotate-0 hover:scale-150"
              alt="#_"
            />
          </a>
          <a href="#_">
            <img
              src="https://images.unsplash.com/photo-1586996292898-71f4036c4e07?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="h-full w-full origin-bottom rotate-6 transform rounded-xl object-cover duration-500 hover:-translate-y-12 hover:rotate-0 hover:scale-150"
              alt="#_"
            />
          </a>
          <a href="#_">
            <img
              src="https://images.unsplash.com/photo-1522775417749-29284fb89f43?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="h-full w-full origin-bottom -rotate-12 transform rounded-xl object-cover duration-500 hover:-translate-y-12 hover:rotate-0 hover:scale-150"
              alt="#_"
            />
          </a>
          {/*- Ends component */}
        </div>
      </div>
    </section>
  );
}
