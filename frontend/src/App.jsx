import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import RegisterPatient from './pages/RegisterPatient';
import Patients from './pages/Patients';
import PatientHistory from './pages/PatientHistory';
import AssignBed from './pages/AssignBed';
import ScheduleAppointment from './pages/ScheduleAppointment';
import Bills from './pages/Bills';
import Rooms from './pages/Rooms';
import Beds from './pages/Beds';
import BedOccupancy from './pages/BedOccupancy';
import Equipment from './pages/Equipment';
import TrackEquipment from './pages/TrackEquipment';
import Staff from './pages/Staff';
import StaffAvailability from './pages/StaffAvailability';
import StaffPerformance from './pages/StaffPerformance';
import Appointments from './pages/Appointments';
import AssignDoctor from './pages/AssignDoctor';
import PatientAssignments from './pages/PatientAssignments';
import Schedules from './pages/Schedules';
import Alerts from './pages/Alerts';
import MonthlyRevenue from './pages/MonthlyRevenue';
import Pharmacy from './pages/Pharmacy';
import LowStock from './pages/LowStock';
import ExpiredMedicines from './pages/ExpiredMedicines';
import LowStockMedicines from './pages/LowStockMedicines';
import LabTests from './pages/LabTests';
import Feedback from './pages/Feedback';
import AmbulanceServices from './pages/AmbulanceServices';
import Registrations from './pages/Registrations';
import Security from './pages/Security';
import SecurityIncidents from './pages/SecurityIncidents';
import SalaryStructures from './pages/SalaryStructures';
import StaffSalaries from './pages/StaffSalaries';
import StaffSalaryReport from './pages/StaffSalaryReport';
import TopPaidStaff from './pages/TopPaidStaff';
import Payroll from './pages/Payroll';
import TotalSalariesPaid from './pages/TotalSalariesPaid';
import ProtectedRoute from './components/ProtectedRoute';

function Layout({ children }) {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Container sx={{ mt: hideNavbar ? 0 : 4 }}>
        {children}
      </Container>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="register-patient" element={<ProtectedRoute><RegisterPatient /></ProtectedRoute>} />
                <Route path="patients" element={<ProtectedRoute><Patients /></ProtectedRoute>} />
                <Route path="patient-history" element={<ProtectedRoute><PatientHistory /></ProtectedRoute>} />
                <Route path="assign-bed" element={<ProtectedRoute><AssignBed /></ProtectedRoute>} />
                <Route path="schedule-appointment" element={<ProtectedRoute><ScheduleAppointment /></ProtectedRoute>} />
                <Route path="bills" element={<ProtectedRoute><Bills /></ProtectedRoute>} />
                <Route path="rooms" element={<ProtectedRoute><Rooms /></ProtectedRoute>} />
                <Route path="beds" element={<ProtectedRoute><Beds /></ProtectedRoute>} />
                <Route path="bed-occupancy" element={<ProtectedRoute><BedOccupancy /></ProtectedRoute>} />
                <Route path="equipment" element={<ProtectedRoute><Equipment /></ProtectedRoute>} />
                <Route path="track-equipment" element={<ProtectedRoute><TrackEquipment /></ProtectedRoute>} />
                <Route path="staff" element={<ProtectedRoute><Staff /></ProtectedRoute>} />
                <Route path="staff-availability" element={<ProtectedRoute><StaffAvailability /></ProtectedRoute>} />
                <Route path="staff-performance" element={<ProtectedRoute><StaffPerformance /></ProtectedRoute>} />
                <Route path="appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
                <Route path="assign-doctor" element={<ProtectedRoute><AssignDoctor /></ProtectedRoute>} />
                <Route path="patient-assignments" element={<ProtectedRoute><PatientAssignments /></ProtectedRoute>} />
                <Route path="schedules" element={<ProtectedRoute><Schedules /></ProtectedRoute>} />
                <Route path="alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
                <Route path="monthly-revenue" element={<ProtectedRoute><MonthlyRevenue /></ProtectedRoute>} />
                <Route path="pharmacy" element={<ProtectedRoute><Pharmacy /></ProtectedRoute>} />
                <Route path="low-stock" element={<ProtectedRoute><LowStock /></ProtectedRoute>} />
                <Route path="expired-medicines" element={<ProtectedRoute><ExpiredMedicines /></ProtectedRoute>} />
                <Route path="low-stock-medicines" element={<ProtectedRoute><LowStockMedicines /></ProtectedRoute>} />
                <Route path="lab-tests" element={<ProtectedRoute><LabTests /></ProtectedRoute>} />
                <Route path="feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
                <Route path="ambulance-services" element={<ProtectedRoute><AmbulanceServices /></ProtectedRoute>} />
                <Route path="registrations" element={<ProtectedRoute><Registrations /></ProtectedRoute>} />
                <Route path="security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
                <Route path="security-incidents" element={<ProtectedRoute><SecurityIncidents /></ProtectedRoute>} />
                <Route path="salary-structures" element={<ProtectedRoute><SalaryStructures /></ProtectedRoute>} />
                <Route path="staff-salaries" element={<ProtectedRoute><StaffSalaries /></ProtectedRoute>} />
                <Route path="staff-salary-report" element={<ProtectedRoute><StaffSalaryReport /></ProtectedRoute>} />
                <Route path="top-paid-staff" element={<ProtectedRoute><TopPaidStaff /></ProtectedRoute>} />
                <Route path="payroll" element={<ProtectedRoute><Payroll /></ProtectedRoute>} />
                <Route path="total-salaries-paid" element={<ProtectedRoute><TotalSalariesPaid /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/home" replace />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
