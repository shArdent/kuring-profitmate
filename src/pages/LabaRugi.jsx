import React, { useState } from 'react';
import Sidebar from '../components/ui/Sidebar';
import PeriodDropdown from '../components/common/PeriodDropdown';
import { parseISO } from 'date-fns';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import Card from '../components/ui/Card';
import SummaryBox from '../components/ui/SummaryBox';

const LabaRugi = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  // Data Periode
  const periodData = [
    {
      name: 'Q1 2024',
      startDate: parseISO('2024-01-01'),
      endDate: parseISO('2024-03-31')
    },
    {
      name: 'Q2 2024',
      startDate: parseISO('2024-04-01'),
      endDate: parseISO('2024-06-30')
    }
  ];

  // Data Chart
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

  // Data Tabel
  const tableData = [
    { id: 1, tanggal: 'Jan 31, 2024', persediaan: '2.500', produk: '1000', pendapatan: 'Rp. 45.000.000', hppn: 'Rp. 64.285.725', labaRugi: 'Rp. 19.285.710' },
    { id: 2, tanggal: 'Feb 29, 2024', persediaan: '2.500', produk: '1.500', pendapatan: 'Rp. 67.500.000', hppn: 'Rp. 25.741.286', labaRugi: 'Rp. 28.928.565' },
    { id: 3, tanggal: 'Mar 31, 2024', persediaan: '2.500', produk: '2.000', pendapatan: 'Rp. 90.000.000', hppn: 'Rp. 38.751.435', labaRugi: 'Rp. 38.571.420' },
    { id: 4, tanggal: 'Apr 30, 2024', persediaan: '2.500', produk: '2.500', pendapatan: 'Rp. 112.500.000', hppn: 'Rp. 51.428.571', labaRugi: 'Rp. 48.214.275' },
    { id: 5, tanggal: 'Mei 31, 2024', persediaan: '2.500', produk: '2.500', pendapatan: 'Rp. 112.500.000', hppn: 'Rp. 64.285.725', labaRugi: 'Rp. 48.214.275' },
    { id: 6, tanggal: 'Jun 30, 2024', persediaan: '3.000', produk: '2.800', pendapatan: 'Rp. 126.000.000', hppn: 'Rp. 77.142.870', labaRugi: 'Rp. 48.857.130' }
  ];

  const columns = [
    { key: 'tanggal', header: 'Tanggal', width: '15%' },
    { key: 'persediaan', header: 'Persediaan Produk', width: '15%' },
    { key: 'produk', header: 'Produk Terjual', width: '15%' },
    { key: 'pendapatan', header: 'Pendapatan', width: '20%' },
    { key: 'hppn', header: 'HPPn', width: '15%' },
    { key: 'labaRugi', header: 'Laba/Rugi', width: '20%' }
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold px-10">Laporan Laba/Rugi</h1>

        {/* Period Picker */}
        <div className="mb-8 w-[320px]">
          <PeriodDropdown
            periodData={periodData}
            onChange={(value) => setSelectedPeriod(value)}
          />
        </div>

        {/* Grafik */}
<div className="mb-8 mx-auto bg-white rounded-lg shadow h-[500px] w-full max-w-5xl px-6">
          <Line
            data={{
              labels: profitLossData.map((d) => d.tanggal),
              datasets: [
                {
                  label: 'Pendapatan',
                  borderColor: '#22d3ee',
                  backgroundColor: '#22d3ee',
                  data: profitLossData.map((d) =>
                    Number(d.pendapatan.replace(/[^0-9,-]+/g, ''))
                  )
                },
                {
                  label: 'HPPn',
                  borderColor: '#f87171',
                  backgroundColor: '#f87171',
                  data: profitLossData.map((d) =>
                    Number(d.hppn.replace(/[^0-9,-]+/g, ''))
                  )
                },
                {
                  label: 'Laba Rugi',
                  borderColor: '#c084fc',
                  backgroundColor: '#c084fc',
                  data: profitLossData.map((d) =>
                    Number(d.labaRugi.replace(/[^0-9,-]+/g, ''))
                  )
                }
              ]
            }}
          />
        </div>

        {/* Ringkasan */}
        <div className="grid grid-cols-3 gap-4 px-10 mb-8">
          <SummaryBox label="Laba Operasional" value={9220000} />
          <SummaryBox label="Laba Kotor" value={16820000} />
          <SummaryBox label="Laba Bersih" value={8298000} />
        </div>

        {/* Kartu Detail */}
        <div className="grid grid-cols-2 gap-6 px-10">
          <Card
            title="Pendapatan"
            items={[{ label: 'Penjualan Produk', value: 22620000 }]}
            total={22620000}
            totalColor="text-green-600"
          />
          <Card
            title="Beban Operasional"
            items={[
              { label: 'Sewa Pabrik', value: 3800000 },
              { label: 'Penyusutan Mesin', value: 1800000 },
              { label: 'Gaji Karyawan', value: 2000000 }
            ]}
            total={7600000}
            totalColor="text-red-600"
          />
          <Card
            title="Harga Pokok Penjualan (HPPn)"
            items={[
              { label: 'Persediaan Awal', value: 800000 },
              { label: 'Harga Pokok Produksi', value: 5800000 },
              { label: 'Persediaan Akhir', value: 800000 }
            ]}
            total={5800000}
            totalColor="text-red-600"
          />
          <Card
            title="Beban Lain-lain & Pajak"
            items={[{ label: 'Pajak', value: 992000 }]}
            total={992000}
            totalColor="text-red-600"
          />
        </div>

      </div>
    </div>
  );
};

export default LabaRugi;
