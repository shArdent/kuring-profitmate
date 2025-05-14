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
import { getPeriod, getReport } from "../utils/api";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Navigate, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [periods, setPeriods] = useState(null);
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

  // State for current period dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState(null);

  const handlePeriodChange = (period) => {
    setCurrentPeriod(period);

    console.log(period.id);
    setIsDropdownOpen(false);
  };

  const handleGetReport = async () => {
    try {
      const resData = await getReport(currentPeriod.id);
      setReportData(resData);
    } catch (error) {

      if (error.status === 401) navigate("/login");
      if (error.status === 404) alert("data dengan periode tersebut tidak ditemukan");
    }
  };

  useEffect(() => {
    if (currentPeriod) handleGetReport();
  }, [currentPeriod]);

  // Summary data for dashboard cards
  const summaryData = {
    totalIncome: 22000000,
    totalExpense: 14220000,
    netProfit: 7780000,
    profitMargin: "35.36%",
  };

  const getUserPeriod = async () => {
    try {
      const data = await getPeriod();
      setPeriods(data);
    } catch (error) {
      navigate("/login");
    } 
  };

  useEffect(() => {
    getUserPeriod();
  }, []);

  return (
    <DashboardLayout title="Dashboard">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 px-10">
          Laba Rugi Antar Periode
        </h1>
        <div className="bg-gray-100 p-4"></div>
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
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4 px-10 ">Periode Saat Ini</h2>

          {/* Wrapper dengan relative untuk dropdown */}
          <div className="relative px-10">
            {/* Box biru sebagai trigger */}
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-blue-500 text-white p-4 rounded-lg mt-8 flex items-center justify-between cursor-pointer"
            >
              <div>
                {currentPeriod ? (
                  <>
                    <h3 className="text-lg font-semibold">
                      {currentPeriod.name}
                    </h3>
                    <p>
                      Pilih periode
                      {format(currentPeriod.startDate, "MMM yyy", {
                        locale: id,
                      })}{" "}
                      -{" "}
                      {format(currentPeriod.startDate, "MMM yyy", {
                        locale: id,
                      })}
                    </p>
                  </>
                ) : (
                  <h3 className="text-lg font-semibold">Pilih Periode</h3>
                )}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Dropdown, DIPINDAHKAN KE LUAR box biru */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 bg-white text-gray-800 rounded-b-lg shadow-lg z-10">
                <ul>
                  {periods.map((period, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handlePeriodChange(period)}
                    >
                      {period.name}:{" "}
                      {format(period.startDate, "MMM yyy", { locale: id })} -{" "}
                      {format(period.startDate, "MMM yyy", { locale: id })}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
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
