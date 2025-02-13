import { Pencil, Store, Trash2 } from "lucide-react";
import React from "react";

const StoreCard = ({ store, onEdit, onDelete }) => (
  <div className="rounded border p-4 shadow dark:border-neutral-700 dark:bg-neutral-800">
    <div className="flex items-start justify-between">
      <div className="flex items-center space-x-2">
        <Store className="h-6 w-6 text-blue-600" />
        <h3 className="text-lg font-medium dark:text-white">{store.name}</h3>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(store)}
          className="p-1 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-neutral-700"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(store.id)}
          className="p-1 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
    <div className="mt-2">
      <p className="text-sm dark:text-gray-300">
        <strong>Address:</strong> {store.address}
      </p>
      <p className="text-sm dark:text-gray-300">
        <strong>Location:</strong> {store.location}
      </p>
    </div>
    <div className="mt-2 flex flex-wrap gap-2">
      {store.categories?.map((category) => (
        <span
          key={category.id}
          className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
        >
          {category.name}
        </span>
      ))}
    </div>
  </div>
);

export default StoreCard;
