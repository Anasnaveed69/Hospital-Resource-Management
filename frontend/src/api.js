import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getPatients = () => api.get('/patients');
export const registerPatient = (data) => api.post('/register-patient', data);
export const dischargePatient = (data) => api.post('/discharge-patient', data);
export const getPatientHistory = async (patientId) => {
  if (!patientId || isNaN(patientId)) {
    throw new Error('Invalid Patient ID');
  }
  try {
    const response = await api.get(`/patient-history/${patientId}`);
    return response;
  } catch (err) {
    console.error('getPatientHistory error:', err);
    throw err;
  }
};
export const getRooms = () => api.get('/rooms');
export const getBeds = () => api.get('/beds');
export const getBedOccupancy = () => api.get('/bed-occupancy');
export const assignBed = (data) => api.post('/assign-bed', data);
export const getEquipment = () => api.get('/equipment');
export const trackEquipment = () => api.get('/track-equipment');
export const getStaff = () => api.get('/staff');
export const getStaffAvailability = () => api.get('/staff-availability');
export const getStaffPerformance = () => api.get('/staff-performance');
export const getAppointments = () => api.get('/appointments');
export const scheduleAppointment = (data) => api.post('/schedule-appointment', data);
export const assignDoctor = (data) => api.post('/assign-doctor', data);
export const getPatientAssignments = () => api.get('/patient-assignments');
export const getSchedules = () => api.get('/schedules');
export const getAlerts = () => api.get('/alerts');
export const getBills = () => api.get('/bills');
export const generateBill = (data) => api.post('/generate-bill', data);
export const payBill = (data) => api.post('/pay-bill', data);
export const getMonthlyRevenue = () => api.get('/monthly-revenue');
export const getPharmacy = () => api.get('/pharmacy');
export const getLowStock = () => api.get('/low-stock');
export const getExpiredMedicines = () => api.get('/expired-medicines');
export const insertMedicine = (data) => api.post('/insert-medicine', data);
export const getLowStockMedicines = () => api.get('/low-stock-medicines');
export const getLabTests = () => api.get('/lab-tests');
export const getFeedback = () => api.get('/feedback');
export const getAmbulanceServices = () => api.get('/ambulance-services');
export const getRegistrations = () => api.get('/registrations');
export const getSecurity = () => api.get('/security');
export const getSecurityIncidents = () => api.get('/security-incidents');
export const logSecurityIncident = (data) => api.post('/log-security-incident', data);
export const getSalaryStructures = () => api.get('/salary-structures');
export const getStaffSalaries = () => api.get('/staff-salaries');
export const processSalaries = (data) => api.post('/process-salaries', data);
export const getStaffSalaryReport = () => api.get('/staff-salary-report');
export const getTopPaidStaff = () => api.get('/top-paid-staff');
export const getPayroll = () => api.get('/payroll');
export const getTotalSalariesPaid = () => api.get('/total-salaries-paid');