const express = require('express');
const router = express.Router();
const HospitalController = require('../controllers/controller');

// Patients
router.get('/patients', HospitalController.getAllPatients);
router.post('/register-patient', HospitalController.registerPatient);
router.post('/discharge-patient', HospitalController.dischargePatient);
router.get('/patient-history/:patientId', HospitalController.getPatientHistory);

// Room
router.get('/rooms', HospitalController.getAllRooms);

// Beds
router.get('/beds', HospitalController.getAllBeds);
router.get('/bed-occupancy', HospitalController.trackBedOccupancy);
router.post('/assign-bed', HospitalController.assignBed);

// Medical Equipment
router.get('/equipment', HospitalController.getAllEquipment);
router.get('/track-equipment', HospitalController.trackMedicalEquipment);

// Staff
router.get('/staff', HospitalController.getAllStaff);
router.get('/staff-availability', HospitalController.trackStaffAvailability);
router.get('/staff-performance', HospitalController.staffPerformanceReport);

// Appointments
router.get('/appointments', HospitalController.getAllAppointments);
router.post('/schedule-appointment', HospitalController.scheduleAppointment);
router.post('/assign-doctor', HospitalController.assignDoctorToPatient);
router.get('/patient-assignments', HospitalController.viewPatientAssignments);

// Scheduling
router.get('/schedules', HospitalController.getAllSchedules);

// AlertsReports
router.get('/alerts', HospitalController.getAllAlerts);

// Billing
router.get('/bills', HospitalController.getAllBills);
router.post('/generate-bill', HospitalController.generateBill);
router.post('/pay-bill', HospitalController.payBill);
router.get('/monthly-revenue', HospitalController.getMonthlyRevenue);

// Pharmacy
router.get('/pharmacy', HospitalController.getAllPharmacy);
router.get('/low-stock', HospitalController.checkLowStock);
router.get('/expired-medicines', HospitalController.checkExpiredMedicines);
router.post('/insert-medicine', HospitalController.insertMedicineIfLowStock);
router.get('/low-stock-medicines', HospitalController.checkLowStockMedicines);

// LaboratoryTests
router.get('/lab-tests', HospitalController.getAllLabTests);

// PatientFeedback
router.get('/feedback', HospitalController.getAllFeedback);

// AmbulanceServices
router.get('/ambulance-services', HospitalController.getAllAmbulanceServices);

// Registration
router.get('/registrations', HospitalController.getAllRegistrations);

// Security
router.get('/security', HospitalController.getAllSecurity);
router.get('/security-incidents', HospitalController.viewSecurityIncidents);
router.post('/log-security-incident', HospitalController.logSecurityIncident);

// SalaryStructure
router.get('/salary-structures', HospitalController.getAllSalaryStructures);

// StaffSalaries
router.get('/staff-salaries', HospitalController.getAllStaffSalaries);
router.post('/process-salaries', HospitalController.processSalaries);
router.get('/staff-salary-report', HospitalController.getStaffSalaryReport);
router.get('/top-paid-staff', HospitalController.getTopPaidStaff);


// Payroll
router.get('/payroll', HospitalController.getAllPayroll);
router.get('/total-salaries-paid', HospitalController.totalSalariesPaid);

module.exports = router;