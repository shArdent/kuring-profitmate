import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../ui/Button';

const Popup = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title, 
  fields,
  values,
  onChange
}) => {
  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    onChange({ ...values, [field]: value });
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg border-2 border-gray-300 shadow-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-bold text-center mb-6">{title}</h2>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit(values);
        }}>
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label className="block text-base font-medium mb-1">
                {field.label}
              </label>
              <input
                type={field.type || 'text'}
                placeholder={field.placeholder}
                value={values[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                required={field.required}
              />
            </div>
          ))}
          
          <div className="flex gap-3 mt-6">
            <Button 
              type="button"
              variant="outline" 
              onClick={onClose}
              fullWidth
            >
              Batal
            </Button>
            <Button 
              type="submit"
              variant="primary"
              fullWidth
            >
              Tambahkan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

Popup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
      placeholder: PropTypes.string,
      required: PropTypes.bool
    })
  ).isRequired,
  values: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Popup;