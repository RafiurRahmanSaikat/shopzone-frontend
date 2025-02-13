import React from "react";

/**
 * A reusable table component.
 *
 * Props:
 * - columns: Array of objects representing each column. Each object should have:
 *    - header: The header label.
 *    - accessor: The key in the data object (optional if using render).
 *    - render: Optional function to custom render the cell; receives the row data.
 * - data: Array of data objects.
 * - rowKey: Unique key in each data row (default is "id").
 * - actions: An optional function that receives the row data and returns a React node.
 * - className: Additional class names for the table.
 */
const Table = ({
  columns,
  data,
  rowKey = "id",
  actions = null,
  className = "",
}) => {
  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
        <thead className="bg-gray-50 dark:bg-neutral-800">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-neutral-300"
              >
                {col.header}
              </th>
            ))}
            {actions && (
              <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-neutral-300">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white dark:bg-neutral-900">
          {data.map((item, index) => (
            <tr key={item[rowKey] || index}>
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-white"
                >
                  {col.render ? col.render(item) : item[col.accessor]}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900 dark:text-white">
                  {actions(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
