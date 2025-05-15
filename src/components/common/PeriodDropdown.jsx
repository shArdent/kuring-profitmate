import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useEffect, useState } from "react";
import { getPeriod } from "../../utils/api";

const PeriodDropdown = ({ currentPeriod, setCurrentPeriod }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handlePeriodChange = (period) => {
    setCurrentPeriod(period);

    setIsDropdownOpen(false);
  };

  const [periods, setPeriods] = useState([]);

  const getUserPeriod = async () => {
    try {
      const data = await getPeriod();
      setPeriods(data);
    } catch (error) {
      console.log("error bang");
      navigate("/login");
    }
  };

  useEffect(() => {
    getUserPeriod();
  }, []);

  return (
    <div className="relative  w-full">
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
                {format(currentPeriod.startDate, "MMM yyy", {
                  locale: id,
                })}{" "}
                -{" "}
                {format(currentPeriod.startDate, "MMM yyy", {
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

      {/* Dropdown, DIPINDAHKAN KE LUAR box biru */}
      {isDropdownOpen && (
        <div className="absolute top-full left-0 right-0 bg-white text-gray-800 rounded-b-lg shadow-lg z-10">
          <ul>
            {periods
              ? periods?.map((period, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handlePeriodChange(period)}
                  >
                    {period.name}:{" "}
                    {format(period.startDate, "MMM yyy", { locale: id })} -{" "}
                    {format(period.startDate, "MMM yyy", { locale: id })}
                  </li>
                ))
              : null}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PeriodDropdown;
