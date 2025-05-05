// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementasi logika reset password
    console.log('Reset password requested for:', email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <EmailSent email={email} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      {/* Content */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-md shadow-sm w-full max-w-md">
          <h2 className="text-xl font-semibold text-center mb-6">Lupa Password</h2>
          
          <p className="text-center text-sm mb-6">
            Masukkan alamat email yang Anda gunakan untuk membuat akun, dan 
            kami akan mengirimkan instruksi untuk mengatur ulang kata sandi Anda 
            melalui email
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Alamat Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email anda"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-2 px-4 bg-orange-400 text-white font-medium rounded-md hover:bg-orange-500 transition-colors"
            >
              Kirim Email
            </button>
          </form>
          
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Ingat password? <Link to="/login" className="text-orange-500 hover:underline">Masuk</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Komponen Email Terkirim
const EmailSent = ({ email }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      {/* Content */}
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-md shadow-sm w-full max-w-md">
          <h2 className="text-xl font-semibold text-center mb-6">Email Terkirim</h2>
          
          <p className="text-center text-sm mb-6">
            Kami telah mengirimkan email ke alamat <span className="font-semibold">{email}</span>.<br/>
            Periksa kotak masuk email Anda dan ikuti petunjuk untuk mengatur ulang
            kata sandi akun Anda.
          </p>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600 mb-2">
              Tidak menerima email? <Link to="/forgot-password" className="text-orange-500 hover:underline">Kirim Ulang Email</Link>
            </p>
            <p className="text-sm text-gray-600">
              Alamat email salah? <Link to="/forgot-password" className="text-orange-500 hover:underline">Ubah Alamat Email</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;