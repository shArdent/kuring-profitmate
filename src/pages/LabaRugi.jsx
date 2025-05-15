import { useEffect, useState } from "react";
import Sidebar from "../components/ui/Sidebar";
import PeriodDropdown from "../components/common/PeriodDropdown";
import { parseISO } from "date-fns";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Card from "../components/ui/Card";
import SummaryBox from "../components/ui/SummaryBox";
import { getPeriod } from "../utils/api";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/axios";
import toast from "react-hot-toast";

const LabaRugi = () => {
  // Data Periode
  const periodData = [
    {
      name: "Q1 2024",
      startDate: parseISO("2024-01-01"),
      endDate: parseISO("2024-03-31"),
    },
    {
      name: "Q2 2024",
      startDate: parseISO("2024-04-01"),
      endDate: parseISO("2024-06-30"),
    },
  ];

  // Data Chart
  const profitLossData = [
    {
      tanggal: "Jan 31, 2024",
      pendapatan: "Rp. 45.000.000",
      hppn: "Rp. 64.285.725",
      labaRugi: "Rp. 19.285.710",
    },
    {
      tanggal: "Feb 29, 2024",
      pendapatan: "Rp. 67.500.000",
      hppn: "Rp. 25.741.286",
      labaRugi: "Rp. 28.928.565",
    },
    {
      tanggal: "Mar 31, 2024",
      pendapatan: "Rp. 90.000.000",
      hppn: "Rp. 38.751.435",
      labaRugi: "Rp. 38.571.420",
    },
    {
      tanggal: "Apr 30, 2024",
      pendapatan: "Rp. 112.500.000",
      hppn: "Rp. 51.428.571",
      labaRugi: "Rp. 48.214.275",
    },
    {
      tanggal: "Mei 31, 2024",
      pendapatan: "Rp. 112.500.000",
      hppn: "Rp. 64.285.725",
      labaRugi: "Rp. 48.214.275",
    },
    {
      tanggal: "Juni 30, 2024",
      pendapatan: "Rp. 126.000.000",
      hppn: "Rp. 77.142.870",
      labaRugi: "Rp. 48.857.130",
    },
  ];

  // Data Tabel
  const tableData = [
    {
      id: 1,
      tanggal: "Jan 31, 2024",
      persediaan: "2.500",
      produk: "1000",
      pendapatan: "Rp. 45.000.000",
      hppn: "Rp. 64.285.725",
      labaRugi: "Rp. 19.285.710",
    },
    {
      id: 2,
      tanggal: "Feb 29, 2024",
      persediaan: "2.500",
      produk: "1.500",
      pendapatan: "Rp. 67.500.000",
      hppn: "Rp. 25.741.286",
      labaRugi: "Rp. 28.928.565",
    },
    {
      id: 3,
      tanggal: "Mar 31, 2024",
      persediaan: "2.500",
      produk: "2.000",
      pendapatan: "Rp. 90.000.000",
      hppn: "Rp. 38.751.435",
      labaRugi: "Rp. 38.571.420",
    },
    {
      id: 4,
      tanggal: "Apr 30, 2024",
      persediaan: "2.500",
      produk: "2.500",
      pendapatan: "Rp. 112.500.000",
      hppn: "Rp. 51.428.571",
      labaRugi: "Rp. 48.214.275",
    },
    {
      id: 5,
      tanggal: "Mei 31, 2024",
      persediaan: "2.500",
      produk: "2.500",
      pendapatan: "Rp. 112.500.000",
      hppn: "Rp. 64.285.725",
      labaRugi: "Rp. 48.214.275",
    },
    {
      id: 6,
      tanggal: "Jun 30, 2024",
      persediaan: "3.000",
      produk: "2.800",
      pendapatan: "Rp. 126.000.000",
      hppn: "Rp. 77.142.870",
      labaRugi: "Rp. 48.857.130",
    },
  ];

  const columns = [
    { key: "tanggal", header: "Tanggal", width: "15%" },
    { key: "persediaan", header: "Persediaan Produk", width: "15%" },
    { key: "produk", header: "Produk Terjual", width: "15%" },
    { key: "pendapatan", header: "Pendapatan", width: "20%" },
    { key: "hppn", header: "HPPn", width: "15%" },
    { key: "labaRugi", header: "Laba/Rugi", width: "20%" },
  ];
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [report, setReport] = useState(null);

  const handleGetReport = async () => {
    try {
      const {
        data: { data },
      } = await apiClient.get(`/report/${currentPeriod.id}`);

      console.log(data);
      setReport(data);
    } catch (error) {
      toast.error("Data tidak ditemukan");
    }
  };

  useEffect(() => {
    if (currentPeriod) {
      handleGetReport();
    }
  }, [currentPeriod]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <div className="flex-1 p-6 bg-gray-50 px-10">
          <h1 className="text-2xl font-bold ">Laporan Laba/Rugi</h1>

          {/* Period Picker */}
          <div className="mb-8">
            <PeriodDropdown
              currentPeriod={currentPeriod}
              setCurrentPeriod={setCurrentPeriod}
            />
          </div>

          {/* Grafik */}
          <div className="mb-8 mx-auto bg-white rounded-lg shadow h-[500px] w-full max-w-5xl px-6">
            <Line
              data={{
                labels: profitLossData.map((d) => d.tanggal),
                datasets: [
                  {
                    label: "Pendapatan",
                    borderColor: "#22d3ee",
                    backgroundColor: "#22d3ee",
                    data: profitLossData.map((d) =>
                      Number(d.pendapatan.replace(/[^0-9,-]+/g, ""))
                    ),
                  },
                  {
                    label: "HPPn",
                    borderColor: "#f87171",
                    backgroundColor: "#f87171",
                    data: profitLossData.map((d) =>
                      Number(d.hppn.replace(/[^0-9,-]+/g, ""))
                    ),
                  },
                  {
                    label: "Laba Rugi",
                    borderColor: "#c084fc",
                    backgroundColor: "#c084fc",
                    data: profitLossData.map((d) =>
                      Number(d.labaRugi.replace(/[^0-9,-]+/g, ""))
                    ),
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>

        <div>
          {/* Ringkasan */}
          <div className="grid grid-cols-3 gap-4 px-10 mb-8">
            <SummaryBox
              label="Laba Operasional"
              value={report ? report.labaOperasional : 0}
            />
            <SummaryBox
              label="Laba Kotor"
              value={report ? report.labaKotor : 0}
            />
            <SummaryBox
              label="Laba Bersih"
              value={report ? report.labaBersih : 0}
            />
          </div>

          {/* Kartu Detail */}
          <div className="grid grid-cols-2 gap-6 px-10">
            <Card
              title="Pendapatan"
              items={report ? report.pendapatan.data : []}
              total={report ? report.pendapatan.total : 0}
              totalColor="text-green-600"
            />
            <Card
              title="Beban Operasional"
              items={report ? report.bebanOperasional.data : []}
              total={report ? report.bebanOperasional.total : 0}
              totalColor="text-red-600"
            />
            <Card
              title="Harga Pokok Penjualan (HPPn)"
              items={
                report
                  ? [
                      {
                        name: "Persediaan Awal",
                        amount: report.hargaPokokPenjualan.persediaanAwal,
                      },
                      {
                        name: "Harga Pokok Produksi",
                        amount: report.hargaPokokPenjualan.hargaPokokProduksi,
                      },
                      {
                        name: "Persediaan Akhir",
                        amount: report.hargaPokokPenjualan.persediaanAkhir,
                      },
                    ]
                  : []
              }
              total={report ? report.hargaPokokPenjualan.total : 0}
              totalColor="text-red-600"
            />
            <Card
              title="Beban Lain-lain & Pajak"
              items={report ? report.bebanLain.data : []}
              total={report ? report.bebanLain.total : 0}
              totalColor="text-red-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabaRugi;
