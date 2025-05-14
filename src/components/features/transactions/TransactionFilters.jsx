import React, { useState } from "react";
import PropTypes from "prop-types";
import SearchBar from "../../ui/SearchBar";
import DateRangePicker from "../../ui/DateRangePicker";
import Dropdown from "../../ui/Dropdown";
import PeriodDropdown from "../../common/PeriodDropdown";

const TransactionFilters = ({ onSearch, onDateRangeChange, onTypeChange }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const transactionTypeOptions = [
    { value: "", label: "Semua Tipe" },
    { value: "Pemasukan", label: "Pemasukan" },
    { value: "Pengeluaran", label: "Pengeluaran" },
  ];

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onDateRangeChange(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onDateRangeChange(startDate, date);
  };

  const periodData = [
    {
      id: 1,
      name: "period1",
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      id: 2,
      name: "period2",
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      id: 3,
      name: "period3",
      startDate: new Date(),
      endDate: new Date(),
    },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between">
      <SearchBar
        onSearch={onSearch}
        placeholder="Cari Transaksi"
        debounceTime={300}
      />

      <PeriodDropdown periodData={periodData} />

      <Dropdown
        label=""
        placeholder="Tipe Transaksi"
        options={transactionTypeOptions}
        onChange={onTypeChange}
        value=""
      />
    </div>
  );
};

TransactionFilters.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onDateRangeChange: PropTypes.func.isRequired,
  onTypeChange: PropTypes.func.isRequired,
};

export default TransactionFilters;
