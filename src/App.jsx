import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './features/auth/context/AuthContext';
import Login from './features/auth/pages/Login';
import MainLayout from './shared/components/layout/MainLayout';
import Dashboard from './features/dashboard/pages/Dashboard';
import Finances from './features/finances/pages/Finances';
import Security from './features/security/pages/Security';
import Users from './features/users/pages/Users';
import Units from './features/users/pages/UnitsPage';
import CommonAreas from './features/common-areas/pages/CommonAreas';
import Communications from './features/communications/pages/Communications';
import Maintenance from './features/maintenance/pages/Maintenance';
import Reports from './features/dashboard/pages/Reports';
import './styles/index.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
      }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="finances" element={<Finances />} />
        <Route path="users" element={<Users />} />
        <Route path="units" element={<Units />} />
        <Route path="security" element={<Security />} />
        <Route path="common-areas" element={<CommonAreas />} />
        <Route path="communications" element={<Communications />} />
        <Route path="maintenance" element={<Maintenance />} />
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
