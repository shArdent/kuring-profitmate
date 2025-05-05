import React, { useState } from 'react';
import Sidebar from '../components/ui/Sidebar';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Settings = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    idTransaksi: '',
    namaUsaha: '',
    passwordLama: '',
    passwordBaru: '',
    konfirmasiPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    // You would typically send this data to an API
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Pengaturan</h1>
        
        <form onSubmit={handleSubmit} className="max-w-full">
          <Input 
            label="Nama Pengguna"
            name="nama"
            placeholder="Masukan Nama Pengguna"
            value={formData.nama}
            onChange={handleChange}
          />
          
          <Input 
            label="Email"
            type="email"
            name="email"
            placeholder="Masukan Email"
            value={formData.email}
            onChange={handleChange}
          />
          
          <Input 
            label="Id Transaksi"
            name="idTransaksi"
            placeholder="Masukan Id Transaksi"
            value={formData.idTransaksi}
            onChange={handleChange}
          />
          
          <Input 
            label="Nama Usaha"
            name="namaUsaha"
            placeholder="Masukan Nama Usaha"
            value={formData.namaUsaha}
            onChange={handleChange}
          />
          
          <Input 
            label="Password Lama"
            type="password"
            name="passwordLama"
            placeholder="Masukan Password Lama"
            value={formData.passwordLama}
            onChange={handleChange}
          />
          
          <Input 
            label="Password Baru"
            type="password"
            name="passwordBaru"
            placeholder="Masukan Password Baru"
            value={formData.passwordBaru}
            onChange={handleChange}
          />
          
          <Input 
            label="Konfirmasi Password"
            type="password"
            name="konfirmasiPassword"
            placeholder="Konfirmasi Password"
            value={formData.konfirmasiPassword}
            onChange={handleChange}
          />
          
          <div className="mt-6">
            <Button type="submit" variant="primary">
              Simpan
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;