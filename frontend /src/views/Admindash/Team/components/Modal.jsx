import React from "react";

const Modal = ({ isOpen, onClose, title, onConfirm, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-2/5 lg:w-1/3 transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          {title}
        </h2>
        <div className="mb-4">{children}</div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded mr-2 hover:bg-gray-600 transition duration-200"
            onClick={onClose}
          >
            Cancelar
          </button>
          {onConfirm && (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
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
