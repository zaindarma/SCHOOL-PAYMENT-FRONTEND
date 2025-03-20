import React from "react";

const ConfirmationModal = ({
  isOpen,
  question,
  onConfirm,
  onCancel,
  confirmLabel = "Yes",
  cancelLabel = "No",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center  bg-opacity-50 z-50">
      <div className="bg-white ibg-gray-800 p-6 rounded-lg shadow-lg w-96 border-2 border-gray-500">
        <h2 className="text-lg font-semibold text-gray-700 itext-gray-300 mb-4">
          {question}
        </h2>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
