import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './views/Dashboard';
import Reservation from './views/Reservation';

// Placeholder components for other routes
const OrderLine = () => <div><h1>restaurant</h1></div>;
const ManageTable = () => <div><h1>Menus</h1></div>;
const ManageDishes = () => <div><h1>Photo Dishes</h1></div>;
const Customers = () => <div><h1>Customers</h1></div>;
const Settings = () => <div><h1>Settings</h1></div>;
const HelpCenter = () => <div><h1>Help Center</h1></div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reservations" element={<Reservation />} />
          <Route path="/restaurant" element={<OrderLine />} />
          <Route path="/restaurant/restaurant" element={<ManageTable />} />
          <Route path="/restaurant/photo" element={<ManageDishes />} />
          <Route path="/restaurant/menu" element={<Customers />} />
          <Route path="/profile/edit" element={<Settings />} />
          <Route path="/profile/view" element={<HelpCenter />} />
          <Route path="/dish" element={<HelpCenter />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;