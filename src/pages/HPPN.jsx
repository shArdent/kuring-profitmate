import React from 'react';
import Sidebar from '../components/ui/Sidebar';
import PricingCalculator from '../components/features/hppn/PricingCalculator';

const HPPN = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-8 px-10">Harga Pokok Penjualan</h1>
        <PricingCalculator />
      </main>
    </div>
  );
};

export default HPPN;
