import React, { useState } from 'react';
import Sidebar from '../components/ui/Sidebar';
import PeriodDropdown from '../components/common/PeriodDropdown';
import PricingCalculator from '../components/features/hppn/PricingCalculator';

const HPPN = () => {
  // Sample period data for the dropdown
  const periodData = [
    {
      id: 1,
      name: "Periode 1",
      startDate: new Date(2024, 0, 1), // Jan 2024
      endDate: new Date(2024, 2, 31),  // Mar 2024
    },
    {
      id: 2,
      name: "Periode 2",
      startDate: new Date(2024, 3, 1),  // Apr 2024
      endDate: new Date(2024, 5, 30),   // Jun 2024
    },
    {
      id: 3,
      name: "Periode 3",
      startDate: new Date(2024, 6, 1),  // Jul 2024
      endDate: new Date(2024, 8, 30),   // Sep 2024
    },
    {
      id: 4,
      name: "Periode 4",
      startDate: new Date(2024, 2, 1),  // Mar 2024
      endDate: new Date(2024, 5, 30),   // Jun 2024
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50">
        <h1 className="text-2xl font-bold mb-4 p-6 px-10">Harga Pokok Penjualan</h1>
        
        <div className="mb-6">
          <h2 className="text-lg font-medium px-10">Periode Saat Ini</h2>
          <PeriodDropdown periodData={periodData} />
        </div>

        {/* Using the existing PricingCalculator component */}
        <PricingCalculator />
        
        {/* Display calculation results */}
        <div className="px-10 mb-10">
          <h2 className="text-xl font-bold mb-6">Hasil Perhitungan</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-500 text-white p-4 rounded flex justify-between items-center">
              <span>Harga Pokok Produksi</span>
              <span className="font-semibold">Rp. 64.285.725</span>
            </div>
            
            <div className="bg-blue-500 text-white p-4 rounded flex justify-between items-center">
              <span>Harga Pokok Penjualan</span>
              <span className="font-semibold">Rp. 64.285.725</span>
            </div>
            
            <div className="bg-blue-500 text-white p-4 rounded flex justify-between items-center">
              <span>HPPenjualan Per Produk</span>
              <span className="font-semibold">Rp. 30.000</span>
            </div>
            
            <div className="bg-blue-500 text-white p-4 rounded flex justify-between items-center">
              <span>Besar Keuntungan</span>
              <span className="font-semibold">RP. 15.000</span>
            </div>
            
            <div className="bg-blue-500 text-white p-4 rounded flex justify-between items-center">
              <span>Harga Jual Per Produk</span>
              <span className="font-semibold">RP. 45.000</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HPPN;