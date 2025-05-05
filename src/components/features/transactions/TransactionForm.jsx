import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../../ui/Dropdown';

const TransactionForm = ({ onClose, onSubmit, editData = null }) => {
  // Fungsi untuk mendapatkan tanggal lokal saat ini dengan offset zona waktu
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // bulan dimulai dari 0
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  

  const [formData, setFormData] = useState({
    name: '',
    date: getCurrentDate(), // Tanggal otomatis hari ini
    amount: '',
    type: 'Pemasukan'
  });
  
  const [errors, setErrors] = useState({});
  const isEditMode = !!editData;

  // Initialize form with edit data if provided
  useEffect(() => {
    if (editData) {
      setFormData({
        name: editData.name || '',
        date: editData.date || getCurrentDate(),
        amount: editData.amount ? editData.amount.toString() : '',
        type: editData.type || 'Pemasukan'
      });
    }
  }, [editData]);

  const transactionTypeOptions = [
    { value: 'Pemasukan', label: 'Pemasukan' },
    { value: 'Pengeluaran', label: 'Pengeluaran' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleTypeChange = (option) => {
    setFormData({
      ...formData,
      type: option.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nama produk harus diisi';
    }
    
    if (!formData.amount) {
      newErrors.amount = 'Nominal harus diisi';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Nominal harus berupa angka positif';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Pastikan selalu menggunakan tanggal hari ini untuk transaksi baru
      const submissionData = {
        ...formData,
        date: isEditMode ? formData.date : getCurrentDate(), // Gunakan tanggal hari ini untuk transaksi baru
        amount: parseFloat(formData.amount),
        id: editData?.id // Pass the id if in edit mode
      };
      
      onSubmit(submissionData);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-medium">
            {isEditMode ? 'Edit Transaksi' : 'Tambah Transaksi'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipe Transaksi
            </label>
            <Dropdown
              options={transactionTypeOptions}
              value={formData.type}
              onChange={handleTypeChange}
              name="type"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Produk
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-orange-500`}
              placeholder="Masukkan nama produk"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          
          {/* Input tanggal dihapus karena tanggal diatur otomatis ke hari ini */}
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nominal Transaksi
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">Rp.</span>
              </div>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className={`w-full pl-10 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-orange-500`}
                placeholder="0"
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-sm text-red-500">{errors.amount}</p>
            )}
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300"
            >
              Batal
            </button>
            {isEditMode ? (
              <button
                type="submit"
                className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
              >
                Edit
              </button>
            ) : (
              <button
                type="submit"
                className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
              >
                Simpan Transaksi
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

TransactionForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  editData: PropTypes.object
};

export default TransactionForm;