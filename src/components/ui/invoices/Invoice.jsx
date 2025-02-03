export default function Invoice() {
  return (
    <>
      {/* Invoice */}
      <div className="mx-auto my-4 max-w-[85rem] px-4 sm:my-10 sm:px-6 lg:px-8">
        {/* Grid */}
        <div className="mb-5 flex items-center justify-between border-b border-gray-200 pb-5 dark:border-neutral-700">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-neutral-200">
              Invoice
            </h2>
          </div>
          {/* Col */}
          <div className="inline-flex gap-x-2">
            <a
              className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              href="#"
            >
              <svg
                className="size-4 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1={12} x2={12} y1={15} y2={3} />
              </svg>
              Invoice PDF
            </a>
            <a
              className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
              href="#"
            >
              <svg
                className="size-4 shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect width={12} height={8} x={6} y={14} />
              </svg>
              Print
            </a>
          </div>
          {/* Col */}
        </div>
        {/* End Grid */}
        {/* Grid */}
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <div className="grid space-y-3">
              <dl className="flex flex-col gap-x-3 text-sm sm:flex-row">
                <dt className="max-w-[200px] min-w-36 text-gray-500 dark:text-neutral-500">
                  Billed to:
                </dt>
                <dd className="text-gray-800 dark:text-neutral-200">
                  <a
                    className="inline-flex items-center gap-x-1.5 font-medium text-blue-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-blue-500"
                    href="#"
                  >
                    sara@site.com
                  </a>
                </dd>
              </dl>
              <dl className="flex flex-col gap-x-3 text-sm sm:flex-row">
                <dt className="max-w-[200px] min-w-36 text-gray-500 dark:text-neutral-500">
                  Billing details:
                </dt>
                <dd className="font-medium text-gray-800 dark:text-neutral-200">
                  <span className="block font-semibold">Sara Williams</span>
                  <address className="font-normal not-italic">
                    280 Suzanne Throughway,
                    <br />
                    Breannabury, OR 45801,
                    <br />
                    United States
                    <br />
                  </address>
                </dd>
              </dl>
              <dl className="flex flex-col gap-x-3 text-sm sm:flex-row">
                <dt className="max-w-[200px] min-w-36 text-gray-500 dark:text-neutral-500">
                  Shipping details:
                </dt>
                <dd className="font-medium text-gray-800 dark:text-neutral-200">
                  <span className="block font-semibold">Sara Williams</span>
                  <address className="font-normal not-italic">
                    280 Suzanne Throughway,
                    <br />
                    Breannabury, OR 45801,
                    <br />
                    United States
                    <br />
                  </address>
                </dd>
              </dl>
            </div>
          </div>
          {/* Col */}
          <div>
            <div className="grid space-y-3">
              <dl className="flex flex-col gap-x-3 text-sm sm:flex-row">
                <dt className="max-w-[200px] min-w-36 text-gray-500 dark:text-neutral-500">
                  Invoice number:
                </dt>
                <dd className="font-medium text-gray-800 dark:text-neutral-200">
                  ADUQ2189H1-0038
                </dd>
              </dl>
              <dl className="flex flex-col gap-x-3 text-sm sm:flex-row">
                <dt className="max-w-[200px] min-w-36 text-gray-500 dark:text-neutral-500">
                  Currency:
                </dt>
                <dd className="font-medium text-gray-800 dark:text-neutral-200">
                  USD - US Dollar
                </dd>
              </dl>
              <dl className="flex flex-col gap-x-3 text-sm sm:flex-row">
                <dt className="max-w-[200px] min-w-36 text-gray-500 dark:text-neutral-500">
                  Due date:
                </dt>
                <dd className="font-medium text-gray-800 dark:text-neutral-200">
                  10 Jan 2023
                </dd>
              </dl>
              <dl className="flex flex-col gap-x-3 text-sm sm:flex-row">
                <dt className="max-w-[200px] min-w-36 text-gray-500 dark:text-neutral-500">
                  Billing method:
                </dt>
                <dd className="font-medium text-gray-800 dark:text-neutral-200">
                  Send invoice
                </dd>
              </dl>
            </div>
          </div>
          {/* Col */}
        </div>
        {/* End Grid */}
        {/* Table */}
        <div className="mt-6 space-y-4 rounded-lg border border-gray-200 p-4 dark:border-neutral-700">
          <div className="hidden sm:grid sm:grid-cols-5">
            <div className="text-xs font-medium text-gray-500 uppercase sm:col-span-2 dark:text-neutral-500">
              Item
            </div>
            <div className="text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Qty
            </div>
            <div className="text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Rate
            </div>
            <div className="text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
              Amount
            </div>
          </div>
          <div className="hidden border-b border-gray-200 sm:block dark:border-neutral-700" />
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            <div className="col-span-full sm:col-span-2">
              <h5 className="text-xs font-medium text-gray-500 uppercase sm:hidden dark:text-neutral-500">
                Item
              </h5>
              <p className="font-medium text-gray-800 dark:text-neutral-200">
                Design UX and UI
              </p>
            </div>
            <div>
              <h5 className="text-xs font-medium text-gray-500 uppercase sm:hidden dark:text-neutral-500">
                Qty
              </h5>
              <p className="text-gray-800 dark:text-neutral-200">1</p>
            </div>
            <div>
              <h5 className="text-xs font-medium text-gray-500 uppercase sm:hidden dark:text-neutral-500">
                Rate
              </h5>
              <p className="text-gray-800 dark:text-neutral-200">5</p>
            </div>
            <div>
              <h5 className="text-xs font-medium text-gray-500 uppercase sm:hidden dark:text-neutral-500">
                Amount
              </h5>
              <p className="text-gray-800 sm:text-end dark:text-neutral-200">
                $500
              </p>
            </div>
          </div>
          <div className="border-b border-gray-200 sm:hidden dark:border-neutral-700" />
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            <div className="col-span-full sm:col-span-2">
              <h5 className="text-xs font-medium text-gray-500 uppercase sm:hidden dark:text-neutral-500">
                Item
              </h5>
              <p className="font-medium text-gray-800 dark:text-neutral-200">
                Web project
              </p>
            </div>
            <div>
              <h5 className="text-xs font-medium text-gray-500 uppercase sm:hidden dark:text-neutral-500">
                Qty
              </h5>
              <p className="text-gray-800 dark:text-neutral-200">1</p>
            </div>
            <div>
              <h5 className="text-xs font-medium text-gray-500 uppercase sm:hidden dark:text-neutral-500">
                Rate
              </h5>
              <p className="text-gray-800 dark:text-neutral-200">24</p>
            </div>
            <div>
              <h5 className="text-xs font-medium text-gray-500 uppercase sm:hidden dark:text-neutral-500">
                Amount
              </h5>
              <p className="text-gray-800 sm:text-end dark:text-neutral-200">
                $1250
              </p>
            </div>
          </div>
          <div className="border-b border-gray-200 sm:hidden dark:border-neutral-700" />
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            <div className="col-span-full sm:col-span-2">
              <h5 className="text-xs font-medium text-gray-500 uppercase sm:hidden dark:text-neutral-500">
                Item
              </h5>
              <p className="font-medium text-gray-800 dark:text-neutral-200">
                SEO
              </p>
            </div>
            <div>
              <h5 className="text-xs font-medium text-gray-500 uppercase sm:hidden dark:text-neutral-500">
                Qty
              </h5>
              <p className="text-gray-800 dark:text-neutral-200">1</p>
            </div>
            <div>
              <h5 className="text-xs font-medium text-gray-500 uppercase sm:hidden dark:text-neutral-500">
                Rate
              </h5>
              <p className="text-gray-800 dark:text-neutral-200">6</p>
            </div>
            <div>
              <h5 className="text-xs font-medium text-gray-500 uppercase sm:hidden dark:text-neutral-500">
                Amount
              </h5>
              <p className="text-gray-800 sm:text-end dark:text-neutral-200">
                $2000
              </p>
            </div>
          </div>
        </div>
        {/* End Table */}
        {/* Flex */}
        <div className="mt-8 flex sm:justify-end">
          <div className="w-full max-w-2xl space-y-2 sm:text-end">
            {/* Grid */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-1 sm:gap-2">
              <dl className="grid gap-x-3 text-sm sm:grid-cols-5">
                <dt className="col-span-3 text-gray-500 dark:text-neutral-500">
                  Subotal:
                </dt>
                <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                  $2750.00
                </dd>
              </dl>
              <dl className="grid gap-x-3 text-sm sm:grid-cols-5">
                <dt className="col-span-3 text-gray-500 dark:text-neutral-500">
                  Total:
                </dt>
                <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                  $2750.00
                </dd>
              </dl>
              <dl className="grid gap-x-3 text-sm sm:grid-cols-5">
                <dt className="col-span-3 text-gray-500 dark:text-neutral-500">
                  Tax:
                </dt>
                <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                  $39.00
                </dd>
              </dl>
              <dl className="grid gap-x-3 text-sm sm:grid-cols-5">
                <dt className="col-span-3 text-gray-500 dark:text-neutral-500">
                  Amount paid:
                </dt>
                <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                  $2789.00
                </dd>
              </dl>
              <dl className="grid gap-x-3 text-sm sm:grid-cols-5">
                <dt className="col-span-3 text-gray-500 dark:text-neutral-500">
                  Due balance:
                </dt>
                <dd className="col-span-2 font-medium text-gray-800 dark:text-neutral-200">
                  $0.00
                </dd>
              </dl>
            </div>
            {/* End Grid */}
          </div>
        </div>
        {/* End Flex */}
      </div>
      {/* End Invoice */}
    </>
  );
}
