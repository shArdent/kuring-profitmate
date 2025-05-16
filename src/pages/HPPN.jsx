import React, { useEffect, useState } from "react";
import Sidebar from "../components/ui/Sidebar";
import PeriodDropdown from "../components/common/PeriodDropdown";
import PricingCalculator from "../components/features/hppn/PricingCalculator";
import apiClient from "../utils/axios";
import toast from "react-hot-toast";
import { formatCurrency } from "../utils/formatter";

const HPPN = () => {
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const [sellingData, setSellingData] = useState(null);

  const handleGetSellingData = async () => {
    try {
      const {
        data: { data },
      } = await apiClient.get(`/selling/a/${currentPeriod.id}`);

      setSellingData(data);
      console.log(data);
    } catch (error) {
      setSellingData(null);
      toast.error("Data HPPn belum ditambahkan");
    }
  };

  useEffect(() => {
    if (currentPeriod) {
      handleGetSellingData();
    }
  }, [currentPeriod]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-50 ml-6 mt-9">
        <h1 className="text-2xl font-bold mb-4 p-3 px-10 ">Harga Pokok Penjualan</h1>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold px-10 py-3">Periode Saat Ini</h2>
          <div className="w full max-w- px-10 mt-1 ">
            <PeriodDropdown  currentPeriod={currentPeriod}
              setCurrentPeriod={setCurrentPeriod} />
          </div>
        </div>

        {/* Using the existing PricingCalculator component */}
        <PricingCalculator period={currentPeriod} hppnData={sellingData} handleGetData={handleGetSellingData} />

        {/* Display calculation results */}
        {sellingData && (
          <div className="px-10 mb-10">
            <h2 className="text-xl font-bold mb-6">Hasil Perhitungan</h2>

            <div className="space-y-4">
              <div className="bg-blue-500 text-white p-4 rounded flex justify-between items-center">
                <span>Harga Pokok Produksi</span>
                <span className="font-semibold">
                  Rp. {formatCurrency(sellingData.hargaPokokProduksi)}
                </span>
              </div>

              <div className="bg-blue-500 text-white p-4 rounded flex justify-between items-center">
                <span>Harga Pokok Penjualan</span>
                <span className="font-semibold">
                  Rp. {formatCurrency(sellingData.hargaPokokPenjualan)}
                </span>
              </div>

              <div className="bg-blue-500 text-white p-4 rounded flex justify-between items-center">
                <span>HPPenjualan Per Produk</span>
                <span className="font-semibold">
                  Rp. {formatCurrency(sellingData.hargaPokokPenjualanPerUnit)}
                </span>
              </div>

              <div className="bg-blue-500 text-white p-4 rounded flex justify-between items-center">
                <span>Besar Keuntungan</span>
                <span className="font-semibold">
                  RP. {formatCurrency(sellingData.besarKeuntungan)}
                </span>
              </div>

              <div className="bg-blue-500 text-white p-4 rounded flex justify-between items-center">
                <span>Harga Jual Per Produk</span>
                <span className="font-semibold">
                  RP. {formatCurrency(sellingData.hargaJualPerProduk)}
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HPPN;
