import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format, parseISO } from 'date-fns';

const DateRangePicker = ({ startDate, endDate, onStartDateChange, onEndDateChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: startDate ? parseISO(startDate) : new Date(),
      endDate: endDate ? parseISO(endDate) : new Date(),
      key: 'selection'
    }
  ]);

  const handleSelect = (ranges) => {
    const selection = ranges.selection;
    setRange([selection]);
    onStartDateChange(format(selection.startDate, 'yyyy-MM-dd'));
    onEndDateChange(format(selection.endDate, 'yyyy-MM-dd'));
    setShowPicker(false); // auto-close after selection
  };

  const getButtonLabel = () => {
    if (startDate && endDate) {
      const start = format(parseISO(startDate), 'dd/MM/yyyy');
      const end = format(parseISO(endDate), 'dd/MM/yyyy');
      return `${start} - ${end}`;
    }
    return 'Pilih Periode';
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        className="w-full bg-white border border-gray-300 rounded-md px-4 py-2 text-left hover:bg-gray-50"
      >
        {getButtonLabel()}
      </button>

      {showPicker && (
        <div className="absolute z-50 mt-2 bg-white shadow-lg rounded">
          <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={range}
            rangeColors={['#f97316']} // warna oranye
            maxDate={new Date()}
          />
        </div>
      )}
    </div>
  );
};

DateRangePicker.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  onStartDateChange: PropTypes.func.isRequired,
  onEndDateChange: PropTypes.func.isRequired
};

export default DateRangePicker;
