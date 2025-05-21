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
import PeriodDropdown from "../components/common/PeriodDropdown";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import apiClient from "../utils/axios";

const Dashboard = () => {
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
  // const [dataLabaBersih, setDataLabaBersih] = useState(null);
  const [report, setReport] = useState(null);

  const dataLabaBersih = [
    {
      periodName: "Jan 2025",
      labaBersih: 2500000,
    },
    {
      periodName: "Feb 2025",
      labaBersih: 3200000,
    },
    {
      periodName: "Mar 2025",
      labaBersih: 2800000,
    },
    {
      periodName: "Apr 2025",
      labaBersih: 4000000,
    },
    {
      periodName: "Mei 2025",
      labaBersih: 3500000,
    },
  ];

  const handleGetLabaBersih = async () => {
    try {
      const {
        data: { data },
      } = await apiClient.get("/report/laba-bersih");
      // setDataLabaBersih(data);
    } catch (error) {
      toast.error("Gagal mendapatkan data laba bersih");
    }
  };

  const handleGetReport = async () => {
    try {
      const {
        data: { data },
      } = await apiClient.get(`/report/a/${currentPeriod.id}`);

      setReport(data);
    } catch (error) {
      console.log(error);
      toast.error("Data tidak ditemukan");
    }
  };

  useEffect(() => {
    handleGetLabaBersih();
  }, []);

  useEffect(() => {
    if (currentPeriod) {
      handleGetReport();
    }
  }, [currentPeriod]);

  return (
    <DashboardLayout title="Dashboard">
      <div className="p-6 mt-6">
        <h1 className="text-2xl font-bold mb-4 px-10">
          Laba Rugi Antar Periode
        </h1>
        <div className="p-4"></div>

        {/* Profit/Loss Chart */}
        <div className="px-10">
          <div className="bg-white p-4 rounded-lg shadow mb-16 ">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={dataLabaBersih}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="periodName" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="labaBersih"
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
            {report ? (
              <div className="flex items-center">
                <div className="w-1/2">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={report.expenseData}
                        cx="50%"
                        cy="50%"
                        innerRadius={0}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={false}
                      >
                        {report.expenseData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <PieTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-1/2">
                  {report.expenseData.map((item, index) => (
                    <div key={index} className="mb-2">
                      <div className="flex items-center mb-1">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Rp. {new Intl.NumberFormat("id-ID").format(item.value)}{" "}
                        ({item.percentage})
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <h1 className="text-center pt-10">Tidak ada data</h1>
            )}
          </div>

          {/* Income & Expense Ratio */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">
              Rasio Pendapatan & Pengeluaran
            </h2>
            {report ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={report.transactionGroup}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pendapatan" fill="#8884d8" />
                  <Bar dataKey="pengeluaran" fill="#f87d8e" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <h1 className="text-center pt-10">Tidak ada data</h1>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
