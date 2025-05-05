import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const DatePicker = ({ 
  label, 
  value, 
  onChange, 
  name,
  placeholder = 'Pilih tanggal',
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value ? new Date(value) : new Date());
  const datePickerRef = useRef(null);

  // Close datepicker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Format date for display
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Format date for input value
  const formatValue = (date) => {
    if (!date) return '';
    const d = new Date(date);
    // Format YYYY-MM-DD tanpa konversi zona waktu
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week of first day in month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Previous month
  const prevMonth = () => {
    setCurrentMonth(prev => {
      const prevMonth = new Date(prev);
      prevMonth.setMonth(prev.getMonth() - 1);
      return prevMonth;
    });
  };

  // Next month
  const nextMonth = () => {
    setCurrentMonth(prev => {
      const nextMonth = new Date(prev);
      nextMonth.setMonth(prev.getMonth() + 1);
      return nextMonth;
    });
  };

  // Select date
  const selectDate = (day) => {
    const selected = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    onChange(formatValue(selected));
    setIsOpen(false);
  };

  // Build calendar grid
  const buildCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    // Adjust for week starting on Monday (0 = Monday, ... 6 = Sunday)
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    
    const calendarDays = [];
    
    // Previous month days
    for (let i = 0; i < adjustedFirstDay; i++) {
      calendarDays.push({ day: null, isCurrentMonth: false });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected = value && formatValue(date) === value;
      const isToday = formatValue(date) === formatValue(new Date());
      
      calendarDays.push({ 
        day, 
        isCurrentMonth: true, 
        isSelected,
        isToday
      });
    }
    
    // Fill remaining cells
    const totalCells = Math.ceil(calendarDays.length / 7) * 7;
    for (let i = calendarDays.length; i < totalCells; i++) {
      calendarDays.push({ day: null, isCurrentMonth: false });
    }
    
    // Group days by weeks
    const weeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeks.push(calendarDays.slice(i, i + 7));
    }
    
    return weeks;
  };

  // Month names
  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  // Day names
  const dayNames = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

  return (
    <div className="mb-4" ref={datePickerRef}>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          type="text" 
          id={name}
          name={name}
          readOnly
          value={value ? formatDate(value) : ''}
          placeholder={placeholder}
          required={required}
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        </div>
        
        {isOpen && (
          <div className="absolute mt-1 w-64 bg-white rounded-md shadow-lg z-20">
            <div className="p-2">
              {/* Calendar header */}
              <div className="flex justify-between items-center mb-2">
                <button
                  type="button"
                  className="p-1 hover:bg-gray-100 rounded"
                  onClick={prevMonth}
                >
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="font-medium">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </div>
                <button
                  type="button"
                  className="p-1 hover:bg-gray-100 rounded"
                  onClick={nextMonth}
                >
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              {/* Days of week */}
              <div className="grid grid-cols-7 mb-1">
                {dayNames.map((day, index) => (
                  <div key={index} className="text-center text-xs font-medium text-gray-500 py-1">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Calendar grid */}
              {buildCalendar().map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7">
                  {week.map((day, dayIndex) => (
                    <div 
                      key={dayIndex} 
                      className={`py-1 text-center text-sm ${
                        !day.isCurrentMonth
                          ? 'text-gray-300' 
                          : day.isSelected
                            ? 'bg-orange-100 text-orange-800'
                            : day.isToday
                              ? 'text-orange-500 font-bold'
                              : 'text-gray-700 hover:bg-gray-100'
                      } cursor-pointer`}
                      onClick={() => day.isCurrentMonth && day.day && selectDate(day.day)}
                    >
                      {day.day}
                    </div>
                  ))}
                </div>
              ))}
              
              {/* Today button */}
              <div className="mt-2 text-center">
                <button
                  type="button"
                  className="text-sm text-orange-500 hover:underline focus:outline-none"
                  onClick={() => {
                    const today = new Date();
                    setCurrentMonth(today);
                    onChange(formatValue(today));
                    setIsOpen(false);
                  }}
                >
                  Hari Ini
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

DatePicker.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool
};

export default DatePicker;