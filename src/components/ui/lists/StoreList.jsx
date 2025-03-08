import { StoreModal, TableFooter } from "@components";

import { Edit, MapPin, Plus, Tag, Trash2, User } from "lucide-react";
import React, { useState } from "react";
import UseFetch from "../../../hooks/UseFetch";
import { handleDeleteRequest } from "../../../utils/Actions";

const StoreList = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [page, setPage] = useState(1);
  const {
    data: stores,
    loading,
    error,
    refetch,
  } = UseFetch(`/stores?page=${page}`);
  console.log(stores);
  const handleAddStore = () => {
    setSelectedStore(null);
    setModalOpen(true);
  };

  const handleEditStore = (store) => {
    setSelectedStore(store);
    setModalOpen(true);
  };

  const handleDeleteStore = async (storeId) => {
    if (window.confirm("Are you sure you want to delete this store?")) {
      try {
        await handleDeleteRequest(`/stores/${storeId}/`);
        refetch();
      } catch (error) {
        console.error("Error deleting store:", error);
        alert("Failed to delete store");
      }
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedStore(null);
    refetch();
  };

  const handlePageChange = (newPage) => {
    setPage(Math.max(1, newPage));
  };

  if (loading) return <Spinner />;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="flex h-[93vh] flex-col rounded-xl bg-white p-6 shadow-lg dark:bg-neutral-900">
      {/* Headers */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          My Stores
        </h2>
        <button
          onClick={handleAddStore}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" /> Add Store
        </button>
      </div>
      {/* Table Container */}
      <div className="flex-1 overflow-hidden p-6 pt-0">
        <div className="h-full overflow-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <thead className="border-1 border-gray-500 dark:border-gray-50">
              <tr>
                {[
                  "Name",
                  "Address",
                  "Location",
                  "Owner",
                  "Categories",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-neutral-400"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-neutral-700 dark:bg-neutral-900">
              {stores?.results.map((store) => (
                <tr
                  key={store.id}
                  className="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-neutral-800"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {store.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500 dark:text-neutral-400">
                      <MapPin className="mr-2 h-4 w-4" />
                      {store.address}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-neutral-400">
                      {store.location}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500 dark:text-neutral-400">
                      <User className="mr-2 h-4 w-4" />
                      {store.owner}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-2">
                      {store.store_categories.map((category) => (
                        <span
                          key={category.id}
                          className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                          <Tag className="mr-1 h-3 w-3" />
                          {category.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                    <button
                      onClick={() => handleEditStore(store)}
                      className="mr-4 text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteStore(store.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Footer */}
      <div className="mt-auto">
        <TableFooter
          count={stores?.count}
          next={stores?.next}
          previous={stores?.previous}
          handlePageChange={handlePageChange}
        />
      </div>

      <StoreModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        initialData={selectedStore}
      />
    </div>
  );
};

export default StoreList;
