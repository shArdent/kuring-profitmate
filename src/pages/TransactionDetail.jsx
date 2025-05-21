import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar";
import DatePicker from "../components/ui/DatePicker";
import Button from "../components/ui/Button";
import TextField from "../components/ui/TextField";
import apiClient from "../utils/axios";
import toast from "react-hot-toast";

const TransactionDetail = () => {
  const { id } = useParams();

  const [date, setDate] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [trxData, setTrxData] = useState(null);

  const getTrxDetail = async () => {
    try {
      const {
        data: { data },
      } = await apiClient(`/transaction/${id}`);

      setTrxData(data);
      setDate(data.createdAt);
      setCurrentDescription(data.description ?? "");

      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Gagal mendapatkan data");
    }
  };

  useEffect(() => {
    setTransactionId(id);
    if (id) {
      getTrxDetail();
    }
  }, [id]);

  // useEffect(() => {
  //   console.log(currentDescription)
  // }, [currentDescription])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...trxData,
      description: currentDescription,
    };

    console.log(payload);
    try {
      await apiClient.patch(`/transaction/${id}`, payload);
      toast.success("Berhasil mengubah data");
      getTrxDetail();
    } catch (error) {
      console.log(error);
      toast.error("Gagal mengubah data");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Detail Transaksi</h1>

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
          {/* Tanggal */}
          <DatePicker
            label="Tanggal"
            value={date}
            onChange={setDate}
            name="date"
            placeholder="Pilih Periode"
          />

          {/* ID Transaksi langsung pakai input biasa */}
          <div className="mb-4 w-full">
            <label className="block mb-2 text-gray-800 font-medium">
              ID Transaksi
            </label>
            <input
              type="text"
              className="
                px-4 py-2 
                bg-white 
                border border-gray-300 
                rounded-md
                focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-500
                transition-all duration-200
                w-full
              "
              placeholder="Masukkan ID Transaksi"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
          </div>

          {/* Deskripsi Transaksi tetap pakai TextField */}
          <TextField
            label="Deskripsi Transaksi"
            placeholder="Masukkan Deskripsi Transaksi"
            deskripsi={currentDescription}
            value={currentDescription}
            onChange={(e) => setCurrentDescription(e.target.value)}
            multiline
            rows={5}
          />

          <div className="pt-4 flex gap-4">
            <Button type="submit" variant="primary">
              Simpan
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
            >
              Batal
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionDetail;
