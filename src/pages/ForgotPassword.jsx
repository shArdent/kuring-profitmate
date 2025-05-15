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
      <div className="bg-white px-10 py-8 rounded-md shadow-md w-full max-w-2xl min-h-[450px]">

          <h2 className="text-xl font-extrabold text-center mb-6">Lupa Password</h2>
          
          <div className="max-w-lg mx-auto">
          <p className="text-center  text-base font-semibold mb-6 mt-8">
            Masukkan alamat email yang Anda gunakan untuk membuat akun, dan 
            kami akan mengirimkan instruksi untuk mengatur ulang kata sandi Anda 
            melalui email
          </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4 max-w-lg mx-auto">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1 mt-8">
                Alamat Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email anda"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none mt-6"
              />
            </div>
            
            <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-4 px-4 bg-orange-400 text-white font-medium rounded-full hover:bg-orange-500 transition-colors mt-8 max-w-lg mx-auto"
            >
              Kirim Email
            </button>
            </div>
          </form>
          
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 font-semibold">
              Ingat password? <Link to="/login" className="text-orange-500 hover:underline ">Masuk</Link>
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
        <div className="bg-white px-10 py-8 rounded-md shadow-md w-full max-w-2xl min-h-[350px]">
          <h2 className="text-xl font-semibold text-center mb-6">Email Terkirim</h2>
          
          <p className="text-center  text-base font-semibold mb-8 mt-12">
            Kami telah mengirimkan email ke alamat <span className="font-semibold">{email}</span>.<br/>
            Periksa kotak masuk email Anda dan ikuti petunjuk untuk mengatur ulang
            kata sandi akun Anda.
          </p>
          
          <div className="text-left mt-12 ml-6">
            <p className="text-sm text-gray-600 mb-2">
              Tidak menerima email? <Link to="/forgot-password" className="text-orange-500 hover:underline">Kirim Ulang Email</Link>
            </p>
            <p className="text-sm text-gray-600 mt-8">
              Alamat email salah? <Link to="/forgot-password" className="text-orange-500 hover:underline">Ubah Alamat Email</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;