import { Eye, ShoppingCart } from "lucide-react";
import React from "react";

export const ShowDetailsButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="relative z-10 flex items-center gap-2 rounded-full border-2 border-gray-50 px-4 py-2 text-lg font-medium text-gray-600 shadow-xl transition-all before:absolute before:-left-full before:-z-10 before:aspect-square before:w-full before:rounded-full before:bg-blue-500 before:transition-all before:duration-700 hover:text-white before:hover:left-0 before:hover:scale-150 before:hover:duration-700"
  >
    Show Details
    <Eye className="h-6 w-6 rotate-45 border border-gray-700 p-1 transition-all group-hover:rotate-90 group-hover:border-none group-hover:bg-white" />
  </button>
);

export const AddToCartButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="relative z-10 flex items-center gap-2 rounded-full border-2 border-gray-50 px-4 py-2 text-lg font-medium text-gray-600 shadow-xl transition-all before:absolute before:-left-full before:-z-10 before:aspect-square before:w-full before:rounded-full before:bg-green-500 before:transition-all before:duration-700 hover:text-white before:hover:left-0 before:hover:scale-150 before:hover:duration-700"
  >
    Add to Cart
    <ShoppingCart className="h-6 w-6 rotate-45 border border-gray-700 p-1 transition-all group-hover:rotate-90 group-hover:border-none group-hover:bg-white" />
  </button>
);
