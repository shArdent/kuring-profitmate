import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/ui/Sidebar';
import DatePicker from '../components/ui/DatePicker';
import Button from '../components/ui/Button';
import TextField from '../components/ui/TextField';

const TransactionDetail = () => {
  const { id } = useParams();

  const [date, setDate] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setTransactionId(id);
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ date, transactionId, description });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Detail Transaksi</h1>

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
          {/* Tanggal */}
          <DatePicker
            label="Tanggal"
            value={date}
            onChange={setDate}
            name="date"
            placeholder="Pilih Periode"
          />

          {/* ID Transaksi langsung pakai input biasa */}
          <div className="mb-4 w-full">
            <label className="block mb-2 text-gray-800 font-medium">
              ID Transaksi
            </label>
            <input
              type="text"
              className="
                px-4 py-2 
                bg-white 
                border border-gray-300 
                rounded-md
                focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-500
                transition-all duration-200
                w-full
              "
              placeholder="Masukkan ID Transaksi"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
          </div>

          {/* Deskripsi Transaksi tetap pakai TextField */}
          <TextField
            label="Deskripsi Transaksi"
            placeholder="Masukkan Deskripsi Transaksi"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={5}
          />

          <div className="pt-4 flex gap-4">
            <Button type="submit" variant="primary">Simpan</Button>
            <Button type="button" variant="outline" onClick={() => window.history.back()}>Batal</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionDetail;
