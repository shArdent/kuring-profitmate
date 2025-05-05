import React from 'react';

const DashboardCards = ({ data }) => {
  const { totalIncome, totalExpense, netProfit, profitMargin } = data;
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Income Card */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Total Pendapatan</h3>
        <p className="text-xl font-bold text-gray-800">{formatCurrency(totalIncome)}</p>
        <div className="mt-2 flex items-center text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span className="text-xs">8.2% dari periode lalu</span>
        </div>
      </div>
      
      {/* Total Expense Card */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Total Pengeluaran</h3>
        <p className="text-xl font-bold text-gray-800">{formatCurrency(totalExpense)}</p>
        <div className="mt-2 flex items-center text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="text-xs">3.4% dari periode lalu</span>
        </div>
      </div>
      
      {/* Net Profit Card */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Laba Bersih</h3>
        <p className="text-xl font-bold text-gray-800">{formatCurrency(netProfit)}</p>
        <div className="mt-2 flex items-center text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span className="text-xs">12.3% dari periode lalu</span>
        </div>
      </div>
      
      {/* Profit Margin Card */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500 mb-1">Margin Keuntungan</h3>
        <p className="text-xl font-bold text-gray-800">{profitMargin}</p>
        <div className="mt-2 flex items-center text-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span className="text-xs">4.1% dari periode lalu</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;