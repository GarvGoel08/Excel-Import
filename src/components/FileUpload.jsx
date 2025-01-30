import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { FiUploadCloud } from 'react-icons/fi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const FileUpload = ({ onFileUpload }) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    
    if (!file) {
      setError('Please select a file');
      return;
    }

    if (!file.name.endsWith('.xlsx')) {
      setError('Only .xlsx files are allowed');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('File size must be less than 2MB');
      return;
    }

    setError('');
    setIsLoading(true);
    try {
      await onFileUpload(file);
    } finally {
      setIsLoading(false);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxSize: 2 * 1024 * 1024,
    multiple: false,
    disabled: isLoading
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto p-6"
    >
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} disabled={isLoading} />
        {isLoading ? (
          <div>
            <AiOutlineLoading3Quarters className="mx-auto text-4xl mb-4 text-blue-500 animate-spin" />
            <p className="text-lg mb-2">Processing your file...</p>
          </div>
        ) : (
          <>
            <FiUploadCloud className="mx-auto text-4xl mb-4 text-blue-500" />
            <p className="text-lg mb-2">
              {isDragActive ? 'Drop the file here' : 'Drag & drop an Excel file here'}
            </p>
            <p className="text-sm text-gray-500">or click to select a file</p>
            <p className="text-xs text-gray-400 mt-2">Only .xlsx files up to 2MB are accepted</p>
          </>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 mt-2 text-center"
        >
          {error}
        </motion.p>
      )}
    </motion.div>
  );
};

export default FileUpload;
