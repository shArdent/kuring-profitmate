import React, { useState } from 'react';

const PricingCalculator = () => {
  const [productCount, setProductCount] = useState('');
  const [initialInventory, setInitialInventory] = useState('');
  const [finalInventory, setFinalInventory] = useState('');
  const [marginProfit, setMarginProfit] = useState('50%');
  const [tableData, setTableData] = useState([
    { tanggal: 'Jan 1, 2024', jumlahProduk: '2.500', marginKeuntungan: '75%', persediaanAwal: 'Rp. 0', persediaanAkhir: 'Rp. 96.428.571', hargaPokokPenjualan: 'Rp. 64.285.725' },
    { tanggal: 'Feb 1, 2024', jumlahProduk: '1000', marginKeuntungan: '75%', persediaanAwal: 'Rp. 51.428.571', persediaanAkhir: 'Rp. 34.285.714', hargaPokokPenjualan: 'Rp. 51.428.571' },
    { tanggal: 'Mar 1, 2024', jumlahProduk: '1.500', marginKeuntungan: '75%', persediaanAwal: 'Rp. 34.285.714', persediaanAkhir: 'Rp. 6.435.643', hargaPokokPenjualan: 'Rp. 25.741.286' },
    { tanggal: 'Apr 1, 2024', jumlahProduk: '2.000', marginKeuntungan: '75%', persediaanAwal: 'Rp. 6.435.643', persediaanAkhir: 'Rp. 0', hargaPokokPenjualan: 'Rp. 38.751.435' },
    { tanggal: 'Mei 1, 2024', jumlahProduk: '2.500', marginKeuntungan: '75%', persediaanAwal: 'Rp. 0', persediaanAkhir: 'Rp. 0', hargaPokokPenjualan: 'Rp. 51.428.571' },
    { tanggal: 'Jun 1, 2024', jumlahProduk: '3.000', marginKeuntungan: '75%', persediaanAwal: 'Rp. 0', persediaanAkhir: 'Rp. 5.510.204', hargaPokokPenjualan: 'Rp. 77.142.870' },
  ]);

  const handleCalculate = () => {
    // Calculation logic would go here
    console.log('Calculating...');
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Left Column */}
        <div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
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
            <label className="block text-gray-700 font-medium mb-2">
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
            <label className="block text-gray-700 font-medium mb-2">
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
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

      <div className="mb-8">
        <button
          onClick={handleCalculate}
          className="bg-orange-400 hover:bg-orange-500 text-white font-medium py-2 px-8 rounded"
        >
          Hitung
        </button>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Harga Pokok Penjualan</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border border-gray-200 bg-gray-50">
                <th className="p-3 text-center">Tanggal</th>
                <th className="p-3 text-center">Jumlah Produk</th>
                <th className="p-3 text-center">Margin Keuntungan</th>
                <th className="p-3 text-center">Persediaan Awal</th>
                <th className="p-3 text-center">Persediaan Akhir</th>
                <th className="p-3 text-center">Harga Pokok Penjualan</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className="border border-gray-200">
                  <td className="p-3 text-center">{row.tanggal}</td>
                  <td className="p-3 text-center">{row.jumlahProduk}</td>
                  <td className="p-3 text-center">{row.marginKeuntungan}</td>
                  <td className="p-3 text-center">{row.persediaanAwal}</td>
                  <td className="p-3 text-center">{row.persediaanAkhir}</td>
                  <td className="p-3 text-center">{row.hargaPokokPenjualan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PricingCalculator;
