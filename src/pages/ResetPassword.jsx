import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../components/common/Header';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi password
    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak sama');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password harus memiliki minimal 6 karakter');
      return;
    }
    
    // Reset password logic
    console.log('Resetting password with token:', token);
    console.log('New password:', formData.password);
    
    // Redirect ke halaman sukses
    navigate('/reset-password-success');
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      
      <div className="flex-grow flex items-center justify-center px-4">
      <div className="bg-white px-10 py-8 rounded-md shadow-md w-full max-w-2xl min-h-[480px]">
          <h2 className="text-xl font-semibold text-center mb-6">Buat Password Baru</h2>
          
          <p className="text-center text-sm font-semibold mb-6 mt-8">
            Kata sandi baru Anda harus berbeda dari kata sandi Anda sebelumnya!
          </p>
          
          {error && (
            <div className="bg-red-50 text-red-500 px-4 py-2 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4 mt-8 px-8 ">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
                Password Baru
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Masukkan password baru anda"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
            
            <div className="mb-6 mt-8 px-8">
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1">
                Konfirmasi Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Konfirmasi password baru anda"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 mt-4 border border-gray-300 rounded-md focus:outline-none"
              />
            </div>
            
            <button
              type="submit"
              className="w-lg py-2 px-4 mt-10 bg-orange-400 text-white font-medium rounded-full hover:bg-orange-500 transition-colors mx-auto block "
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;