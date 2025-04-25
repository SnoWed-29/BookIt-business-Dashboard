import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Rendered Page Content */}
        <div className="flex-1 overflow-y-auto p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;