import React, { useState, useEffect } from 'react';
import Sidebar from '../components/ui/Sidebar';
import Table from '../components/ui/Table';
import TransactionFilters from '../components/features/transactions/TransactionFilters';
import TransactionForm from '../components/features/transactions/TransactionForm';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import NotificationModal from '../components/ui/NotificationModal';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');
  const [pendingTransactionData, setPendingTransactionData] = useState(null);
  const [confirmModalType, setConfirmModalType] = useState(''); // 'add' or 'edit'

  useEffect(() => {
    // Fetch transactions data (mock data for now)
    fetchTransactions();
  }, [searchTerm, startDate, endDate, transactionType]);

  const fetchTransactions = () => {
    setIsLoading(true);
    // Mock API call - replace with actual API call
    setTimeout(() => {
      const mockData = [
        { id: 1, date: '2025-04-25', type: 'Pemasukan', name: 'Penjualan Produk A', amount: 1500000 },
        { id: 2, date: '2025-04-23', type: 'Pengeluaran', name: 'Beli Bahan Baku', amount: 750000 },
        { id: 3, date: '2025-04-20', type: 'Pemasukan', name: 'Penjualan Produk B', amount: 2000000 },
        { id: 4, date: '2025-04-18', type: 'Pengeluaran', name: 'Bayar Listrik', amount: 350000 },
        { id: 5, date: '2025-04-15', type: 'Pemasukan', name: 'Penjualan Produk C', amount: 1750000 },
      ];

      // Apply filters (this would normally be done on the server)
      let filteredData = mockData;
      
      if (searchTerm) {
        filteredData = filteredData.filter(item => 
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (startDate && endDate) {
        filteredData = filteredData.filter(item => 
          new Date(item.date) >= new Date(startDate) && 
          new Date(item.date) <= new Date(endDate)
        );
      }
      
      if (transactionType) {
        filteredData = filteredData.filter(item => 
          item.type === transactionType
        );
      }
      
      setTransactions(filteredData);
      setIsLoading(false);
    }, 500);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleDateRangeChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleTypeChange = (option) => {
    setTransactionType(option.value);
  };

  // Show confirmation before adding
  const handleSubmitAddTransaction = (transactionData) => {
    setPendingTransactionData(transactionData);
    setConfirmModalType('add');
    setShowConfirmModal(true);
  };

  // Actual add transaction after confirmation
  const handleAddTransaction = () => {
    // In a real app, this would be an API call to add the transaction
    console.log('Adding transaction:', pendingTransactionData);
    
    // For demo purposes, we'll just add it to our local state
    const newTransaction = {
      id: transactions.length + 1,
      date: pendingTransactionData.date, // Always use today's date
      type: pendingTransactionData.type,
      name: pendingTransactionData.name,
      amount: pendingTransactionData.amount
    };
    
    setTransactions([newTransaction, ...transactions]);
    setShowTransactionModal(false);
    setShowConfirmModal(false);
    showNotification('tambah');
    setPendingTransactionData(null);
  };

  // Show confirmation before editing
  const handleSubmitEditTransaction = (transactionData) => {
    setPendingTransactionData(transactionData);
    setConfirmModalType('edit');
    setShowConfirmModal(true);
  };

  // Actual edit transaction after confirmation
  const handleEditTransaction = () => {
    // In a real app, this would be an API call to update the transaction
    console.log('Updating transaction:', pendingTransactionData);
    
    // For demo purposes, we'll just update our local state
    const updatedTransactions = transactions.map(transaction => 
      transaction.id === pendingTransactionData.id 
        ? { ...transaction, name: pendingTransactionData.name, type: pendingTransactionData.type, amount: pendingTransactionData.amount }
        : transaction
    );
    
    setTransactions(updatedTransactions);
    setShowEditModal(false);
    setShowConfirmModal(false);
    showNotification('ubah');
    setPendingTransactionData(null);
  };

  const handleRowClick = (transaction) => {
    console.log('Selected transaction:', transaction);
    setCurrentTransaction(transaction);
    setShowEditModal(true);
  };

  const handleConfirmAction = () => {
    if (confirmModalType === 'add') {
      handleAddTransaction();
    } else if (confirmModalType === 'edit') {
      handleEditTransaction();
    } else if (confirmModalType === 'delete') {
      handleDeleteConfirmed();
    }
  };

  const handleDeleteConfirmed = () => {
    setShowConfirmModal(false);
    // In a real app, this would be an API call to delete the transaction
    
    // For demo purposes, we'll just update our local state
    const updatedTransactions = transactions.filter(transaction => 
      transaction.id !== currentTransaction.id
    );
    
    setTransactions(updatedTransactions);
    setCurrentTransaction(null);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmModal(false);
    setPendingTransactionData(null);
  };

  const showNotification = (type) => {
    setNotificationType(type);
    setShowSuccessNotification(true);
    setTimeout(() => {
      setShowSuccessNotification(false);
    }, 3000);
  };

  const columns = [
    { 
      key: 'date', 
      header: 'Tanggal', 
      width: '20%',
      render: (row) => {
        // Format date: YYYY-MM-DD to DD/MM/YYYY
        const dateParts = row.date.split('-');
        return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
      }
    },
    { key: 'type', header: 'Tipe Transaksi', width: '20%' },
    { key: 'name', header: 'Nama Produk', width: '40%' },
    { 
      key: 'amount', 
      header: 'Nominal', 
      width: '20%',
      render: (row) => {
        // Format number with comma as thousands separator
        return `Rp ${row.amount.toLocaleString('id-ID')}`;
      }
    },
  ];

  // Get confirmation message based on action type
  const getConfirmationMessage = () => {
    if (confirmModalType === 'add') {
      return 'Periksa kembali data Anda apabila kurang yakin! Tambahkan transaksi ini?';
    } else if (confirmModalType === 'edit') {
      return 'Periksa kembali data Anda apabila kurang yakin! Simpan perubahan transaksi?';
    } else {
      return 'Periksa kembali data Anda apabila kurang yakin!';
    }
  };

  // Get notification message based on type
  const getNotificationMessage = () => {
    if (notificationType === 'tambah') {
      return 'Data Berhasil Ditambahkan';
    } else if (notificationType === 'ubah') {
      return 'Data Berhasil Diubah';
    }
    return 'Data Berhasil Diproses';
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Daftar Transaksi</h1>
          <button 
            onClick={() => setShowTransactionModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Tambah Transaksi
          </button>
        </div>
          
          <div className="mb-6">
            <TransactionFilters 
              onSearch={handleSearch}
              onDateRangeChange={handleDateRangeChange}
              onTypeChange={handleTypeChange}
            />
          </div>
        
        <h2 className="text-lg font-medium mb-4">Daftar Transaksi</h2>
        
        <Table 
          columns={columns} 
          data={transactions} 
          onRowClick={handleRowClick}
          isLoading={isLoading}
          emptyMessage="Tidak ada data transaksi"
        />
      </div>
      
      {showTransactionModal && (
        <TransactionForm 
          onClose={() => setShowTransactionModal(false)}
          onSubmit={handleSubmitAddTransaction}
        />
      )}

      {showEditModal && currentTransaction && (
        <TransactionForm 
          onClose={(viewDetails) => {
            if (viewDetails) {
              // Handle showing details view - for demo we'll just log
              console.log('Viewing details for:', currentTransaction);
            }
            setShowEditModal(false);
            setCurrentTransaction(null);
          }}
          onSubmit={handleSubmitEditTransaction}
          editData={currentTransaction}
        />
      )}

      {showConfirmModal && (
        <ConfirmationModal
          onConfirm={handleConfirmAction}
          onCancel={handleCancelConfirmation}
          message={getConfirmationMessage()}
        />
      )}

      {showSuccessNotification && (
        <NotificationModal
          message={getNotificationMessage()}
          onClose={() => setShowSuccessNotification(false)}
          type="info"
        />
      )}
    </div>
  );
};

export default Transactions;