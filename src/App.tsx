import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './lib/store';
import Landing from './pages/Landing';
import Login from './pages/Login';
import AttendeeDashboard from './pages/AttendeeDashboard';
import StaffDashboard from './pages/StaffDashboard';
import AttendeeTicket from './pages/attendee/Ticket';
import AttendeeDining from './pages/attendee/Dining';
import AttendeeSettings from './pages/attendee/Settings';
import TestingDashboard from './pages/TestingDashboard';
import SecurityPanel from './pages/SecurityPanel';
import StaffAlerts from './pages/staff/Alerts';
import StaffAnnouncements from './pages/staff/Announcements';
import { ReactNode, useEffect } from 'react';

function ProtectedRoute({ children, allowedRole }: { children: ReactNode, allowedRole?: 'attendee' | 'staff' }) {
  const user = useStore(state => state.user);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'staff' ? '/staff/dashboard' : '/attendee/dashboard'} replace />;
  }

  return <>{children}</>;
}

export default function App() {
  const theme = useStore(state => state.theme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        
        <Route 
          path="/attendee/dashboard" 
          element={
            <ProtectedRoute allowedRole="attendee">
              <AttendeeDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/attendee/ticket" 
          element={
            <ProtectedRoute allowedRole="attendee">
              <AttendeeTicket />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/attendee/dining" 
          element={
            <ProtectedRoute allowedRole="attendee">
              <AttendeeDining />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/attendee/settings" 
          element={
            <ProtectedRoute allowedRole="attendee">
              <AttendeeSettings />
            </ProtectedRoute>
          } 
        />
        <Route path="/testing" element={<TestingDashboard />} />
        <Route path="/security" element={<SecurityPanel />} />
        
        <Route 
          path="/staff/dashboard" 
          element={
            <ProtectedRoute allowedRole="staff">
              <StaffDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/staff/alerts" 
          element={
            <ProtectedRoute allowedRole="staff">
              <StaffAlerts />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/staff/announcements" 
          element={
            <ProtectedRoute allowedRole="staff">
              <StaffAnnouncements />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
