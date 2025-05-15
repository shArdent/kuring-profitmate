import React, { useState } from "react";
import PropTypes from "prop-types";
import SearchBar from "../../ui/SearchBar";
import DateRangePicker from "../../ui/DateRangePicker";
import Dropdown from "../../ui/Dropdown";
import PeriodDropdown from "../../common/PeriodDropdown";

const TransactionFilters = ({
  onSearch,
  onTypeChange,
  periods,
  transactionType,
  currentPeriod,
  setPeriods,
}) => {
  const transactionTypeOptions = [
    { value: "", label: "Semua Tipe" },
    { value: "INCOME", label: "Pemasukan" },
    { value: "EXPENSE", label: "Pengeluaran" },
  ];

  const getDisplayText = () => {
    switch (transactionType) {
      case "INCOME":
        return "Pemasukan";

      case "EXPENSE":
        return "Pengeluaran";

      case "":
        return "Semua";

      default:
        break;
    }
  };

  const displayText = getDisplayText();

  return (
    <div className="flex flex-col gap-5 md:flex-row justify-between">
      <SearchBar
        onSearch={onSearch}
        placeholder="Cari Transaksi"
        debounceTime={300}
      />

      <PeriodDropdown
        periodData={periods}
        currentPeriod={currentPeriod}
        setCurrentPeriod={setPeriods}
      />

      <Dropdown
        label=""
        placeholder="Tipe Transaksi"
        options={transactionTypeOptions}
        onChange={onTypeChange}
        displayText={displayText}
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
