import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic here
    // For example: clear local storage, reset auth state, etc.
    navigate('/login');
  };

  return (
    <div className="w-56 bg-[#789DBC] text-white flex flex-col min-h-screen">
      <div className="p-4 flex items-center gap-2">
        <div className="bg-white p-1 rounded">
          <img src="/assets/images/chart-icon.png" alt="ProfiteMate" className="w-6 h-6" />
        </div>
        <h1 className="font-bold text-lg">ProfiteMate</h1>
      </div>
      
      <nav className="mt-8 flex-1">
        <ul>
          <li onClick={() => navigate('/dashboard')} className="py-3 px-4 flex items-center gap-2 hover:bg-blue-500 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span>Home</span>
          </li>
          <li onClick={() => navigate('/labarugi')} className="py-3 px-4 flex items-center gap-2 hover:bg-blue-500 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 4a3 3 0 00-3 3v10a1 1 0 001 1h14a1 1 0 001-1V7a3 3 0 00-3-3H5zm11 1H4a1 1 0 00-1 1v10h14V6a1 1 0 00-1-1z" clipRule="evenodd" />
              <path d="M7 9a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" />
            </svg>
            <span>Laporan</span>
          </li>
          <li onClick={() => navigate('/hpp')} className="py-3 px-4 flex items-center gap-2 hover:bg-blue-500 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v1a1 1 0 102 0v-1zm4-1a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-8-3a1 1 0 100 2h10a1 1 0 100-2H4z" clipRule="evenodd" />
            </svg>
            <span>Hitung HPP</span>
          </li>
          <li onClick={() => navigate('/hppn')} className="py-3 px-4 flex items-center gap-2 hover:bg-blue-500 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v1a1 1 0 102 0v-1zm4-1a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-8-3a1 1 0 100 2h10a1 1 0 100-2H4z" clipRule="evenodd" />
            </svg>
            <span>Hitung HPPN</span>
          </li>
          <li onClick={() => navigate('/transactions')} className="py-3 px-4 flex items-center gap-2 hover:bg-blue-500 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            <span>Transaksi</span>
          </li>
          <li onClick={() => navigate('/settings')} className="py-3 px-4 flex items-center gap-2 hover:bg-blue-500 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            <span>Setting</span>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 mt-auto">
        <button 
          onClick={handleLogout}
          className="bg-orange-400 text-white py-2 px-4 rounded w-full hover:bg-orange-500 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;