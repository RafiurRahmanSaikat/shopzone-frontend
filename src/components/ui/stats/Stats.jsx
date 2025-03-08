import Heading from "../common/Heading";

export default function Stats() {
  return (
    <>
      {/* Features */}
      <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <Heading className="mb-4 text-white">
          <span className="animate-pulse bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text font-bold text-transparent transition-all duration-300 hover:from-indigo-600 hover:to-purple-700">
            Numbers Speaks ...
          </span>
        </Heading>

        {/* Grid */}
        <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            {/* Stats */}
            <div className="lg:pe-6 xl:pe-12">
              <p className="text-6xl leading-10 font-bold text-blue-600">
                92%
                <span className="ms-1 inline-flex items-center gap-x-1 rounded-full bg-zinc-300 px-2 py-0.5 text-xs leading-4 font-medium text-gray-600 dark:bg-zinc-900 dark:text-neutral-300">
                  <svg
                    className="size-4 shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                  </svg>
                  +7% this month
                </span>
              </p>
              <p className="mt-2 text-gray-500 sm:mt-3 dark:text-neutral-500">
                of U.S. adults have bought from businesses using Space
              </p>
            </div>
            {/* End Stats */}
          </div>
          {/* End Col */}
          <div className="relative lg:col-span-8 lg:before:absolute lg:before:-start-12 lg:before:top-0 lg:before:h-full lg:before:w-px lg:before:bg-gray-200 lg:before:dark:bg-neutral-700">
            <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 lg:grid-cols-3">
              {/* Stats */}
              <div>
                <p className="text-3xl font-semibold text-blue-600">99.95%</p>
                <p className="mt-1 text-gray-500 dark:text-neutral-500">
                  in fulfilling orders
                </p>
              </div>
              {/* End Stats */}
              {/* Stats */}
              <div>
                <p className="text-3xl font-semibold text-blue-600">2,000+</p>
                <p className="mt-1 text-gray-500 dark:text-neutral-500">
                  partner with ShopZone
                </p>
              </div>
              {/* End Stats */}
              {/* Stats */}
              <div>
                <p className="text-3xl font-semibold text-blue-600">85%</p>
                <p className="mt-1 text-gray-500 dark:text-neutral-500">
                  this year alone
                </p>
              </div>
              {/* End Stats */}
            </div>
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Features */}
    </>
  );
}
