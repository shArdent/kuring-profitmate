import React, { useEffect, useState } from "react";
import Sidebar from "../components/ui/Sidebar";
import Button from "../components/ui/Button";
import Table from "../components/ui/Table";
import Popup from "../components/features/hpp/Popup";
import ConfirmationModal from "../components/ui/ConfirmationModal";
import NotificationModal from "../components/ui/NotificationModal";
import PeriodDropdown from "../components/common/PeriodDropdown";
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
  const [isEditing, setIsEditing] = useState(false);
  const [currentPeriod, setCurrentPeriod] = useState(null);
  
  // Confirmation and notification modals states
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");
  const [deleteInfo, setDeleteInfo] = useState({ type: '', item: null });
  
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
    bahanBaku: isEditing ? "Edit Biaya Bahan Baku" : "Tambah Biaya Bahan Baku",
    tenagaKerja: isEditing ? "Edit Biaya Tenaga Kerja" : "Tambah Biaya Tenaga Kerja",
    beban: isEditing ? "Edit Biaya Beban" : "Tambah Biaya Beban",
  };

  // Handle edit action
  const handleEdit = (type, row) => {
    setPopupType(type);
    setIsEditing(true);
    
    // Set the values based on the row data and type
    if (type === "bahanBaku") {
      setPopupValues({
        id: row.id,
        namaBahan: row.namaBahan,
        totalHarga: row.totalHarga,
      });
    } else if (type === "tenagaKerja") {
      setPopupValues({
        id: row.id,
        namaPekerja: row.namaPekerja,
        nominalBayaran: row.nominalBayaran,
      });
    } else if (type === "beban") {
      setPopupValues({
        id: row.id,
        namaBeban: row.namaBeban,
        nominalBeban: row.nominalBeban,
      });
    }
    
    setShowPopup(true);
  };

  // Show confirmation modal before deleting
  const confirmDelete = (type, row) => {
    setDeleteInfo({ type, item: row });
    setShowConfirmation(true);
  };

  // Perform actual deletion after confirmation
  const handleDeleteConfirmed = () => {
    const { type, item } = deleteInfo;
    let deletedItemName = '';
    
    if (type === "bahanBaku") {
      setBahanBakuData(bahanBakuData.filter(data => data.id !== item.id));
      deletedItemName = item.namaBahan;
    } else if (type === "tenagaKerja") {
      setTenagaKerjaData(tenagaKerjaData.filter(data => data.id !== item.id));
      deletedItemName = item.namaPekerja;
    } else if (type === "beban") {
      setBebanData(bebanData.filter(data => data.id !== item.id));
      deletedItemName = item.namaBeban;
    }
    
    setShowConfirmation(false);
    
    // Show success notification
    setNotificationMessage(`${deletedItemName} berhasil dihapus`);
    setNotificationType("success");
    setShowNotification(true);
  };

  // Get message for confirmation dialog based on item type
  const getConfirmationMessage = () => {
    const { type, item } = deleteInfo;
    let itemName = '';
    
    if (!item) return '';
    
    if (type === "bahanBaku") {
      itemName = item.namaBahan;
    } else if (type === "tenagaKerja") {
      itemName = item.namaPekerja;
    } else if (type === "beban") {
      itemName = item.namaBeban;
    }
    
    return "Periksa Kembali data Anda apabila kurang yakin!";
  };

  // Column definitions for each table
  const columnsMap = {
    bahanBaku: [
      { key: "namaBahan", header: "Nama Bahan", width: "45%" },
      { key: "totalHarga", header: "Total Harga", width: "40%" },
      {
        key: "actions",
        header: "Aksi",
        width: "15%",
      },
    ],
    tenagaKerja: [
      { key: "namaPekerja", header: "Nama Pekerja", width: "45%" },
      { key: "nominalBayaran", header: "Nominal Bayaran", width: "40%" },
      {
        key: "actions",
        header: "Aksi",
        width: "15%",
      },
    ],
    beban: [
      { key: "namaBeban", header: "Nama Beban", width: "45%" },
      { key: "nominalBeban", header: "Nominal Beban", width: "40%" },
      {
        key: "actions",
        header: "Aksi",
        width: "15%",
      },
    ],
  };

  const handleAddClick = (type) => {
    setPopupType(type);
    setPopupValues({});
    setIsEditing(false);
    setShowPopup(true);
  };

  const handlePopupSubmit = (values) => {
    if (isEditing) {
      // Update existing item
      if (popupType === "bahanBaku") {
        setBahanBakuData(bahanBakuData.map(item => 
          item.id === values.id ? {
            id: values.id,
            namaBahan: values.namaBahan,
            totalHarga: values.totalHarga,
          } : item
        ));
      } else if (popupType === "tenagaKerja") {
        setTenagaKerjaData(tenagaKerjaData.map(item => 
          item.id === values.id ? {
            id: values.id,
            namaPekerja: values.namaPekerja,
            nominalBayaran: values.nominalBayaran,
          } : item
        ));
      } else if (popupType === "beban") {
        setBebanData(bebanData.map(item => 
          item.id === values.id ? {
            id: values.id,
            namaBeban: values.namaBeban,
            nominalBeban: values.nominalBeban,
          } : item
        ));
      }
    } else {
      // Add new item
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
    }

    setShowPopup(false);
    setIsEditing(false);
  };

  const [periods, setPeriods] = useState(periodData);
  const navigate = useNavigate();
  const getUserPeriod = async () => {
    try {
      const data = await getPeriod();
      setPeriods(data);
    } catch (error) {
      // navigate("/login");
    }
  };

  useEffect(() => {
    getUserPeriod();
  }, []);

  // This function has been replaced by getConfirmationMessage

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-6 bg-gray-50">
          <h1 className="text-2xl font-bold mb-6">Harga Pokok Produksi</h1>

            {/* Dropdown Periode */}
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Periode Saat Ini</h2>
            <div className="w-full">
              <PeriodDropdown />
            </div>
          </div>

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
            <Table 
              columns={columnsMap.bahanBaku} 
              data={bahanBakuData} 
              onEdit={(row) => handleEdit("bahanBaku", row)}
              onDelete={(row) => confirmDelete("bahanBaku", row)}
            />
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
            <Table 
              columns={columnsMap.tenagaKerja} 
              data={tenagaKerjaData} 
              onEdit={(row) => handleEdit("tenagaKerja", row)}
              onDelete={(row) => confirmDelete("tenagaKerja", row)}
            />
          </div>

          {/* Beban Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold">
                Daftar Biaya Beban (overhead)
              </h2>
              <Button 
                variant="primary" 
                onClick={() => handleAddClick("beban")}
              >
                + Tambah Biaya
              </Button>
            </div>
            <Table 
              columns={columnsMap.beban} 
              data={bebanData} 
              onEdit={(row) => handleEdit("beban", row)}
              onDelete={(row) => confirmDelete("beban", row)}
            />
          </div>

          {/* Popup for adding/editing items */}
          <Popup
            isOpen={showPopup}
            onClose={() => {
              setShowPopup(false);
              setIsEditing(false);
            }}
            onSubmit={handlePopupSubmit}
            title={popupType ? titleMap[popupType] : ""}
            fields={popupType ? fieldsMap[popupType] : []}
            values={popupValues}
            onChange={setPopupValues}
            isEditing={isEditing}
          />

          {/* Confirmation Modal for delete operations */}
          <ConfirmationModal
            isOpen={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            onConfirm={handleDeleteConfirmed}
            title="Konfirmasi"
            message={getConfirmationMessage()}
            confirmText="Konfirmasi"
            cancelText="Batal"
          />

          {/* Notification Modal for success/error messages */}
          {showNotification && (
            <NotificationModal
              message={notificationMessage}
              onClose={() => setShowNotification(false)}
              type={notificationType}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HPP;