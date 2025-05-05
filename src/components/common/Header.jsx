// src/components/common/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ showAuthLinks = true }) => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-8 w-8 bg-blue-600 flex items-center justify-center text-white mr-2">
            <span className="text-sm">📊</span>
          </div>
          <span className="font-semibold">ProfiteMate</span>
        </div>
        
        {showAuthLinks && (
          <div>
            <Link to="/register" className="mr-4 text-sm">Daftar</Link>
            <Link to="/login" className="text-blue-600 text-sm">Masuk</Link>
          </div>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  showAuthLinks: PropTypes.bool
};

export default Header;