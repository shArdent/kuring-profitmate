import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';

const ResetPasswordSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-md shadow-sm w-full max-w-md">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 text-green-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-center mb-4">Password Berhasil Diubah</h2>
          
          <p className="text-center text-sm mb-6">
            Password Anda telah berhasil diubah.<br />
            Silahkan masuk kembali menggunakan password baru Anda
          </p>
          
          <Link 
            to="/login"
            className="block w-full text-center py-2 px-4 text-red-500 font-medium hover:underline"
          >
            Masuk Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordSuccess;