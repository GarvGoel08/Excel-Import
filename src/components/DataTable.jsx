import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';
import { formatDate, formatIndianNumber } from '../utils/formatters';

const DataTable = ({ data, currentPage, itemsPerPage, onDelete, importedRows }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handleDeleteClick = (index) => {
    setSelectedRow(index);
  };

  const confirmDelete = () => {
    if (selectedRow !== null) {
      onDelete(startIndex + selectedRow);
      setSelectedRow(null);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verified</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentData.map((row, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={`hover:bg-gray-50 ${importedRows.has(row._id) ? 'bg-green-50' : ''}`}
              >
                <td className="px-6 py-4 whitespace-nowrap">{row.Name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatIndianNumber(row.Amount)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{formatDate(row.Date)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{row.Verified}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {importedRows.has(row._id) ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Imported
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDeleteClick(index)}
                    className="text-red-600 hover:text-red-900"
                    disabled={importedRows.has(row._id)}
                  >
                    <FiTrash2 className={`h-5 w-5 ${importedRows.has(row._id) ? 'opacity-50 cursor-not-allowed' : ''}`} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {selectedRow !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-lg p-6 max-w-sm mx-4"
            >
              <h3 className="text-lg font-medium mb-4">Confirm Deletion</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this row?</p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setSelectedRow(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DataTable;
