import React from 'react';

const TextField = ({
  label,
  placeholder = "",
  value,
  onChange,
  multiline = false,
  rows = 4,
  fullWidth = true,
  className = ""
}) => {
  const baseClasses = `
    px-4 py-2 
    bg-white 
    border border-gray-300 
    rounded-md
    focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-500
    transition-all duration-200
    ${fullWidth ? 'w-full' : 'w-auto'}
    ${className}
  `;
  
  return (
    <div className={`mb-4 ${fullWidth ? 'w-full' : 'w-auto'}`}>
      {label && (
        <label className="block mb-2 text-gray-800 font-medium">
          {label}
        </label>
      )}
      
      {multiline ? (
        <textarea
          className={baseClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
        ></textarea>
      ) : (
        <input
          type="text"
          className={baseClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};


export default TextField;