import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell, Tooltip as PieTooltip } from "recharts";
import { BarChart, Bar, Legend } from "recharts";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCards from "../components/features/dashboard/DashboardCards";
import { getPeriod } from "../utils/api";
import PeriodDropdown from "../components/common/PeriodDropdown";
import { useNavigate } from "react-router-dom";

const periodData = [
  {
    id: 1,
    name: "period1",
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 2,
    name: "period2",
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    id: 3,
    name: "period3",
    startDate: new Date(),
    endDate: new Date(),
  },
];

const Dashboard = () => {
  const [reportData, setReportData] = useState(null);
  const navigate = useNavigate();
  // Data for profit/loss chart
  const profitData = [
    { name: "Periode 1", value: 20000000 },
    { name: "Periode 2", value: 34000000 },
    { name: "Periode 3", value: 22000000 },
  ];

  // Data for expense ratio chart
  const expenseData = [
    {
      name: "Harga Pokok Penjualan",
      value: 580000,
      percentage: "40.50%",
      color: "#7c82ec",
    },
    {
      name: "Biaya Operasional",
      value: 750000,
      percentage: "53.06%",
      color: "#f87d8e",
    },
    {
      name: "Biaya Lain-lain & Pajak",
      value: 92000,
      percentage: "6.44%",
      color: "#7fe7f3",
    },
  ];

  // Data for income expense comparison
  const comparisonData = [
    { name: "Nominal (Rp)", Pendapatan: 22000000, Pengeluaran: 14220000 },
  ];

  // Summary data for dashboard cards
  const summaryData = {
    totalIncome: 22000000,
    totalExpense: 14220000,
    netProfit: 7780000,
    profitMargin: "35.36%",
  };

  const [currentPeriod, setCurrentPeriod] = useState(null);

  return (
    <DashboardLayout title="Dashboard">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 px-10">
          Laba Rugi Antar Periode
        </h1>
        <div className="p-4"></div>
        {/* Dashboard cards component */}
        <DashboardCards data={summaryData} />

        {/* Profit/Loss Chart */}
        <div className="px-10">
          <div className="bg-white p-4 rounded-lg shadow mb-16 ">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={profitData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  name="Laba Bersih"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Current Period */}
        <div className="mb-6 px-10">
          <h2 className="text-xl font-bold mb-4 ">Periode Saat Ini</h2>

          {/* Wrapper dengan relative untuk dropdown */}

          <PeriodDropdown
            currentPeriod={currentPeriod}
            setCurrentPeriod={setCurrentPeriod}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-13 px-10">
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
                    <PieTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2">
                {expenseData.map((item, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex items-center mb-1">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {new Intl.NumberFormat("id-ID").format(item.value)} (
                      {item.percentage})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Income & Expense Ratio */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">
              Rasio Pendapatan & Pengeluaran
            </h2>
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
