import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars, faCog, faSignOutAlt,faChevronDown, faChevronUp, faChevronRight, faUser, faUtensils, faCalendarAlt, faChartBar, faCommentDots,
  faXmark,
  faGrip
} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

type NavItemProps = {
  icon: any;
  label: string;
  path: string;
  isCollapsed: boolean;
  currentPath: string;
  subItems?: { label: string; path: string }[];
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, path, isCollapsed, currentPath, subItems }) => {
  const isMainActive = currentPath === path;
  const isSubActive = subItems && subItems.some(item => item.path === currentPath);
  const isActive = isMainActive || isSubActive;
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(isSubActive); // Open submenu if a sub-route is active

  const toggleSubMenu = () => {
    if (subItems) {
      setIsSubMenuOpen(prev => !prev);
    }
  };

  return (
    <>
      <div className="relative">
        {isMainActive && !isCollapsed && (
          <div className="absolute -left-2 top-0 h-full w-1 bg-gray-300 rounded-full">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent border-l-gray-300" />
          </div>
        )}
        <div className="flex items-center">
          <Link to={path} className="block flex-1">
            <motion.div
              whileHover={!isMainActive && !isSubActive ? { backgroundColor: '#E6E6E6' } : {}}
              transition={{ duration: 0.2 }}
              className={`flex items-center p-3 cursor-pointer rounded-md mx-2 my-1 text-gray-800 text-sm font-medium
                ${isMainActive ? 'font-semibold' : ''}
              `}
              aria-label={label}
            >
              <FontAwesomeIcon icon={icon} className={`w-5 h-5 text-[#017955] mr-3`} />
              {!isCollapsed && <span>{label}</span>}
            </motion.div>
          </Link>
          {!isCollapsed && subItems && (
            <button
              onClick={toggleSubMenu}
              className="p-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label="Toggle Submenu"
            >
              <FontAwesomeIcon
                icon={isSubMenuOpen ? faChevronUp : faChevronDown}
                className="w-4 h-4"
              />
            </button>
          )}
          {isMainActive && !isCollapsed && !subItems && (
            <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-gray-500 ml-2" />
          )}
        </div>
      </div>
      {subItems && !isCollapsed && (
        <AnimatePresence>
          {isSubMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-8 relative"
            >
              <div className="absolute left-2 top-0 bottom-0 w-1 bg-gray-300 rounded-full" />
              <ul className="space-y-1">
                {subItems.map((item) => {
                  const isSubActiveItem = currentPath === item.path;
                  return (
                    <li key={item.path} className="relative">
                      {isSubActiveItem && (
                        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-l-8 border-t-transparent border-b-transparent border-l-gray-300" />
                      )}
                      <Link to={item.path} className="block">
                        <motion.div
                          whileHover={{}}
                          transition={{ duration: 0.2 }}
                          className={`flex items-center p-2 pl-6 cursor-pointer rounded-md text-sm
                            ${isSubActiveItem ? 'bg-white font-semibold text-[#017955]' : 'hover:bg-gray-100'}
                          `}
                          aria-label={item.label}
                        >
                          {item.label}
                        </motion.div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const navItems = [
    {
      icon: faUser,
      label: 'Profile',
      path: '/profile',
      subItems: [
        { label: 'Modifier le profil', path: '/profile/edit' },
        { label: 'Voir le profil', path: '/profile/view' },
      ],
    },
    {
      icon: faUtensils,
      label: 'Restaurant',
      path: '/restaurant',
      subItems: [
        { label: 'Gesttion des Menus', path: '/restaurant/menu' },
        { label: 'Gestion des Tables', path: '/restaurant/photo' },
        { label: 'Gestion des places', path: '/restaurant/restaurant' },
        { label: 'Gérer les photos (restaurant)', path: '/dish' },
      ],
    },
    {
      icon: faCalendarAlt,
      label: 'réservations ',
      path: '/reservations',
      subItems: [
        { label: 'Voir tout les réservations', path: '/reservations/view' },
        { label: 'Voir les réservations d’aujourd’hui', path: '/reservations/edit' },
      ],
    },
    {
      icon: faChartBar,
      label: 'statistiques de performance',
      path: '/statistics',
      subItems: [
        { label: 'Statistiques mensuelles', path: '/statistics/monthly' },
        { label: 'Statistiques annuelles', path: '/statistics/annual' },
      ],
    },
    {
      icon: faCommentDots,
      label: 'clients',
      path: '/reviews',
      subItems: [
        { label: 'Voir les Clients', path: '/reviews/view' },
        { label: 'Voir les avis de clients ', path: '/reviews/respond' },
      ],
    },
  ];

  const handleLogout = () => {
    // Clear any auth-related data
    localStorage.removeItem('token'); // or your actual key
    // Redirect to login page
    window.location.href = '/login'; // or use navigate from react-router
  };
  return (
    <motion.div
      initial={{ width: isCollapsed ? 64 : 260 }}
      animate={{ width: isCollapsed ? 64 : 260 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 100, damping: 15 }}
      className="h-screen flex flex-col bg-white shado"
    >
      <nav className="flex-1 shadow-none overflow-y-auto ">
      <div
          className={`mb-4 flex items-center h-[65px] bg-[#1F2526] ${
            isCollapsed ? 'justify-center items-center' : 'justify-between '
          }`}
        >
          {!isCollapsed && (
            <h1 className="text-slate-200 text-3xl px-3">BookIt</h1>
          )}
          <button
            onClick={toggleSidebar}
            className={`text-slate-300 w-fit cursor-pointer flex  hover:text-gray-700 focus:outline-none rounded-full p-1 ${
              isCollapsed ? 'justify-center items-center' : ''
            }`}
            aria-label="Toggle Sidebar"
          >
            <FontAwesomeIcon icon={isCollapsed ? faBars : faXmark} className="w-5 h-5" />
          </button>
        </div>
        <div className="mb-4">
          <ul className="space-y-1">
            {/* Standalone Dashboard NavItem */}
            <NavItem
              icon={faGrip}
              label="Dashboard"
              path="/"
              currentPath={currentPath}
              isCollapsed={isCollapsed}
            />
            {/* Existing navItems loop */}
            {navItems.map((item) => (
              <NavItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                path={item.path}
                currentPath={currentPath}
                isCollapsed={isCollapsed}
                subItems={item.subItems}
              />
            ))}
          </ul>
        </div>
      </nav>

      <div
        className={`p-4 border-t border-gray-200 ${
          isCollapsed ? 'flex justify-center' : ''
        }`}
      >
        <ul className={`space-y-1 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
          <NavItem
            icon={faCog}
            label="Settings"
            path="/settings"
            currentPath={currentPath}
            isCollapsed={isCollapsed}
          />
          <button onClick={handleLogout} className="block w-full">
            <motion.li
              whileHover={{ backgroundColor: '#E6E6E6', color: '#e53e3e' }}
              transition={{ duration: 0.2 }}
              className={`flex items-center p-3 cursor-pointer rounded-md mx-2 my-1 text-gray-800 hover:text-red-600 text-sm font-medium ${
                isCollapsed ? 'justify-center' : ''
              }`}
              aria-label="Logout"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5 text-red-500 mr-3" />
              {!isCollapsed && <span>Log Out</span>}
            </motion.li>
          </button>
        </ul>
      </div>
    </motion.div>
  );
};

export default Sidebar;