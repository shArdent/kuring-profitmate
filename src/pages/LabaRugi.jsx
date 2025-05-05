import React, { useState } from 'react';
import DatePicker from '../components/ui/DatePicker';
import Button from '../components/ui/Button';
import Sidebar from '../components/ui/Sidebar';
import Table from '../components/ui/Table';
import ProfitLossChart from '../components/features/reports/ProfitLossChart';

const LabaRugi = () => {
  // Basic state
  const [periode, setPeriode] = useState('');
  const [jumlahProdukTerjual, setJumlahProdukTerjual] = useState('');
  
  // Sample data for the chart
  const profitLossData = [
    {
      tanggal: 'Jan 31, 2024',
      pendapatan: 'Rp. 45.000.000',
      hppn: 'Rp. 64.285.725',
      labaRugi: 'Rp. 19.285.710'
    },
    {
      tanggal: 'Feb 29, 2024',
      pendapatan: 'Rp. 67.500.000',
      hppn: 'Rp. 25.741.286',
      labaRugi: 'Rp. 28.928.565'
    },
    {
      tanggal: 'Mar 31, 2024',
      pendapatan: 'Rp. 90.000.000',
      hppn: 'Rp. 38.751.435',
      labaRugi: 'Rp. 38.571.420'
    },
    {
      tanggal: 'Apr 30, 2024',
      pendapatan: 'Rp. 112.500.000',
      hppn: 'Rp. 51.428.571',
      labaRugi: 'Rp. 48.214.275'
    },
    {
      tanggal: 'Mei 31, 2024',
      pendapatan: 'Rp. 112.500.000',
      hppn: 'Rp. 64.285.725',
      labaRugi: 'Rp. 48.214.275'
    },
    {
      tanggal: 'Juni 30, 2024',
      pendapatan: 'Rp. 126.000.000',
      hppn: 'Rp. 77.142.870',
      labaRugi: 'Rp. 48.857.130'
    }
  ];

  // Table data
  const tableData = [
    { id: 1, tanggal: 'Jan 31, 2024', persediaan: '2.500', produk: '1000', pendapatan: 'Rp. 45.000.000', hppn: 'Rp. 64.285.725', labaRugi: 'Rp. 19.285.710' },
    { id: 2, tanggal: 'Feb 29, 2024', persediaan: '2.500', produk: '1.500', pendapatan: 'Rp. 67.500.000', hppn: 'Rp. 25.741.286', labaRugi: 'Rp. 28.928.565' },
    { id: 3, tanggal: 'Mar 31, 2024', persediaan: '2.500', produk: '2.000', pendapatan: 'Rp. 90.000.000', hppn: 'Rp. 38.751.435', labaRugi: 'Rp. 38.571.420' },
    { id: 4, tanggal: 'Apr 30, 2024', persediaan: '2.500', produk: '2.500', pendapatan: 'Rp. 112.500.000', hppn: 'Rp. 51.428.571', labaRugi: 'Rp. 48.214.275' },
    { id: 5, tanggal: 'Mei 31, 2024', persediaan: '2.500', produk: '2.500', pendapatan: 'Rp. 112.500.000', hppn: 'Rp. 64.285.725', labaRugi: 'Rp. 48.214.275' },
    { id: 6, tanggal: 'Jun 30, 2024', persediaan: '3.000', produk: '2.800', pendapatan: 'Rp. 126.000.000', hppn: 'Rp. 77.142.870', labaRugi: 'Rp. 48.857.130' }
  ];

  // Table columns definition
  const columns = [
    { key: 'tanggal', header: 'Tanggal', width: '15%' },
    { key: 'persediaan', header: 'Persediaan Produk', width: '15%' },
    { key: 'produk', header: 'Produk Terjual', width: '15%' },
    { key: 'pendapatan', header: 'Pendapatan', width: '20%' },
    { key: 'hppn', header: 'HPPn', width: '15%' },
    { key: 'labaRugi', header: 'Laba/Rugi', width: '20%' }
  ];

  // Basic form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', periode, jumlahProdukTerjual);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar /> {/* Sidebar di sebelah kiri */}
      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">Laporan Laba/Rugi</h1>
        
        {/* Form */}
        <div className="mb-6">
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-6 mb-4">
            <div className="w-72">
              <DatePicker
                label="Periode"
                name="periode"
                value={periode}
                onChange={(value) => setPeriode(value)}
                placeholder="Pilih Periode"
              />
            </div>

            <div className="w-72">
              <label htmlFor="jumlahProduk" className="block text-sm font-medium text-gray-700 mb-1">
                Jumlah Produk Terjual
              </label>
              <input
                type="text"
                id="jumlahProduk"
                value={jumlahProdukTerjual}
                onChange={(e) => setJumlahProdukTerjual(e.target.value)}
                placeholder="Masukan jumlah produk terjual"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div className="flex items-end">
              <Button type="submit" variant="primary">
                Tampilkan
              </Button>
            </div>
          </form>
        </div>

        {/* Chart Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Grafik Laba/Rugi</h2>
          <ProfitLossChart data={profitLossData} />
        </div>

        {/* Table Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">Laporan Laba/Rugi</h2>
          <Table 
            columns={columns} 
            data={tableData} 
            emptyMessage="Tidak ada data laporan laba/rugi" 
          />
        </div>
      </div>
    </div>
  );
};

export default LabaRugi;