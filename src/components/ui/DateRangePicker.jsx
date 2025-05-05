import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from './DatePicker';

const DateRangePicker = ({ 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange, 
  label,
  startLabel = 'Tanggal Mulai', 
  endLabel = 'Tanggal Akhir'
}) => {
  return (
    <div>
      {label && (
        <div className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DatePicker
          label={startLabel}
          name="startDate"
          value={startDate}
          onChange={onStartDateChange}
        />
        
        <DatePicker
          label={endLabel}
          name="endDate"
          value={endDate}
          onChange={onEndDateChange}
        />
      </div>
    </div>
  );
};

DateRangePicker.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  startLabel: PropTypes.string,
  endLabel: PropTypes.string
};

export default DateRangePicker;