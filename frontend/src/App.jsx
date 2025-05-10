import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
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

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: '#1976D2',
      },
      secondary: {
        main: '#43a047',
      },
    },
  });

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <Home />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/register-patient"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <RegisterPatient />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/patients"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <Patients />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient-history"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <PatientHistory />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/assign-bed"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <AssignBed />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedule-appointment"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <ScheduleAppointment />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/bills"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <Bills />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/rooms"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <Rooms />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/beds"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <Beds />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/bed-occupancy"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <BedOccupancy />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/equipment"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <Equipment />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/track-equipment"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <TrackEquipment />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <Staff />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff-availability"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <StaffAvailability />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff-performance"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <StaffPerformance />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <Appointments />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/assign-doctor"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <AssignDoctor />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/patient-assignments"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <PatientAssignments />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/schedules"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <Schedules />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/alerts"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <Alerts />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/monthly-revenue"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <MonthlyRevenue />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/pharmacy"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <Pharmacy />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/low-stock"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <LowStock />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/expired-medicines"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <ExpiredMedicines />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/low-stock-medicines"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <LowStockMedicines />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/lab-tests"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <LabTests />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <Feedback />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ambulance-services"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <AmbulanceServices />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/registrations"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <Registrations />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/security"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <Security />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/security-incidents"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <SecurityIncidents />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/salary-structures"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <SalaryStructures />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff-salaries"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <StaffSalaries />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff-salary-report"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <StaffSalaryReport />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/top-paid-staff"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <TopPaidStaff />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/payroll"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <Payroll />
                </Container>
              </ProtectedRoute>
            }
          />
          <Route
            path="/total-salaries-paid"
            element={
              <ProtectedRoute>
                <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
                <Container sx={{ mt: 4 }}>
                  <TotalSalariesPaid />
                </Container>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;