import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  type = 'button', 
  onClick, 
  variant = 'primary', 
  fullWidth = false,
  disabled = false 
}) => {
  const baseClasses = "py-2 px-4 rounded-md font-medium transition-colors";
  const widthClasses = fullWidth ? "w-full" : "";
  
  const variantClasses = {
    primary: "bg-orange-400 hover:bg-orange-500 text-white",
    outline: "border border-orange-400 text-orange-400 hover:bg-orange-50",
    link: "text-orange-400 hover:underline bg-transparent"
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${widthClasses} ${variantClasses[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'outline', 'link']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool
};

export default Button;