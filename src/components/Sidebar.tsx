import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faChartBar, faList, faTable, faUtensils,
  faUsers, faCog, faQuestionCircle, faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

type NavItemProps = {
  icon: any;
  label: string;
  path: string;
  isCollapsed: boolean;
  currentPath: string;
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, path, isCollapsed, currentPath }) => {
  const isActive = currentPath === path;

  return (
    <Link to={path} className="block"> {/* Make the Link a block element for better hover area */}
      <motion.li
        whileHover={{ scale: 1.05, backgroundColor: isActive ? '#ddf4f1' : '#e6f9f7' }}
        transition={{ duration: 0.2 }}
        className={`flex items-center p-3 cursor-pointer rounded-md mx-2 my-1 text-gray-700
          ${isActive ? 'bg-teal-100 text-teal-600 font-semibold' : 'hover:text-teal-600'}
        `}
        aria-label={label}
      >
        <FontAwesomeIcon icon={icon} className="w-5 h-5 text-teal-500" />
        {!isCollapsed && <span className="ml-3 text-sm font-medium">{label}</span>}
        {isActive && !isCollapsed && (
          <div className="w-1 h-6 bg-teal-600 rounded-full absolute left-0" />
        )}
      </motion.li>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  return (
    <motion.div
      initial={{ width: isCollapsed ? 64 : 220 }}
      animate={{ width: isCollapsed ? 64 : 220 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 100, damping: 15 }}
      className=" h-screen flex flex-col shadow-md"
    >
      {/* Header */}
      <div className="flex items-center p-4 border-b border-teal-100">
        {!isCollapsed && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-2"
            >
              <span className="text-xl font-bold text-teal-700">BookIt</span>
            </motion.div>
          </AnimatePresence>
        )}
        <button
          onClick={toggleSidebar}
          className={`ml-auto text-gray-600 hover:text-teal-600 focus:outline-none rounded-full p-1 ${
            isCollapsed ? 'hover:bg-teal-100' : ''
          }`}
          aria-label="Toggle Sidebar"
        >
          <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-2 overflow-y-auto">
        <ul className="space-y-1">
          <NavItem icon={faChartBar} label="Dashboard" path="/" currentPath={currentPath} isCollapsed={isCollapsed} />
          <NavItem icon={faList} label="Order Line" path="/orders" currentPath={currentPath} isCollapsed={isCollapsed} />
          <NavItem icon={faTable} label="Manage Table" path="/tables" currentPath={currentPath} isCollapsed={isCollapsed} />
          <NavItem icon={faUtensils} label="Manage Dishes" path="/dishes" currentPath={currentPath} isCollapsed={isCollapsed} />
          <NavItem icon={faUsers} label="Customers" path="/customers" currentPath={currentPath} isCollapsed={isCollapsed} />
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-teal-100">
        <ul className="space-y-1">
          <NavItem icon={faCog} label="Settings" path="/settings" currentPath={currentPath} isCollapsed={isCollapsed} />
          <NavItem icon={faQuestionCircle} label="Help Center" path="/help" currentPath={currentPath} isCollapsed={isCollapsed} />
          <Link to="/logout" className="block">
            <motion.li
              whileHover={{ scale: 1.05, backgroundColor: '#ffe5e5', color: '#e53e3e' }}
              transition={{ duration: 0.2 }}
              className={`flex items-center p-3 cursor-pointer rounded-md mx-2 my-1 text-gray-700 hover:text-red-600`}
              aria-label="Logout"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5 text-red-500" />
              {!isCollapsed && <span className="ml-3 text-sm font-medium">Logout</span>}
            </motion.li>
          </Link>
        </ul>
      </div>
    </motion.div>
  );
};

export default Sidebar;