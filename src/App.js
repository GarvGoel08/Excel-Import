import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ImportPage from './pages/ImportPage';
import AdminDataPage from './pages/AdminDataPage';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">Excel Importer</div>
          <div className="space-x-4">
            <Link to="/" className="hover:text-gray-300">Import</Link>
            <Link to="/admin/data" className="hover:text-gray-300">View Data</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<ImportPage />} />
        <Route path="/admin/data" element={<AdminDataPage />} />
      </Routes>
    </Router>
  );
}

export default App;
