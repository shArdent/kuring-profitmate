import React, { useEffect, useState } from "react";
import Sidebar from "../components/ui/Sidebar";
import Button from "../components/ui/Button";
import Table from "../components/ui/Table";
import DynamicInput from "../components/ui/DynamicInput";
import Popup from "../components/features/hpp/Popup";
import { getPeriod } from "../utils/api";
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

const HPP = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState("");
  const [popupValues, setPopupValues] = useState({});

  // State for the three data types
  const [bahanBakuData, setBahanBakuData] = useState([
    { id: 1, namaBahan: "Kain Katun", totalHarga: "Rp10.500.000" },
    { id: 2, namaBahan: "Benang Jahit", totalHarga: "Rp1.500.000" },
    { id: 3, namaBahan: "Benang Wol", totalHarga: "Rp5.000.000" },
    { id: 4, namaBahan: "Benang Wol", totalHarga: "Rp5.000.000" },
  ]);

  const [tenagaKerjaData, setTenagaKerjaData] = useState([
    { id: 1, namaPekerja: "Udin", nominalBayaran: "Rp1.500.000" },
    { id: 2, namaPekerja: "Beno", nominalBayaran: "Rp1.500.000" },
    { id: 3, namaPekerja: "Iben", nominalBayaran: "Rp1.000.000" },
    { id: 4, namaPekerja: "Uwan", nominalBayaran: "Rp1.300.000" },
  ]);

  const [bebanData, setBebanData] = useState([
    { id: 1, namaBeban: "Angkut Transportasi", nominalBeban: "Rp1.500.000" },
    { id: 2, namaBeban: "Listrik", nominalBeban: "Rp1.500.000" },
    { id: 3, namaBeban: "Upah Bayaran", nominalBeban: "Rp1.000.000" },
  ]);

  // Field definitions for each popup type
  const fieldsMap = {
    bahanBaku: [
      { name: "namaBahan", label: "Nama Bahan", required: true },
      {
        name: "totalHarga",
        label: "Total Harga",
        type: "text",
        required: true,
      },
    ],
    tenagaKerja: [
      { name: "namaPekerja", label: "Nama Pekerja", required: true },
      {
        name: "nominalBayaran",
        label: "Nominal Bayaran",
        type: "text",
        required: true,
      },
    ],
    beban: [
      { name: "namaBeban", label: "Nama Beban", required: true },
      {
        name: "nominalBeban",
        label: "Nominal Beban",
        type: "text",
        required: true,
      },
    ],
  };

  // Popup titles for each type
  const titleMap = {
    bahanBaku: "Tambah Biaya Bahan Baku",
    tenagaKerja: "Tambah Biaya Tenaga Kerja",
    beban: "Tambah Biaya Beban",
  };

  // Column definitions for each table
  const columnsMap = {
    bahanBaku: [
      { key: "namaBahan", header: "Nama Bahan", width: "50%" },
      { key: "totalHarga", header: "Total Harga", width: "40%" },
      {
        key: "actions",
        header: "Aksi",
        width: "10%",
        render: (row) => (
          <div className="flex justify-center">
            <button className="text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
        ),
      },
    ],
    tenagaKerja: [
      { key: "namaPekerja", header: "Nama Pekerja", width: "50%" },
      { key: "nominalBayaran", header: "Nominal Bayaran", width: "40%" },
      {
        key: "actions",
        header: "Aksi",
        width: "10%",
        render: (row) => (
          <div className="flex justify-center">
            <button className="text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
        ),
      },
    ],
    beban: [
      { key: "namaBeban", header: "Nama Beban", width: "50%" },
      { key: "nominalBeban", header: "Nominal Beban", width: "40%" },
      {
        key: "actions",
        header: "Aksi",
        width: "10%",
        render: (row) => (
          <div className="flex justify-center">
            <button className="text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </div>
        ),
      },
    ],
  };

  const handleAddClick = (type) => {
    setPopupType(type);
    setPopupValues({});
    setShowPopup(true);
  };

  const handlePopupSubmit = (values) => {
    // Add the new item to the appropriate data array
    if (popupType === "bahanBaku") {
      setBahanBakuData([
        ...bahanBakuData,
        {
          id: bahanBakuData.length + 1,
          namaBahan: values.namaBahan,
          totalHarga: values.totalHarga,
        },
      ]);
    } else if (popupType === "tenagaKerja") {
      setTenagaKerjaData([
        ...tenagaKerjaData,
        {
          id: tenagaKerjaData.length + 1,
          namaPekerja: values.namaPekerja,
          nominalBayaran: values.nominalBayaran,
        },
      ]);
    } else if (popupType === "beban") {
      setBebanData([
        ...bebanData,
        {
          id: bebanData.length + 1,
          namaBeban: values.namaBeban,
          nominalBeban: values.nominalBeban,
        },
      ]);
    }

    setShowPopup(false);
  };

  const [periods, setPeriods] = useState(periodData);
  const navigate = useNavigate();
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
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6 bg-gray-50">
          <h1 className="text-2xl font-bold mb-6">Harga Pokok Produksi</h1>

          {/* Bahan Baku Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">Daftar Biaya Bahan Baku</h2>
              <Button
                variant="primary"
                onClick={() => handleAddClick("bahanBaku")}
              >
                + Tambah Biaya
              </Button>
            </div>
            <Table columns={columnsMap.bahanBaku} data={bahanBakuData} />
          </div>

          {/* Tenaga Kerja Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">Daftar Biaya Tenaga Kerja</h2>
              <Button
                variant="primary"
                onClick={() => handleAddClick("tenagaKerja")}
              >
                + Tambah Biaya
              </Button>
            </div>
            <Table columns={columnsMap.tenagaKerja} data={tenagaKerjaData} />
          </div>

          {/* Beban Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">
                Daftar Biaya Beban (overhead)
              </h2>
              <Button variant="primary" onClick={() => handleAddClick("beban")}>
                + Tambah Biaya
              </Button>
            </div>
            <Table columns={columnsMap.beban} data={bebanData} />
          </div>

          {/* Popup for adding new items */}
          <Popup
            isOpen={showPopup}
            onClose={() => setShowPopup(false)}
            onSubmit={handlePopupSubmit}
            title={popupType ? titleMap[popupType] : ""}
            fields={popupType ? fieldsMap[popupType] : []}
            values={popupValues}
            onChange={setPopupValues}
          />
        </div>
      </div>
    </div>
  );
};

export default HPP;
