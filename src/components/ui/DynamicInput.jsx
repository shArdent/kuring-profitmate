import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

const DynamicInput = ({ 
  fields, 
  values, 
  onChange, 
  onAdd, 
  onRemove, 
  addButtonText = "Tambah Item", 
  title
}) => {
  const handleInputChange = (index, field, value) => {
    const newValues = [...values];
    newValues[index] = { ...newValues[index], [field.name]: value };
    onChange(newValues);
  };

  const handleAddItem = () => {
    const emptyItem = {};
    fields.forEach(field => {
      emptyItem[field.name] = '';
    });
    onAdd(emptyItem);
  };

  const handleRemoveItem = (index) => {
    onRemove(index);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      {title && (
        <h3 className="text-lg font-medium text-gray-700 mb-3">{title}</h3>
      )}

      {values.map((item, index) => (
        <div key={index} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0">
          <div className="flex justify-between items-center mb-2">
            <div className="font-medium text-gray-600">Item #{index + 1}</div>
            <button
              type="button"
              onClick={() => handleRemoveItem(index)}
              className="text-red-500 hover:text-red-700 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map((field) => (
              <div key={field.name} className={field.fullWidth ? "col-span-1 md:col-span-2" : ""}>
                <Input
                  label={field.label}
                  type={field.type || 'text'}
                  name={`${field.name}_${index}`}
                  value={item[field.name] || ''}
                  placeholder={field.placeholder}
                  required={field.required}
                  onChange={(e) => handleInputChange(index, field, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-4">
        <button
          type="button"
          onClick={handleAddItem}
          className="flex items-center text-orange-500 hover:text-orange-700 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          {addButtonText}
        </button>
      </div>
    </div>
  );
};

DynamicInput.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      placeholder: PropTypes.string,
      required: PropTypes.bool,
      fullWidth: PropTypes.bool
    })
  ).isRequired,
  values: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  addButtonText: PropTypes.string,
  title: PropTypes.string
};

export default DynamicInput;