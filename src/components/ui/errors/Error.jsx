import { ReloadIcon } from "hugeicons-react";

export default function Error({ message }) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex h-24 w-3/4 max-w-96 overflow-hidden rounded-xl bg-white shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" height="96" width="16">
          <path
            strokeLinecap="round"
            strokeWidth="2"
            stroke="indianred"
            fill="indianred"
            d="M 8 0
                                 Q 4 4.8, 8 9.6
                                 T 8 19.2
                                 Q 4 24, 8 28.8
                                 T 8 38.4
                                 Q 4 43.2, 8 48
                                 T 8 57.6
                                 Q 4 62.4, 8 67.2
                                 T 8 76.8
                                 Q 4 81.6, 8 86.4
                                 T 8 96
                                 L 0 96
                                 L 0 0
                                 Z"
          ></path>
        </svg>
        <div className="mx-8 w-full overflow-hidden">
          <p className="mr-3 mt-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold leading-8 text-[indianred]">
            Error !
          </p>
          <p className="mr-3 mt-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold leading-8 text-[indianred]">
            {message}
          </p>
        </div>
        <button
          onClick={() => location.reload()}
          className="w-16 cursor-pointer focus:outline-none"
        >
          <ReloadIcon className="h-8 w-8 text-red-400 hover:text-red-200" />
        </button>
      </div>
    </div>
  );
}
