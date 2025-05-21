import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../utils/api";
import chartIcon from '../../assets/images/chart-icon.png';
import calcIcon from '../../assets/images/calc-icon.svg';
import chartSidebar from '../../assets/images/chart-no-axes-column.svg';
import activeCalc from '../../assets/images/SVGRepo_iconCarrier.svg';
import activeChart from '../../assets/images/active-chart-no-axes-column.svg';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const baseClass = "w-full py-5 px-4 flex items-center gap-2 cursor-pointer transition-colors duration-300 rounded-xl";
  const activeClass = "bg-white text-[#789DBC] font-semibold rounded-xl";
  const inactiveClass = "hover:bg-blue-500";

  return (
    <div className="w-56 bg-[#789DBC] text-white flex flex-col justify-center min-h-screen">
      <div className="p-4 flex items-center gap-1 mt-6 pl-6">
        <div className="p-1 rounded">
          <img src={chartIcon} alt="ProfiteMate" className="w-10 h-10 object-contain" />
        </div>
        <h1 className="font-bold text-lg text-white">ProfiteMate</h1>
      </div>

      <div className="  ">
        <nav className="mr-6 gap-2">
          <ul>
            <li
              onClick={() => navigate("/dashboard")}
              className={`${baseClass} ${isActive("/dashboard") ? activeClass : inactiveClass}`}
            >
              <ion-icon name="home-outline" className="text-xl"></ion-icon>
              <span>Home</span>
            </li>

            <li
              onClick={() => navigate("/labarugi")}
              className={`${baseClass} ${isActive("/labarugi") ? activeClass : inactiveClass}`}
            >
              {isActive("/labarugi") ? (
                <img src={activeChart} alt="labarugi" className="w-5 h-5" />
              ) : (
                <img src={chartSidebar} alt="labarugi" className="w-5 h-5" />
              )}
              <span>Laporan</span>
            </li>

            <li
              onClick={() => navigate("/hpp")}
              className={`${baseClass} ${isActive("/hpp") ? activeClass : inactiveClass}`}
            >
              {isActive("/hpp") ? (
                <img src={activeCalc} alt="HPP" className="w-5 h-5" />
              ) : (
                <img src={calcIcon} alt="HPP" className="w-5 h-5" />
              )}
              <span>Hitung HPP</span>
            </li>

            <li
              onClick={() => navigate("/hppn")}
              className={`${baseClass} ${isActive("/hppn") ? activeClass : inactiveClass}`}
            >
              {isActive("/hppn") ? (
                <img src={activeCalc} alt="HPPN" className="w-5 h-5" />
              ) : (
                <img src={calcIcon} alt="HPPN" className="w-5 h-5" />
              )}
              <span>Hitung HPPN</span>
            </li>


            <li
              onClick={() => navigate("/transactions")}
              className={`${baseClass} ${isActive("/transactions") ? activeClass : inactiveClass}`}
            >
              <ion-icon name="swap-horizontal-outline" className="text-xl"></ion-icon>
              <span>Transaksi</span>
            </li>

            <li
              onClick={() => navigate("/settings")}
              className={`${baseClass} ${isActive("/settings") ? activeClass : inactiveClass}`}
            >
              <ion-icon name="settings-outline" className="text-xl"></ion-icon>
              <span>Setting</span>
            </li>
          </ul>
        </nav>
      </div>

      <div className="p-4 ml-8 mb-4 mt-auto w-[150px]">
        <button
          onClick={handleLogout}
          className="bg-orange-400 text-white py-2 px-4 rounded w-full rounded-full hover:bg-orange-500 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
