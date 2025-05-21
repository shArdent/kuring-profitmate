// src/layouts/AuthLayout.jsx
import React from 'react';
import PropTypes from 'prop-types';

// Asumsikan ikon chart tersedia
import chartIcon from '../assets/images/chart-icon.png';

const AuthLayout = ({ children, title }) => {
  return (
    <div className="flex min-h-screen">
      {/* Left side - blue background */}
      <div className="hidden md:flex md:w-1/2 bg-[#789DBC] flex-col items-center justify-center text-white p-10">
        <div className="flex flex-col items-center max-w-md">
          <div className="mb-6 rounded-md flex items-center justify-center">
            {/* Fallback jika gambar tidak tersedia */}
            {chartIcon ? (
              <img src={chartIcon} alt="Chart Icon" className="w-full h-full" />
            ) : (
              <div className="text-4xl">📊</div>
            )}
          </div>
          <h1 className="text-2xl font-bold mb-2 text-center">Selamat Datang di ProfitMate</h1>
          <p className="text-center mt-6">
            Aplikasi web pemantauan laba rugi dan membantu laporan hasil keuangan secara otomatis dan efisien
          </p>
        </div>
      </div>
      
      {/* Right side - white background with form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <h2 className="text-xl font-bold text-center mb-6">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

export default AuthLayout;