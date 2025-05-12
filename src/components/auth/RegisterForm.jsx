// src/components/auth/RegisterForm.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../utils/axios";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await apiClient.post("/auth/register", {
        name: formData.fullName,
        email: formData.email,
        password: formData.confirmPassword,
        businessName: formData.businessName,
      });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }

    console.log("Register form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-bold text-gray-700 mb-6 mt-12"
        >
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
        <label
          htmlFor="businessName"
          className="block text-sm font-bold text-gray-700 mb-6"
        >
          Nama Usaha
        </label>
        <input
          type="text"
          id="businessName"
          name="businessName"
          placeholder="Masukkan nama usaha anda"
          value={formData.businessName}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-bold text-gray-700 mb-6"
        >
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
        <label
          htmlFor="password"
          className="block text-sm font-bold text-gray-700 mb-6"
        >
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
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-bold text-gray-700 mb-6"
        >
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

      <div className="flex justify-center">
        <button
          type="submit"
          className="w-64 py-2 px-4 mt-4 bg-orange-400 text-white font-medium rounded-full hover:bg-orange-500 transition-colors"
        >
          Daftar
        </button>
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600 font-bold">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-orange hover:underline font-bold">
            Masuk
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
