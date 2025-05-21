import { useState, useEffect } from "react";
import AddPeriod from "./AddPeriod";
import { getPeriod } from "../../utils/api";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import apiClient from "../../utils/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PeriodDropdown = ({ currentPeriod, setCurrentPeriod, onAddPeriod }) => {
  // Example period data
  const navigate = useNavigate();
  const periodData = [
    {
      id: 1,
      name: "Periode 1",
      startDate: new Date(2024, 0, 1),
      endDate: new Date(2024, 2, 31),
    },
    {
      id: 2,
      name: "Periode 2",
      startDate: new Date(2024, 3, 1),
      endDate: new Date(2024, 5, 30),
    },
    {
      id: 3,
      name: "Periode 3",
      startDate: new Date(2024, 6, 1),
      endDate: new Date(2024, 8, 30),
    },
    {
      id: 4,
      name: "Periode 4",
      startDate: new Date(2024, 9, 1),
      endDate: new Date(2024, 11, 31),
    },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [periods, setPeriods] = useState(periodData);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleAddClose = () => {
    setIsAddOpen(false);
  };

  const handleAddSubmit = async (values) => {
    try {
      const {
        data: { data },
      } = await apiClient.post("/period", values);

      navigate(-1)

      toast.success("Berhasil menambahkan periode");
    } catch (error) {
      console.log(error);
      toast.error("Gagal menambahkan periode");
    }
  };

  const handlePeriodChange = (period) => {
    setCurrentPeriod(period);
    setIsDropdownOpen(false);
  };

  const handleAddPeriod = () => {
    setIsAddOpen(true);
    setIsDropdownOpen(false);
  };

  const getUserPeriod = async () => {
    try {
      // Simulated API call
      const data = await getPeriod();
      setPeriods(data);
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        navigate("/login");
      }
      if (error.status === 404) {
        toast.error("Data periode tidak ditemukan");
      }
    }
  };

  useEffect(() => {
    getUserPeriod();
  }, []);

  return (
    <>
      <div className="relative w-full">
        {/* Box biru sebagai trigger */}
        <div
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="bg-blue-500 text-white py-2 px-4 w-full rounded-lg flex items-center justify-between cursor-pointer"
        >
          <div>
            {currentPeriod ? (
              <>
                <h3 className="text-lg font-semibold">{currentPeriod.name}</h3>
                <p>
                  {format(currentPeriod.startDate, "MMM yyyy", { locale: id })}{" "}
                  -{" "}
                  {format(currentPeriod.endDate, "MMM yyyy", {
                    locale: id,
                  })}
                </p>
              </>
            ) : (
              <h3 className="text-lg font-semibold">Pilih Periode</h3>
            )}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Dropdown content */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 bg-white text-gray-800 rounded-b-lg shadow-lg z-10 mt-1">
            <ul className="divide-y divide-gray-100">
              {periods.map((period) => (
                <li
                  key={period.id}
                  className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handlePeriodChange(period)}
                >
                  <div className="font-medium">{period.name}</div>
                  <div className="text-sm text-gray-600">
                    {format(period.startDate, "MMM yyyy", { locale: id })} -{" "}
                    {format(period.endDate, "MMM yyyy", { locale: id })}
                  </div>
                </li>
              ))}
            </ul>

            {/* Tambah periode Baru button */}
            <button
              onClick={handleAddPeriod}
              className="w-full flex items-center justify-center gap-2 py-3 text-blue-600 hover:bg-gray-50 border-t border-gray-100"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Tambah periode Baru</span>
            </button>
          </div>
        )}
      </div>

      <AddPeriod
        isOpen={isAddOpen}
        onClose={handleAddClose}
        onSubmit={handleAddSubmit}
      />
    </>
  );
};

export default PeriodDropdown;
