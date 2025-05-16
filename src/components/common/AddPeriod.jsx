import React, { useState } from "react";
import DatePicker from "../ui/DatePicker";

const AddPeriod = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = () => {
    if (!name || !startDate || !endDate) {
      alert("Mohon lengkapi semua data");
      return;
    }

    onSubmit({
      name,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    // Reset & tutup
    setName("");
    setStartDate("");
    setEndDate("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 ">
          <h2 className="text-xl font-bold text-center mb-6">
            Tambah Periode Baru
          </h2>

        <div className="mb-4 mt-4">
          <label className="block mb-1 font-semibold">Nama Periode</label>
          <input
            type="text"
            placeholder="Masukkan nama periode"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <DatePicker
            label="Tanggal Awal"
            value={startDate}
            onChange={setStartDate}
            name="startDate"
            required
          />
          <DatePicker
            label="Tanggal Akhir"
            value={endDate}
            onChange={setEndDate}
            name="endDate"
            required
          />
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-6 rounded"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded"
          >
            Tambahkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPeriod;
