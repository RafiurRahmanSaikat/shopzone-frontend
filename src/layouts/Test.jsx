export default function Test() {
  return (
    <div>
      <>
        {/* Table Section */}
        <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          {/* Card */}
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="inline-block min-w-full p-1.5 align-middle">
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
                  {/* Header */}
                  <div className="grid gap-3 border-b border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between dark:border-neutral-700">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
                        Users
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-neutral-400">
                        Add users, edit and more.
                      </p>
                    </div>
                    <div>
                      <div className="inline-flex gap-x-2">
                        <a
                          className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                          href="#"
                        >
                          View all
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
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                          </svg>
                          Add user
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* End Header */}
                  {/* Table */}
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                    <thead className="bg-gray-50 dark:bg-neutral-800">
                      <tr>
                        <th scope="col" className="py-3 ps-6 text-start">
                          <label
                            htmlFor="hs-at-with-checkboxes-main"
                            className="flex"
                          >
                            <input
                              type="checkbox"
                              className="shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
                              id="hs-at-with-checkboxes-main"
                            />
                            <span className="sr-only">Checkbox</span>
                          </label>
                        </th>
                        <th
                          scope="col"
                          className="py-3 ps-6 pe-6 text-start lg:ps-3 xl:ps-0"
                        >
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold tracking-wide text-gray-800 uppercase dark:text-neutral-200">
                              Name
                            </span>
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start">
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold tracking-wide text-gray-800 uppercase dark:text-neutral-200">
                              Position
                            </span>
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start">
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold tracking-wide text-gray-800 uppercase dark:text-neutral-200">
                              Status
                            </span>
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start">
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold tracking-wide text-gray-800 uppercase dark:text-neutral-200">
                              Portfolio
                            </span>
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-start">
                          <div className="flex items-center gap-x-2">
                            <span className="text-xs font-semibold tracking-wide text-gray-800 uppercase dark:text-neutral-200">
                              Created
                            </span>
                          </div>
                        </th>
                        <th scope="col" className="px-6 py-3 text-end" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                      <tr>
                        <td className="size-px whitespace-nowrap">
                          <div className="py-3 ps-6">
                            <label
                              htmlFor="hs-at-with-checkboxes-12"
                              className="flex"
                            >
                              <input
                                type="checkbox"
                                className="shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-600 dark:bg-neutral-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
                                id="hs-at-with-checkboxes-12"
                              />
                              <span className="sr-only">Checkbox</span>
                            </label>
                          </div>
                        </td>
                        <td className="size-px whitespace-nowrap">
                          <div className="py-3 ps-6 pe-6 lg:ps-3 xl:ps-0">
                            <div className="flex items-center gap-x-3">
                              <img
                                className="inline-block size-[38px] rounded-full"
                                src="https://images.unsplash.com/photo-1670272505340-d906d8d77d03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                                alt="Avatar"
                              />
                              <div className="grow">
                                <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                                  Jessica Williams
                                </span>
                                <span className="block text-sm text-gray-500 dark:text-neutral-500">
                                  myhairisred@site.com
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="h-px w-72 whitespace-nowrap">
                          <div className="px-6 py-3">
                            <span className="block text-sm font-semibold text-gray-800 dark:text-neutral-200">
                              Executive director
                            </span>
                            <span className="block text-sm text-gray-500 dark:text-neutral-500">
                              Marketing
                            </span>
                          </div>
                        </td>
                        <td className="size-px whitespace-nowrap">
                          <div className="px-6 py-3">
                            <span className="inline-flex items-center gap-x-1 rounded-full bg-teal-100 px-1.5 py-1 text-xs font-medium text-teal-800 dark:bg-teal-500/10 dark:text-teal-500">
                              <svg
                                className="size-2.5"
                                xmlns="http://www.w3.org/2000/svg"
                                width={16}
                                height={16}
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                              </svg>
                              Active
                            </span>
                          </div>
                        </td>
                        <td className="size-px whitespace-nowrap">
                          <div className="px-6 py-3">
                            <div className="flex items-center gap-x-3">
                              <span className="text-xs text-gray-500 dark:text-neutral-500">
                                0/5
                              </span>
                              <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-neutral-700">
                                <div
                                  className="flex flex-col justify-center overflow-hidden bg-gray-800 dark:bg-neutral-200"
                                  role="progressbar"
                                  style={{ width: "1%" }}
                                  aria-valuenow={1}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="size-px whitespace-nowrap">
                          <div className="px-6 py-3">
                            <span className="text-sm text-gray-500 dark:text-neutral-500">
                              18 Dec, 15:20
                            </span>
                          </div>
                        </td>
                        <td className="size-px whitespace-nowrap">
                          <div className="px-6 py-1.5">
                            <a
                              className="inline-flex items-center gap-x-1 text-sm font-medium text-blue-600 decoration-2 hover:underline focus:underline focus:outline-none dark:text-blue-500"
                              href="#"
                            >
                              Edit
                            </a>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {/* End Table */}
                  {/* Footer */}
                  <div className="grid gap-3 border-t border-gray-200 px-6 py-4 md:flex md:items-center md:justify-between dark:border-neutral-700">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-neutral-400">
                        <span className="font-semibold text-gray-800 dark:text-neutral-200">
                          12
                        </span>{" "}
                        results
                      </p>
                    </div>
                    <div>
                      <div className="inline-flex gap-x-2">
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
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
                            <path d="m15 18-6-6 6-6" />
                          </svg>
                          Prev
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-transparent dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                        >
                          Next
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
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* End Footer */}
                </div>
              </div>
            </div>
          </div>
          {/* End Card */}
        </div>
        {/* End Table Section */}
      </>
    </div>
  );
}
