import React, { useState } from "react";

const PricingCalculator = () => {
  const [productCount, setProductCount] = useState("");
  const [initialInventory, setInitialInventory] = useState("");
  const [finalInventory, setFinalInventory] = useState("");
  const [marginProfit, setMarginProfit] = useState("50%");
  const [hpp, setHPP] = useState(null);

  const handleCalculate = () => {
    const jumlahProduk = parseFloat(productCount);
    const persAwal = parseFloat(initialInventory);
    const persAkhir = parseFloat(finalInventory);
    const margin = parseFloat(marginProfit) / 100;

    if (isNaN(jumlahProduk) || isNaN(persAwal) || isNaN(persAkhir)) {
      alert("Mohon isi semua field dengan angka yang valid.");
      return;
    }

    const hppPenjualan = persAwal - persAkhir;
    const hppPerProduk = hppPenjualan / jumlahProduk;
    const hargaJual = hppPerProduk * (1 + margin);

    setHPP({
      hppPenjualan,
      hppPerProduk,
      hargaJual,
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 px-10 mt-8">
        {/* Left Column */}
        <div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Jumlah Produk Dihasilkan
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded p-3"
              placeholder="Masukan Jumlah Produk"
              value={productCount}
              onChange={(e) => setProductCount(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Nominal Persediaan Awal
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-3 pl-10"
                placeholder="0"
                value={initialInventory}
                onChange={(e) => setInitialInventory(e.target.value)}
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
            <label className="block text-gray-700 font-semibold mb-2">
              Margin Keuntungan
            </label>
            <div className="relative">
              <select
                className="w-full border border-gray-300 rounded p-3 appearance-none pr-10"
                value={marginProfit}
                onChange={(e) => setMarginProfit(e.target.value)}
              >
                <option value="50%">50%</option>
                <option value="60%">60%</option>
                <option value="75%">75%</option>
                <option value="100%">100%</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Nominal Persediaan Akhir
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-300 rounded p-3 pl-10"
                placeholder="0"
                value={finalInventory}
                onChange={(e) => setFinalInventory(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                Rp.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 px-10">
        <button
          onClick={handleCalculate}
          className="bg-orange-400 hover:bg-orange-500 text-white font-medium py-2 px-8 rounded"
        >
          Hitung
        </button>
      </div>

      {hpp && (
        <div className="px-10 mb-10">
          <h2 className="text-xl font-bold mb-4">Hasil Perhitungan</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-100 rounded-lg p-4 shadow">
              <p className="font-semibold">Harga Pokok Penjualan</p>
              <p className="text-lg font-bold text-blue-800">
                Rp. {hpp.hppPenjualan.toLocaleString("id-ID")}
              </p>
            </div>
            <div className="bg-blue-100 rounded-lg p-4 shadow">
              <p className="font-semibold">HPP per Produk</p>
              <p className="text-lg font-bold text-blue-800">
                Rp. {hpp.hppPerProduk.toLocaleString("id-ID")}
              </p>
            </div>
            <div className="bg-blue-100 rounded-lg p-4 shadow">
              <p className="font-semibold">Harga Jual</p>
              <p className="text-lg font-bold text-blue-800">
                Rp. {hpp.hargaJual.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PricingCalculator;
