import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tab } from '@headlessui/react';

const ErrorModal = ({ errors, isOpen, onClose }) => {
  if (!errors || Object.keys(errors).length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
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
            className="bg-white rounded-lg p-6 max-w-3xl w-full mx-4 max-h-[80vh] overflow-hidden"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Validation Errors</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <Tab.Group>
              <Tab.List className="flex space-x-2 border-b mb-4">
                {Object.keys(errors).map((sheetName) => (
                  <Tab
                    key={sheetName}
                    className={({ selected }) =>
                      `px-4 py-2 rounded-t-lg focus:outline-none ${
                        selected
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`
                    }
                  >
                    {sheetName}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels className="overflow-y-auto max-h-[60vh]">
                {Object.entries(errors).map(([sheetName, sheetErrors]) => (
                  <Tab.Panel key={sheetName}>
                    <div className="space-y-2">
                      {sheetErrors.map((error, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-3 bg-red-50 border border-red-200 rounded"
                        >
                          <span className="font-medium">Row {error.row}: </span>
                          <span className="text-red-600">{error.message}</span>
                        </motion.div>
                      ))}
                    </div>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorModal;
