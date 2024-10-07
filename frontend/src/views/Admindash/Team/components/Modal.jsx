import React from "react";

const Modal = ({ isOpen, onClose, title, onConfirm, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 text-white py-1 px-4 rounded mr-2"
            onClick={onClose}
          >
            Cancelar
          </button>
          {onConfirm && (
            <button
              className="bg-blue-500 text-white py-1 px-4 rounded"
              onClick={onConfirm}
            >
              Confirmar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
