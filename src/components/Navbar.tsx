import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import Notifications from './Notifications';
import { useAuthStore } from '../stores/useAuthStore';

const Navbar: React.FC = () => {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

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
  const { user } = useAuthStore(); // Access the user from the auth store
  return (
    <div className="bg-[#1F2526] p-3 w-full flex h-[65px] items-center  justify-between  ">
      <div className="flex items-center justify-end w-1/2 ">
        <div className="relative flex-grow md:flex-grow-0">
          <input
            type="text"
            placeholder="ex. PNR, Name, Ticket No, Booking Ref..."
            className="w-full md:w-80 p-2 pl-10 rounded-md bg-[#2C3435] text-white placeholder-gray-400 border-none focus:outline-none focus:ring-0 text-sm"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-4 relative  w-1/2">
        <button onClick={toggleNotifications} className="relative cursor-pointer focus:outline-none">
          <FontAwesomeIcon icon={faBell} className="text-white text-xl" />
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-600 rounded-full">
            9%
          </span>
        </button>
        {isNotificationsOpen && (
          <div ref={notificationsRef}>
            <Notifications />
          </div>
        )}
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faUserCircle} className="text-white text-xl" />
          <div className="text-right">
            <span className="block text-white font-semibold text-sm">{user?.name}</span>
            <span className="block text-green-500 text-xs">{user?.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;