import React, { useState } from "react";

const ImportExportModal = ({ onClose, onImport, onExport }) => {
  const [importText, setImportText] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded w-11/12 max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Import / Export Tasks
        </h2>
        <textarea
          value={importText}
          onChange={(e) => setImportText(e.target.value)}
          placeholder="Paste tasks here (each line will be a new task)"
          className="w-full h-40 p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 mb-4"
        />
        <div className="flex justify-between">
          <button
            onClick={() => {
              onImport(importText);
              setImportText("");
            }}
            className="p-2 bg-green-500 text-white rounded"
          >
            Import
          </button>
          <button
            onClick={onExport}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Export
          </button>
          <button
            onClick={onClose}
            className="p-2 bg-gray-500 text-white rounded"
          >
            Close
          </button>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Max 100 tasks will be imported.
        </p>
      </div>
    </div>
  );
};

export default ImportExportModal;
