// src/components/auth/RegisterForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementasi register akan ditambahkan di sini
    console.log('Register form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
          Nama Lengkap
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          placeholder="Masukkan nama lengkap anda"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange"
        />
      </div>
      
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Nama Usaha
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Masukkan nama usaha anda"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Alamat Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Masukkan email anda"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange"
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Masukkan password anda"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange"
        />
      </div>
      
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Konfirmasi Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Konfirmasi password anda"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange"
        />
      </div>
      
      <button
        type="submit"
        className="w-full py-2 px-4 mt-4 bg-orange-btn text-white font-medium rounded-md hover:bg-orange-btn-hover transition-colors"
      >
        Daftar
      </button>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-orange hover:underline font-medium">
            Masuk
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;