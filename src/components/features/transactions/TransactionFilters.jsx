import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../../ui/SearchBar';
import DateRangePicker from '../../ui/DateRangePicker';
import Dropdown from '../../ui/Dropdown';

const TransactionFilters = ({ onSearch, onDateRangeChange, onTypeChange }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const transactionTypeOptions = [
    { value: '', label: 'Semua Tipe' },
    { value: 'Pemasukan', label: 'Pemasukan' },
    { value: 'Pengeluaran', label: 'Pengeluaran' },
  ];

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onDateRangeChange(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onDateRangeChange(startDate, date);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <SearchBar 
          onSearch={onSearch}
          placeholder="Cari Transaksi"
          debounceTime={300}
        />
      </div>
      
      <div>
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          label=""
          startLabel="Tanggal Mulai"
          endLabel="Tanggal Akhir"
        />
      </div>
      
      <div>
        <Dropdown
          label=""
          placeholder="Tipe Transaksi"
          options={transactionTypeOptions}
          onChange={onTypeChange}
          value=""
        />
      </div>
    </div>
  );
};

TransactionFilters.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onDateRangeChange: PropTypes.func.isRequired,
  onTypeChange: PropTypes.func.isRequired
};

export default TransactionFilters;