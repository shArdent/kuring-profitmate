import { useEffect, useState } from "react";
import apiClient from "../../../utils/axios";
import toast from "react-hot-toast";
import { formatCurrency } from "../../../utils/formatter";

const PricingCalculator = ({ period, hppnData, handleGetData }) => {
  const [payload, setPayload] = useState({
    periodesId: period ? period.id : "",
    productCount: hppnData ? hppnData.jumlahProduk : "",
    initialInventory: hppnData ? hppnData.persediaanAwal : "",
    endingInventory: hppnData ? hppnData.persediaanAkhir : "",
    profitMargin: hppnData ? hppnData.marginUntung : "",
  });

  useEffect(() => {
    console.log(hppnData);
    if (period) {
      setPayload(() => ({
        productCount: hppnData ? hppnData.jumlahProduk : "",
        initialInventory: hppnData ? hppnData.persediaanAwal : "",
        endingInventory: hppnData ? hppnData.persediaanAkhir : "",
        profitMargin: hppnData ? hppnData.marginUntung * 100 : "",
        periodesId: period.id,
      }));
    }
  }, [period, hppnData]);

  const handleCalculate = async () => {
    const values = {
      ...payload,
      profitMargin: payload.profitMargin / 100,
    };

    console.log(values);

    if (
      !period ||
      !payload.endingInventory ||
      !payload.initialInventory ||
      !payload.productCount ||
      !payload.profitMargin
    ) {
      toast.error("Data harus diisi terlebih dahulu");
      return;
    }

    try {
      if (!hppnData) {
        await apiClient.post(`/selling`, values);
        toast.success("Berhasil Menambah data harga pokok penjualan");
        await handleGetData();
      }

      await apiClient.patch(`/selling/${hppnData.id}`, values);
      toast.success("Berhasil mengubah data harga pokok penjualan");
      await handleGetData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4 px-10 mt-8">
        {/* Left Column */}
        <div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-4">
              Jumlah Produk Dihasilkan
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-3"
              placeholder="Masukan Jumlah Produk"
              value={payload.productCount}
              onChange={(e) =>
                setPayload((prev) => ({
                  ...prev,
                  productCount: Number(e.target.value),
                }))
              }
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-4">
              Nominal Persediaan Awal
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-3 pl-10"
                placeholder="0"
                value={payload.initialInventory}
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    initialInventory: e.target.value,
                  }))
                }
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                Rp.
              </span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-4">
              Margin Keuntungan
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-3 "
                placeholder="0"
                value={payload.profitMargin}
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    profitMargin: Number(e.target.value),
                  }))
                }
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-4">
              Nominal Persediaan Akhir
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-3 pl-10"
                placeholder="0"
                value={payload.endingInventory}
                onChange={(e) =>
                  setPayload((prev) => ({
                    ...prev,
                    endingInventory: e.target.value,
                  }))
                }
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                Rp.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 px-10 py-5">
        <button
          onClick={handleCalculate}
          className="bg-orange-400 hover:bg-orange-500 text-white font-medium py-2 px-8 rounded"
        >
          Hitung
        </button>
      </div>

      {hppnData && (
        <div className="px-10 mb-10">
          <h2 className="text-xl font-semibold mb-4">Hasil Perhitungan</h2>
          <div className="grid md:grid-cols-3 gap-6 ">
            <div className="bg-blue-100 rounded-lg p-4 shadow">
              <p className="font-semibold">Harga Pokok Penjualan</p>
              <p className="text-lg font-bold text-blue-800">
                Rp. {formatCurrency(hppnData.hargaPokokPenjualan)}
              </p>
            </div>
            <div className="bg-blue-100 rounded-lg p-4 shadow">
              <p className="font-semibold">HPP per Produk</p>
              <p className="text-lg font-bold text-blue-800">
                Rp. {formatCurrency(hppnData.hargaPokokPenjualanPerUnit)}
              </p>
            </div>
            <div className="bg-blue-100 rounded-lg p-4 shadow">
              <p className="font-semibold">Harga Jual</p>
              <p className="text-lg font-bold text-blue-800">
                Rp. {formatCurrency(hppnData.hargaJualPerProduk)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PricingCalculator;
