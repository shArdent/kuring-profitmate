import React, { useState } from 'react';
import { Line } from 'recharts';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart } from 'recharts';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardCards from '../components/features/dashboard/DashboardCards';

const Dashboard = () => {
  // Data for profit/loss chart
  const profitData = [
    { name: 'Periode 1', value: 20000000 },
    { name: 'Periode 2', value: 34000000 },
    { name: 'Periode 3', value: 22000000 },
  ];

  // Data for expense ratio chart
  const expenseData = [
    { name: 'Harga Pokok Penjualan', value: 580000, percentage: '40.50%', color: '#7c82ec' },
    { name: 'Biaya Operasional', value: 750000, percentage: '53.06%', color: '#f87d8e' },
    { name: 'Biaya Lain-lain & Pajak', value: 92000, percentage: '6.44%', color: '#7fe7f3' },
  ];

  // Data for income expense comparison
  const comparisonData = [
    { name: 'Nominal (Rp)', Pendapatan: 22000000, Pengeluaran: 14220000 },
  ];

  // State for current period dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState({
    name: 'Periode 4',
    range: 'Maret 2024 - Juni 2024'
  });

  const periods = [
    { name: 'Periode 3', range: 'Jan 2024 - Feb 2024' },
    { name: 'Periode 2', range: 'Oct 2023 - Dec 2023' },
    { name: 'Periode 1', range: 'Jul 2023 - Sep 2023' }
  ];

  const handlePeriodChange = (period) => {
    setCurrentPeriod(period);
    setIsDropdownOpen(false);
  };

  // Summary data for dashboard cards
  const summaryData = {
    totalIncome: 22000000,
    totalExpense: 14220000,
    netProfit: 7780000,
    profitMargin: '35.36%'
  };

  return (
    <DashboardLayout title="Dashboard">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Laba Rugi Antar Periode</h1>
        
        {/* Dashboard cards component */}
        <DashboardCards data={summaryData} />
        
        {/* Profit/Loss Chart */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={profitData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} name="Laba Bersih" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Current Period */}
        <h2 className="text-xl font-bold mb-4">Periode Saat Ini</h2>
        <div className="bg-blue-500 text-white p-4 rounded-lg mb-6 relative">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div>
              <h3 className="text-lg font-semibold">{currentPeriod.name}</h3>
              <p>{currentPeriod.range}</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 bg-white text-gray-800 rounded-b-lg shadow-lg z-10">
              <ul>
                {periods.map((period, index) => (
                  <li 
                    key={index} 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handlePeriodChange(period)}
                  >
                    {period.name}: {period.range}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expense Ratio */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Rasio Pengeluaran</h2>
            <div className="flex items-center">
              <div className="w-1/2">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={0}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={false}
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2">
                {expenseData.map((item, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex items-center mb-1">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Intl.NumberFormat('id-ID').format(item.value)} ({item.percentage})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Income & Expense Ratio */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Rasio Pendapatan & Pengeluaran</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Pendapatan" fill="#8884d8" />
                <Bar dataKey="Pengeluaran" fill="#f87d8e" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;