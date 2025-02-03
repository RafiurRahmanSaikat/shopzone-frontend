import Test from "./Test";

export default function TestDash() {
  return (
    <>
      {/* ========== HEADER ========== */}
      <header className="sticky inset-x-0 top-0 z-[48] flex w-full flex-wrap border-b bg-white py-2.5 text-sm md:flex-nowrap md:justify-start lg:ps-[260px] dark:border-neutral-700 dark:bg-neutral-800">
        <nav className="mx-auto flex w-full basis-full items-center px-4 sm:px-6">
          <div className="me-5 lg:me-0 lg:hidden">
            {/* Logo */}

            {/* End Logo */}
            <div className="ms-1 lg:hidden"></div>
          </div>
          <div className="ms-auto flex w-full items-center justify-end gap-x-1 md:justify-between md:gap-x-3">
            <div className="hidden md:block">
              {/* Search Input */}
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 start-0 z-20 flex items-center ps-3.5">
                  <svg
                    className="size-4 shrink-0 text-gray-400 dark:text-white/60"
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
                    <circle cx={11} cy={11} r={8} />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full rounded-lg border-gray-200 bg-white py-2 ps-10 pe-16 text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:ring-neutral-600"
                  placeholder="Search"
                />
                <div className="pointer-events-none absolute inset-y-0 end-0 z-20 flex hidden items-center pe-1">
                  <button
                    type="button"
                    className="inline-flex size-6 shrink-0 items-center justify-center rounded-full text-gray-500 hover:text-blue-600 focus:text-blue-600 focus:outline-none dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                    aria-label="Close"
                  >
                    <span className="sr-only">Close</span>
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
                      <circle cx={12} cy={12} r={10} />
                      <path d="m15 9-6 6" />
                      <path d="m9 9 6 6" />
                    </svg>
                  </button>
                </div>
                <div className="pointer-events-none absolute inset-y-0 end-0 z-20 flex items-center pe-3 text-gray-400">
                  <svg
                    className="size-3 shrink-0 text-gray-400 dark:text-white/60"
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
                    <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                  </svg>
                  <span className="mx-1">
                    <svg
                      className="size-3 shrink-0 text-gray-400 dark:text-white/60"
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
                  </span>
                  <span className="text-xs">/</span>
                </div>
              </div>
              {/* End Search Input */}
            </div>
            <div className="flex flex-row items-center justify-end gap-1">
              <button
                type="button"
                className="relative inline-flex size-[38px] items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 md:hidden dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
                  <circle cx={11} cy={11} r={8} />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <span className="sr-only">Search</span>
              </button>
              <button
                type="button"
                className="relative inline-flex size-[38px] items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
                <span className="sr-only">Notifications</span>
              </button>
              <button
                type="button"
                className="relative inline-flex size-[38px] items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
                <span className="sr-only">Activity</span>
              </button>
              {/* Dropdown */}
              <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                <button
                  id="hs-dropdown-account"
                  type="button"
                  className="inline-flex size-[38px] items-center justify-center gap-x-2 rounded-full border border-transparent text-sm font-semibold text-gray-800 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:text-white"
                  aria-haspopup="menu"
                  aria-expanded="false"
                  aria-label="Dropdown"
                >
                  <img
                    className="size-[38px] shrink-0 rounded-full"
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                    alt="Avatar"
                  />
                </button>
                <div
                  className="hs-dropdown-menu duration hs-dropdown-open:opacity-100 mt-2 hidden min-w-60 rounded-lg bg-white opacity-0 shadow-md transition-[opacity,margin] before:absolute before:start-0 before:-top-4 before:h-4 before:w-full after:absolute after:start-0 after:-bottom-4 after:h-4 after:w-full dark:divide-neutral-700 dark:border dark:border-neutral-700 dark:bg-neutral-800"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="hs-dropdown-account"
                >
                  <div className="rounded-t-lg bg-gray-100 px-5 py-3 dark:bg-neutral-700">
                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                      Signed in as
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                      james@site.com
                    </p>
                  </div>
                  <div className="space-y-0.5 p-1.5">
                    <a
                      className="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
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
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                      </svg>
                      Newsletter
                    </a>
                    <a
                      className="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
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
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                        <path d="M3 6h18" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                      Purchases
                    </a>
                    <a
                      className="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
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
                        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                        <path d="M12 12v9" />
                        <path d="m8 17 4 4 4-4" />
                      </svg>
                      Downloads
                    </a>
                    <a
                      className="flex items-center gap-x-3.5 rounded-lg px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300"
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
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx={9} cy={7} r={4} />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      Team Account
                    </a>
                  </div>
                </div>
              </div>
              {/* End Dropdown */}
            </div>
          </div>
        </nav>
      </header>
      {/* ========== END HEADER ========== */}
      {/* ========== MAIN CONTENT ========== */}
      <div className="-mt-px">
        {/* Breadcrumb */}
        <div className="sticky inset-x-0 top-0 z-20 border-y bg-white px-4 sm:px-6 lg:hidden lg:px-8 dark:border-neutral-700 dark:bg-neutral-800">
          <div className="flex items-center py-2">
            {/* Navigation Toggle */}
            <button
              type="button"
              className="flex size-8 items-center justify-center gap-x-2 rounded-lg border border-gray-200 text-gray-800 hover:text-gray-500 focus:text-gray-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="hs-application-sidebar"
              aria-label="Toggle navigation"
              data-hs-overlay="#hs-application-sidebar"
            >
              <span className="sr-only">Toggle Navigation</span>
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
                <rect width={18} height={18} x={3} y={3} rx={2} />
                <path d="M15 3v18" />
                <path d="m8 9 3 3-3 3" />
              </svg>
            </button>
            {/* End Navigation Toggle */}
            {/* Breadcrumb */}
            <ol className="ms-3 flex items-center whitespace-nowrap">
              <li className="flex items-center text-sm text-gray-800 dark:text-neutral-400">
                Application Layout
                <svg
                  className="mx-3 size-2.5 shrink-0 overflow-visible text-gray-400 dark:text-neutral-500"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                  />
                </svg>
              </li>
              <li
                className="truncate text-sm font-semibold text-gray-800 dark:text-neutral-400"
                aria-current="page"
              >
                Dashboard
              </li>
            </ol>
            {/* End Breadcrumb */}
          </div>
        </div>
        {/* End Breadcrumb */}
      </div>
      {/* Sidebar */}
      <div
        id="hs-application-sidebar"
        className="hs-overlay hs-overlay-open:translate-x-0 fixed inset-y-0 start-0 z-[60] hidden h-full w-[260px] -translate-x-full transform border-e border-gray-200 bg-white transition-all duration-300 [--auto-close:lg] lg:end-auto lg:bottom-0 lg:block lg:translate-x-0 dark:border-neutral-700 dark:bg-neutral-800"
        role="dialog"
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="relative flex h-full max-h-full flex-col">
          <div className="flex items-center px-6 pt-4">
            {/* Logo */}

            {/* End Logo */}
            <div className="ms-2 hidden lg:block"></div>
          </div>
          {/* Content */}
          <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700">
            <nav
              className="hs-accordion-group flex w-full flex-col flex-wrap p-3"
              data-hs-accordion-always-open=""
            >
              <ul className="flex flex-col space-y-1">
                <li>
                  <a
                    className="flex items-center gap-x-3.5 rounded-lg bg-gray-100 px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-700 dark:text-white"
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
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                    Dashboard
                  </a>
                </li>
                <li className="hs-accordion" id="users-accordion">
                  <button
                    type="button"
                    className="hs-accordion-toggle flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
                    aria-expanded="true"
                    aria-controls="users-accordion-child"
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
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx={9} cy={7} r={4} />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    Users
                    <svg
                      className="hs-accordion-active:block ms-auto hidden size-4"
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
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                    <svg
                      className="hs-accordion-active:hidden ms-auto block size-4"
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
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  <div
                    id="users-accordion-child"
                    className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                    role="region"
                    aria-labelledby="users-accordion"
                  >
                    <ul
                      className="hs-accordion-group space-y-1 ps-8 pt-1"
                      data-hs-accordion-always-open=""
                    >
                      <li className="hs-accordion" id="users-accordion-sub-1">
                        <button
                          type="button"
                          className="hs-accordion-toggle flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
                          aria-expanded="true"
                          aria-controls="users-accordion-sub-1-child"
                        >
                          Sub Menu 1
                          <svg
                            className="hs-accordion-active:block ms-auto hidden size-4"
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
                            <path d="m18 15-6-6-6 6" />
                          </svg>
                          <svg
                            className="hs-accordion-active:hidden ms-auto block size-4"
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
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                        <div
                          id="users-accordion-sub-1-child"
                          className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                          role="region"
                          aria-labelledby="users-accordion-sub-1"
                        >
                          <ul className="space-y-1 pt-1">
                            <li>
                              <a
                                className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-200"
                                href="#"
                              >
                                Link 1
                              </a>
                            </li>
                            <li>
                              <a
                                className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-200"
                                href="#"
                              >
                                Link 2
                              </a>
                            </li>
                            <li>
                              <a
                                className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-200"
                                href="#"
                              >
                                Link 3
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li className="hs-accordion" id="users-accordion-sub-2">
                        <button
                          type="button"
                          className="hs-accordion-toggle flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
                          aria-expanded="true"
                          aria-controls="users-accordion-sub-2-child"
                        >
                          Sub Menu 2
                          <svg
                            className="hs-accordion-active:block ms-auto hidden size-4"
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
                            <path d="m18 15-6-6-6 6" />
                          </svg>
                          <svg
                            className="hs-accordion-active:hidden ms-auto block size-4"
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
                            <path d="m6 9 6 6 6-6" />
                          </svg>
                        </button>
                        <div
                          id="users-accordion-sub-2-child"
                          className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                          role="region"
                          aria-labelledby="users-accordion-sub-2"
                        >
                          <ul className="space-y-1 pt-1">
                            <li>
                              <a
                                className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-200"
                                href="#"
                              >
                                Link 1
                              </a>
                            </li>
                            <li>
                              <a
                                className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-200"
                                href="#"
                              >
                                Link 2
                              </a>
                            </li>
                            <li>
                              <a
                                className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-200"
                                href="#"
                              >
                                Link 3
                              </a>
                            </li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="hs-accordion" id="account-accordion">
                  <button
                    type="button"
                    className="hs-accordion-toggle flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
                    aria-expanded="true"
                    aria-controls="account-accordion-child"
                  >
                    <svg
                      className="mt-0.5 size-4 shrink-0"
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
                      <circle cx={18} cy={15} r={3} />
                      <circle cx={9} cy={7} r={4} />
                      <path d="M10 15H6a4 4 0 0 0-4 4v2" />
                      <path d="m21.7 16.4-.9-.3" />
                      <path d="m15.2 13.9-.9-.3" />
                      <path d="m16.6 18.7.3-.9" />
                      <path d="m19.1 12.2.3-.9" />
                      <path d="m19.6 18.7-.4-1" />
                      <path d="m16.8 12.3-.4-1" />
                      <path d="m14.3 16.6 1-.4" />
                      <path d="m20.7 13.8 1-.4" />
                    </svg>
                    Account
                    <svg
                      className="hs-accordion-active:block ms-auto hidden size-4"
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
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                    <svg
                      className="hs-accordion-active:hidden ms-auto block size-4"
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
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  <div
                    id="account-accordion-child"
                    className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                    role="region"
                    aria-labelledby="account-accordion"
                  >
                    <ul className="space-y-1 ps-8 pt-1">
                      <li>
                        <a
                          className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-200"
                          href="#"
                        >
                          Link 1
                        </a>
                      </li>
                      <li>
                        <a
                          className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-200"
                          href="#"
                        >
                          Link 2
                        </a>
                      </li>
                      <li>
                        <a
                          className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-200"
                          href="#"
                        >
                          Link 3
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="hs-accordion" id="projects-accordion">
                  <button
                    type="button"
                    className="hs-accordion-toggle flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-start text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
                    aria-expanded="true"
                    aria-controls="projects-accordion-child"
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
                      <rect width={20} height={14} x={2} y={7} rx={2} ry={2} />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                    Projects
                    <svg
                      className="hs-accordion-active:block ms-auto hidden size-4"
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
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                    <svg
                      className="hs-accordion-active:hidden ms-auto block size-4"
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
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  <div
                    id="projects-accordion-child"
                    className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                    role="region"
                    aria-labelledby="projects-accordion"
                  >
                    <ul className="space-y-1 ps-8 pt-1">
                      <li>
                        <a
                          className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-200"
                          href="#"
                        >
                          Link 1
                        </a>
                      </li>
                      <li>
                        <a
                          className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-200"
                          href="#"
                        >
                          Link 2
                        </a>
                      </li>
                      <li>
                        <a
                          className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:bg-neutral-800 dark:text-neutral-200"
                          href="#"
                        >
                          Link 3
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <a
                    className="flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-neutral-300"
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
                      <rect width={18} height={18} x={3} y={4} rx={2} ry={2} />
                      <line x1={16} x2={16} y1={2} y2={6} />
                      <line x1={8} x2={8} y1={2} y2={6} />
                      <line x1={3} x2={21} y1={10} y2={10} />
                      <path d="M8 14h.01" />
                      <path d="M12 14h.01" />
                      <path d="M16 14h.01" />
                      <path d="M8 18h.01" />
                      <path d="M12 18h.01" />
                      <path d="M16 18h.01" />
                    </svg>
                    Calendar
                  </a>
                </li>
                <li>
                  <a
                    className="flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-900 dark:hover:text-neutral-300"
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
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                    Documentation
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          {/* End Content */}
        </div>
      </div>
      {/* End Sidebar */}
      {/* Content */}
      <div className="w-full lg:ps-64">
        <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
          {/* your content goes here ... */}
          <Test />
        </div>
      </div>
      {/* End Content */}
      {/* ========== END MAIN CONTENT ========== */}
    </>
  );
}
