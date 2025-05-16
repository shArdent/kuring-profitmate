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
import apiClient from "../utils/axios";
import toast from "react-hot-toast";
import { formatCurrency } from "../utils/formatter";

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
  const [deleteInfo, setDeleteInfo] = useState({ type: "", item: null });

  const navigate = useNavigate();

  const [hppData, setHppData] = useState(null);

  const getHppData = async () => {
    try {
      const {
        data: { data },
      } = await apiClient.get(`/production/${currentPeriod.id}`);
      console.log(data);
      setHppData(data);
    } catch (error) {
      console.log(error);
      toast.error("Gagal mendapatkan data");
    }
  };

  useEffect(() => {
    if (currentPeriod) {
      getHppData();
    }
  }, [currentPeriod]);

  // Field definitions for each popup type
  const fieldsMap = {
    bahanBaku: [
      { name: "name", label: "Nama Bahan", required: true },
      {
        name: "amount",
        label: "Total Harga",
        type: "text",
        required: true,
      },
    ],
    tenagaKerja: [
      { name: "name", label: "Nama Pekerja", required: true },
      {
        name: "amount",
        label: "Nominal Bayaran",
        type: "text",
        required: true,
      },
    ],
    beban: [
      { name: "name", label: "Nama Beban", required: true },
      {
        name: "amount",
        label: "Nominal Beban",
        type: "text",
        required: true,
      },
    ],
  };

  // Popup titles for each type
  const titleMap = {
    bahanBaku: isEditing ? "Edit Biaya Bahan Baku" : "Tambah Biaya Bahan Baku",
    tenagaKerja: isEditing
      ? "Edit Biaya Tenaga Kerja"
      : "Tambah Biaya Tenaga Kerja",
    beban: isEditing ? "Edit Biaya Beban" : "Tambah Biaya Beban",
  };

  // Handle edit action
  const handleEdit = async (type, row) => {
    setPopupType(type);

    console.log(row);
    setIsEditing(true);
    console.log(type);

    setPopupValues({
      id: row.id,
      name: row.name,
      amount: Number(row.amount),
    });

    setShowPopup(true);
  };

  // Show confirmation modal before deleting
  const confirmDelete = (type, row) => {
    setDeleteInfo({ type: row.category, item: row });
    setShowConfirmation(true);
  };

  // Perform actual deletion after confirmation
  const handleDeleteConfirmed = async () => {
    const { type, item } = deleteInfo;
    let deletedItemName = "";
    console.log(deleteInfo);

    if (type === "INGRIDIENTS") {
      deletedItemName = item.name;
    } else if (type === "LABOR") {
      deletedItemName = item.name;
    } else if (type === "OVERHEAD") {
      deletedItemName = item.name;
    }

    try {
      await apiClient.delete(`/production/${item.id}`);

      await getHppData();
    } catch (error) {
      console.log(error);
      toast.error("Gagal menghapus ", item.name);
      return;
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
    let itemName = "";

    if (!item) return "";

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

  const handleAddClick = (type) => {
    setPopupType(type);
    setPopupValues({});
    setIsEditing(false);
    setShowPopup(true);
  };

  const handlePopupSubmit = async (values) => {
    if (isEditing) {
      const payload = { ...values, amount: Number(values.amount) };
      try {
        console.log(values);
        await apiClient.patch(`/production/${values.id}`, payload);
        await getHppData();
        toast.success("Berhasil mengedit item");
      } catch (error) {
        console.log(error);
        toast.error("Gagal mengedit item");
        return;
      }
    } else {
      // Add new item
      if (popupType === "bahanBaku") {
        const payload = {
          periodesId: currentPeriod.id,
          name: values.name,
          amount: Number(values.amount),
          category: "INGRIDIENTS",
        };

        console.log(payload);

        try {
          await apiClient.post("/production", payload);
          toast.success("Berhasil menambahkan biaya");
          navigate(0);
        } catch (error) {
          console.log(error);
          toast.error("Gagal menambahkan biaya bahan baku");
        }
      } else if (popupType === "tenagaKerja") {
        const payload = {
          periodesId: currentPeriod.id,
          name: values.name,
          amount: Number(values.amount),
          category: "LABOR",
        };
        try {
          await apiClient.post("/production", payload);
          toast.success("Berhasil menambahkan biaya");
          console.log(payload);
          navigate(0);
        } catch (error) {
          console.log(error);
          toast.error("Gagal menambahkan biaya tenaga kerja");
        }
      } else if (popupType === "beban") {
        const payload = {
          periodesId: currentPeriod.id,
          name: values.name,
          amount: Number(values.amount),
          category: "OVERHEAD",
        };

        console.log(payload);
        try {
          await apiClient.post("/production", payload);
          toast.success("Berhasil menambahkan biaya");
          navigate(0);
        } catch (error) {
          console.log(error);
          toast.error("Gagal menambahkan biaya overhead");
        }
      }
    }

    setShowPopup(false);
    setIsEditing(false);
  };

  const columnsMap = {
    bahanBaku: [
      { key: "name", header: "Nama Bahan", width: "45%" },
      { key: "amount", header: "Harga", width: "40%" },
      {
        key: "actions",
        header: "Aksi",
        width: "15%",
      },
    ],
    tenagaKerja: [
      { key: "name", header: "Nama Pekerja", width: "45%" },
      { key: "amount", header: "Nominal Bayaran", width: "40%" },
      {
        key: "actions",
        header: "Aksi",
        width: "15%",
      },
    ],
    beban: [
      { key: "name", header: "Nama Beban", width: "45%" },
      { key: "amount", header: "Nominal Beban", width: "40%" },
      {
        key: "actions",
        header: "Aksi",
        width: "15%",
      },
    ],
  };

  // This function has been replaced by getConfirmationMessage

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-12 bg-gray-50 ml-4">
          <h1 className="text-2xl font-bold mb-6">Harga Pokok Produksi</h1>

          {/* Dropdown Periode */}
          <div className="mb-6 mt-6">
            <h2 className="text-lg font-semibold mb-2 ">Periode Saat Ini</h2>
            <div className="w-full mt-4 ">
              <PeriodDropdown
                currentPeriod={currentPeriod}
                setCurrentPeriod={setCurrentPeriod}
              />
            </div>
          </div>

          {/* Bahan Baku Section */}
          <div className="mb-8 mt-8 ">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold ">Daftar Biaya Bahan Baku</h2>
              <Button
                variant="primary"
                onClick={() => handleAddClick("bahanBaku")}
              >
                + Tambah Biaya
              </Button>
            </div>
            <Table
              columns={columnsMap.bahanBaku}
              data={hppData ? hppData.bahanBaku : []}
              onEdit={(row) => handleEdit("bahanBaku", row)}
              onDelete={(row) => confirmDelete("bahanBaku", row)}
            />
            <div className="bg-white shadow rounded-b-lg px-6 py-4 flex justify-between text-sm text-gray-700 border-t">
              <span className="font-semibold">Total Biaya Bahan Baku</span>
              <span className="font-semibold">
                Rp.{" "}
                {formatCurrency(Number(hppData ? hppData.totalBahanBaku : 0))}{" "}
              </span>
            </div>
          </div>

          {/* Tenaga Kerja Section */}
          <div className="mb-8 mt-8">
            <div className="flex justify-between items-center mb-6">
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
              data={hppData ? hppData.biayaTenagaKerja : []}
              onEdit={(row) => handleEdit("tenagaKerja", row)}
              onDelete={(row) => confirmDelete("tenagaKerja", row)}
            />
            <div className="bg-white shadow rounded-b-lg px-6 py-4 flex justify-between text-sm text-gray-700 border-t">
              <span className="font-semibold">Total Biaya Tenaga Kerja</span>
              <span className="font-semibold">
                Rp.{" "}
                {formatCurrency(
                  Number(hppData ? hppData.totalBiayaTenagaKerja : 0)
                )}{" "}
              </span>
            </div>
          </div>

          {/* Beban Section */}
          <div className="mb-8 mt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">
                Daftar Biaya Beban (overhead)
              </h2>
              <Button variant="primary" onClick={() => handleAddClick("beban")}>
                + Tambah Biaya
              </Button>
            </div>
            <Table
              columns={columnsMap.beban}
              data={hppData ? hppData.biayaOverhead : []}
              onEdit={(row) => handleEdit("beban", row)}
              onDelete={(row) => confirmDelete("beban", row)}
            />
            <div className="bg-white shadow rounded-b-lg px-6 py-4 flex justify-between text-sm text-gray-700 border-t">
              <span className="font-semibold">Total Biaya Beban</span>
              <span className="font-semibold">
                Rp.{" "}
                {formatCurrency(
                  Number(hppData ? hppData.totalBiayaOverhead : 0)
                )}
              </span>
            </div>
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
