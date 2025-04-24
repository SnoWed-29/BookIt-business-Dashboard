import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './views/Dashboard';

// Placeholder components for other routes
const OrderLine = () => <div><h1>Order Line</h1></div>;
const ManageTable = () => <div><h1>Manage Table</h1></div>;
const ManageDishes = () => <div><h1>Manage Dishes</h1></div>;
const Customers = () => <div><h1>Customers</h1></div>;
const Settings = () => <div><h1>Settings</h1></div>;
const HelpCenter = () => <div><h1>Help Center</h1></div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<OrderLine />} />
          <Route path="/tables" element={<ManageTable />} />
          <Route path="/dishes" element={<ManageDishes />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<HelpCenter />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;