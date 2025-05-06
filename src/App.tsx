import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './views/Dashboard';
import Reservation from './views/Reservation';
import Register from './views/auth/Register';
import Login from './views/auth/Login';
import ProtectedRoute from './components/ProtectedRoute'; // ⬅️ Import this

// Placeholder components for other routes
const OrderLine = () => <div><h1>restaurant</h1></div>;

function App() {
  return (
    <Router>
      <Routes>
        {/* Protected Routes inside MainLayout */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/reservations" element={<Reservation />} />
          <Route path="/restaurant" element={<OrderLine />} />
        </Route>

        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;