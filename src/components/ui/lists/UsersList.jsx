import { CheckCircle, Delete, MapPin, Phone, User } from "lucide-react";
import React, { useState } from "react";
import { NoData, TableFooter } from "../..";
import useFetch from "../../../hooks/UseFetch";
import { handleDeleteRequest } from "../../../utils/Actions";
import Spinner from "../common/Spinner";

const UserStatus = ({ isAuthenticated }) => (
  <span
    className={`inline-flex items-center gap-x-1 rounded-full px-2 py-1 text-xs font-medium ${
      isAuthenticated
        ? "bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400"
        : "bg-gray-100 text-gray-800 dark:bg-zinc-500/20 dark:text-gray-300"
    }`}
  >
    <CheckCircle className="h-3 w-3" />
    {isAuthenticated ? "Active" : "Inactive"}
  </span>
);

const UserRole = ({ role }) => {
  const roleColors = {
    admin: "text-red-700 bg-red-100 dark:text-red-400 dark:bg-red-500/20",
    store_owner:
      "text-blue-700 bg-blue-100 dark:text-blue-400 dark:bg-blue-500/20",
    customer:
      "text-green-700 bg-green-100 dark:text-green-400 dark:bg-green-500/20",
  };

  return (
    <span
      className={`rounded-md px-2 py-1 text-sm font-medium ${roleColors[role] || "bg-gray-100 text-gray-700 dark:bg-zinc-500/20 dark:text-gray-300"}`}
    >
      {role.replace("_", " ").charAt(0).toUpperCase() + role.slice(1)}
    </span>
  );
};

const UserContact = ({ username, phone, address }) => (
  <div className="flex flex-col gap-1 text-sm dark:text-gray-300">
    {[
      { Icon: User, text: username },
      { Icon: Phone, text: phone },
      { Icon: MapPin, text: address },
    ].map(({ Icon, text }, index) => (
      <span key={index} className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-gray-400" />
        {text}
      </span>
    ))}
  </div>
);

const TABLE_HEADERS = [
  "User Info",
  "Contact Details",
  "Role",
  "Status",
  "Action",
];

export default function UsersList() {
  const [page, setPage] = useState(1);
  const {
    data: users,
    loading,
    error,
    refetch,
  } = useFetch(`/accounts/users/?page=${page}`);
  console.log(users);
  if (loading) return <Spinner />;
  if (error)
    return (
      <div className="flex min-h-[400px] items-center justify-center text-red-500">
        Error: {error}
      </div>
    );

  if (!users?.results) return <NoData title="No User" />;

  const handlePageChange = (newPage) => setPage(Math.max(1, Number(newPage)));
  const deleteUser = async (userId) => {
    await handleDeleteRequest(`/accounts/users/${userId}/`);
    refetch();
  };

  return (
    <div className="flex h-[93vh] flex-col rounded-xl bg-white shadow-lg dark:bg-neutral-900">
      {/* Header */}
      <div className="m-2">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Users Directory
          </h2>
          <span className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
            Manage users, roles, and permissions
          </span>
        </div>
      </div>
      {/* Table Container */}
      <div className="flex-1 overflow-hidden p-6 pt-0">
        {/* Table */}

        <div className="h-full overflow-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <thead className="border-1 border-gray-500 dark:border-gray-50">
              <tr>
                {TABLE_HEADERS.map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-neutral-400"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white dark:divide-neutral-700 dark:bg-neutral-900">
              {users.results.map((user) => (
                <tr
                  key={user.id}
                  className="transition-colors duration-150 hover:bg-gray-50 dark:hover:bg-neutral-800"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={user.profile_picture || "/placeholder.jpg"}
                        alt={user.get_full_name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-neutral-100">
                          {user.get_full_name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-neutral-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <UserContact
                      username={user.username}
                      phone={user.phone_number}
                      address={user.address}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <UserRole role={user.role} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <UserStatus isAuthenticated={user.is_authenticated} />
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                    <button
                      className="text-red-600 transition-colors duration-150 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete <Delete className="ml-1 inline-block h-4 w-4" />
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
          count={users.count}
          next={users.next}
          previous={users.previous}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
