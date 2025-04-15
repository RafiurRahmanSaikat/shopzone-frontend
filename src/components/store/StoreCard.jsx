import { Pencil, Store, Trash2 } from "lucide-react";
import React from "react";
import Button from "../ui/Button";

const StoreCard = ({ store, onEdit, onDelete }) => (
  <div className="rounded border p-4 shadow dark:border-neutral-700 dark:bg-neutral-800">
    <div className="flex items-start justify-between">
      <div className="flex items-center space-x-2">
        <Store className="h-6 w-6 text-blue-600" />
        <h3 className="text-lg font-medium dark:text-white">{store.name}</h3>
      </div>
      <div className="flex space-x-2">
        <Button onClick={() => onEdit(store)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button onClick={() => onDelete(store.id)}>
          <Trash2 className="h-4 w-4" />
        </Button>
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
