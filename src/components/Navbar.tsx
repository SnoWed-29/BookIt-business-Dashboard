import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import Notifications from './Notifications'; // Import the Notifications component

const Navbar: React.FC = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationsRef]);

  return (
    <div className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center">
        <div className="relative flex-grow md:flex-grow-0">
          <input
            type="text"
            placeholder="Search menu, orders and more..."
            className="w-full md:w-64 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4 relative"> {/* Added relative for positioning */}
        <button onClick={toggleNotifications} className="relative cursor-pointer focus:outline-none">
          <FontAwesomeIcon icon={faBell} className="text-gray-600 text-2xl hover:text-teal-500" />
          <span className="absolute top-[12px] right-[10px]  inline-flex items-center justify-center p-1 text-[10px] font-bold leading-none text-red-100 bg-red-600 rounded-full">
            9+
          </span>
        </button>
        {isNotificationsOpen && (
          <div ref={notificationsRef}>
            <Notifications />
          </div>
        )}
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faUserCircle} className="text-gray-500 text-2xl" />
          <div className="text-right">
            <span className="block text-gray-800 font-semibold text-sm">Taros</span>
            <span className="block text-gray-500 text-xs">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;