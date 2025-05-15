import React from 'react';
import PropTypes from 'prop-types';

const ConfirmationModal = ({ onConfirm, onCancel, message }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        <h3 className="text-lg font-medium mb-4">Konfirmasi</h3>
        <p className="mb-6 mt-4">{message || 'Periksa Kembali data Anda apabila kurang yakin!'}</p>
        <div className="flex justify-end space-x-30">
          <button 
            onClick={onCancel}
            className="bg-orange-500 text-white py-2 px-13 rounded-md hover:bg-orange-600"
          >
            Batal
          </button>
          <button 
            onClick={onConfirm}
            className="bg-orange-500 text-white py-2 px-8 rounded-md hover:bg-orange-600"
          >
            Konfirmasi
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmationModal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  message: PropTypes.string
};

export default ConfirmationModal;