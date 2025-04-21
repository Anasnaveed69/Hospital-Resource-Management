import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Navbar from './components/Navbar';
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
  return (
    <Router>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register-patient" element={<RegisterPatient />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patient-history" element={<PatientHistory />} />
          <Route path="/assign-bed" element={<AssignBed />} />
          <Route path="/schedule-appointment" element={<ScheduleAppointment />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/beds" element={<Beds />} />
          <Route path="/bed-occupancy" element={<BedOccupancy />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/track-equipment" element={<TrackEquipment />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/staff-availability" element={<StaffAvailability />} />
          <Route path="/staff-performance" element={<StaffPerformance />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/assign-doctor" element={<AssignDoctor />} />
          <Route path="/patient-assignments" element={<PatientAssignments />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/monthly-revenue" element={<MonthlyRevenue />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/low-stock" element={<LowStock />} />
          <Route path="/expired-medicines" element={<ExpiredMedicines />} />
          <Route path="/low-stock-medicines" element={<LowStockMedicines />} />
          <Route path="/lab-tests" element={<LabTests />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/ambulance-services" element={<AmbulanceServices />} />
          <Route path="/registrations" element={<Registrations />} />
          <Route path="/security" element={<Security />} />
          <Route path="/security-incidents" element={<SecurityIncidents />} />
          <Route path="/salary-structures" element={<SalaryStructures />} />
          <Route path="/staff-salaries" element={<StaffSalaries />} />
          <Route path="/staff-salary-report" element={<StaffSalaryReport />} />
          <Route path="/top-paid-staff" element={<TopPaidStaff />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/total-salaries-paid" element={<TotalSalariesPaid />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;