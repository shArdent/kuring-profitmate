import React from 'react';
import PropTypes from 'prop-types';

const Table = ({ columns, data, onRowClick, emptyMessage = 'Tidak ada data', isLoading = false, onEdit, onDelete }) => {
  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-8 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-8 text-center text-gray-500">{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={column.key || index}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr
                key={row.id || rowIndex}
                onClick={() => onRowClick && onRowClick(row)}
                className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={`${rowIndex}-${column.key || colIndex}`}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {column.key === 'actions' ? (
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit && onEdit(row);
                          }}
                          className="p-1 rounded text-blue-600 hover:bg-blue-100 focus:outline-none"
                          title="Edit"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete && onDelete(row);
                          }}
                          className="p-1 rounded text-red-600 hover:bg-red-100 focus:outline-none"
                          title="Delete"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ) : column.render ? (
                      column.render(row)
                    ) : (
                      row[column.key]
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      header: PropTypes.string.isRequired,
      render: PropTypes.func,
      width: PropTypes.string
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
  emptyMessage: PropTypes.string,
  isLoading: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

export default Table;