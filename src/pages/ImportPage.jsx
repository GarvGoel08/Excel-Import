import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FileUpload from '../components/FileUpload';
import DataTable from '../components/DataTable';
import ErrorModal from '../components/ErrorModal';
import { toast } from 'react-hot-toast';

const ImportPage = () => {
  const [sheetData, setSheetData] = useState(null);
  const [selectedSheet, setSelectedSheet] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState(null);
  const [showErrors, setShowErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [importedRows, setImportedRows] = useState(new Set());
  
  const itemsPerPage = 10;

  const handleFileUpload = async (file) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_VALIDATE_ENDPOINT}`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result);

      if (result.errors) {
        setErrors(result.errors);
        setShowErrors(true);
      }

      if (result.data) {
        setSheetData(result.data);
        setSelectedSheet(Object.keys(result.data)[0]);
        // If there are errors, show them but still allow importing valid rows
        if (result.errors) {
          toast.success('File validated. Some rows have errors but valid rows can be imported.');
        } else {
          toast.success('File validated successfully');
        }
      }
    } catch (error) {
      toast.error('Error uploading file. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteRow = async (index) => {
    if (!sheetData || !selectedSheet) return;

    const newData = {
      ...sheetData,
      [selectedSheet]: sheetData[selectedSheet].filter((_, i) => i !== index),
    };
    setSheetData(newData);
  };

  const handleImport = async () => {
    if (!sheetData || !selectedSheet) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}${process.env.REACT_APP_IMPORT_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: sheetData
        }),
      });

      const result = await response.json();

      if (result.errors) {
        setErrors(result.errors);
        setShowErrors(true);
      }

      if (result.success) {
        // Mark successfully imported rows
        const newImportedRows = new Set(importedRows);
        result.success.forEach(row => {
          newImportedRows.add(row._id);
        });
        setImportedRows(newImportedRows);

        toast.success(
          result.errors 
            ? 'Import completed. Some rows were imported successfully while others had errors.' 
            : 'All data imported successfully'
        );
      }
    } catch (error) {
      toast.error('Error importing data');
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = sheetData && selectedSheet
    ? Math.ceil(sheetData[selectedSheet].length / itemsPerPage)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8 mt-4 text-center">Excel Data Importer</h1>

      <FileUpload onFileUpload={handleFileUpload} />

      {sheetData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <div className="flex justify-between items-center mb-4">
            <select
              value={selectedSheet}
              onChange={(e) => setSelectedSheet(e.target.value)}
              className="border rounded px-3 py-2"
            >
              {Object.keys(sheetData).map((sheet) => (
                <option key={sheet} value={sheet}>
                  {sheet}
                </option>
              ))}
            </select>

            <button
              onClick={handleImport}
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? 'Importing...' : 'Import Data'}
            </button>
          </div>

          {selectedSheet && (
            <>
              <DataTable
                data={sheetData[selectedSheet]}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onDelete={handleDeleteRow}
                importedRows={importedRows}
              />

              <div className="mt-4 flex justify-center space-x-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-3 py-1">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </motion.div>
      )}

      <ErrorModal
        errors={errors}
        isOpen={showErrors}
        onClose={() => setShowErrors(false)}
      />
    </motion.div>
  );
};

export default ImportPage;
