const Hospital = require('../models/model');

class HospitalController {
    // Patients
    static async getAllPatients(req, res) {
        try {
            const patients = await Hospital.getAllPatients();
            res.status(200).json(patients);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async registerPatient(req, res) {
        try {
            const { patientId, name, admissionDate, diagnosis } = req.body;
            const result = await Hospital.registerPatient(patientId, name, admissionDate, diagnosis);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async dischargePatient(req, res) {
        try {
            const { patientId, dischargeDate } = req.body;
            const result = await Hospital.dischargePatient(patientId, dischargeDate);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getPatientHistory(req, res) {
        try {
            const { patientId } = req.params;
            const patientIdNum = parseInt(patientId, 10);
            if (isNaN(patientIdNum)) {
                return res.status(400).json({ error: 'Invalid patientId: must be a number' });
            }
            const history = await Hospital.getPatientHistory(patientIdNum);
            res.status(200).json(history);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    // Room
    static async getAllRooms(req, res) {
        try {
            const rooms = await Hospital.getAllRooms();
            res.status(200).json(rooms);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Beds
    static async getAllBeds(req, res) {
        try {
            const beds = await Hospital.getAllBeds();
            res.status(200).json(beds);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async trackBedOccupancy(req, res) {
        try {
            const bedOccupancy = await Hospital.trackBedOccupancy();
            res.status(200).json(bedOccupancy);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async assignBed(req, res) {
        try {
          const { patientId, bedId } = req.body;
          console.log('Assign bed request:', req.body);
    
          if (!patientId || isNaN(patientId) || patientId <= 0) {
            return res.status(400).json({ error: 'PatientID is required and must be a positive integer' });
          }
          if (!bedId || isNaN(bedId) || bedId <= 0) {
            return res.status(400).json({ error: 'BedID is required and must be a positive integer' });
          }
    
          const result = await Hospital.assignBed(patientId, bedId);
          res.status(200).json({ message: 'Bed assigned successfully' });
        } catch (error) {
          console.error('Error in assignBed:', error.message);
          res.status(500).json({ error: error.message });
        }
      }
    

    // Medical Equipment
    static async getAllEquipment(req, res) {
        try {
            const equipment = await Hospital.getAllEquipment();
            res.status(200).json(equipment);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async trackMedicalEquipment(req, res) {
        try {
            const equipmentAvailability = await Hospital.trackMedicalEquipment();
            res.status(200).json(equipmentAvailability);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Staff
    static async getAllStaff(req, res) {
        try {
            const staff = await Hospital.getAllStaff();
            res.status(200).json(staff);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    

    static async trackStaffAvailability(req, res) {
        try {
            const staffAvailability = await Hospital.trackStaffAvailability();
            res.status(200).json(staffAvailability);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async staffPerformanceReport(req, res) {
        try {
            const report = await Hospital.staffPerformanceReport();
            res.status(200).json(report);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Appointments
    static async getAllAppointments(req, res) {
        try {
            const appointments = await Hospital.getAllAppointments();
            res.status(200).json(appointments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async scheduleAppointment(req, res) {
        try {
            const { patientId, doctorId, appointmentDate } = req.body;
            const result = await Hospital.scheduleAppointment(patientId, doctorId, appointmentDate);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async assignDoctorToPatient(req, res) {
        try {
            const { patientId, doctorId, appointmentDate } = req.body;
            const result = await Hospital.assignDoctorToPatient(patientId, doctorId, appointmentDate);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async viewPatientAssignments(req, res) {
        try {
            const assignments = await Hospital.viewPatientAssignments();
            res.status(200).json(assignments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Scheduling
    static async getAllSchedules(req, res) {
        try {
            const schedules = await Hospital.getAllSchedules();
            res.status(200).json(schedules);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // AlertsReports
    static async getAllAlerts(req, res) {
        try {
            const alerts = await Hospital.getAllAlerts();
            res.status(200).json(alerts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Billing
    static async getAllBills(req, res) {
        try {
            const bills = await Hospital.getAllBills();
            res.status(200).json(bills);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async generateBill(req, res) {
        try {
            const { billId, patientId, totalAmount, paidAmount } = req.body;
            const result = await Hospital.generateBill(billId, patientId, totalAmount, paidAmount);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async payBill(req, res) {
        try {
            const { billId, paymentAmount } = req.body;
            const result = await Hospital.payBill(billId, paymentAmount);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getMonthlyRevenue(req, res) {
        try {
            const revenue = await Hospital.getMonthlyRevenue();
            res.status(200).json(revenue);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Pharmacy
    static async getAllPharmacy(req, res) {
        try {
            const pharmacy = await Hospital.getAllPharmacy();
            res.status(200).json(pharmacy);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async checkLowStock(req, res) {
        try {
            const lowStock = await Hospital.checkLowStock();
            res.status(200).json(lowStock);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async checkExpiredMedicines(req, res) {
        try {
            const expired = await Hospital.checkExpiredMedicines();
            res.status(200).json(expired);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async insertMedicineIfLowStock(req, res) {
        try {
            const { medication_ID, name, quantity, price, expiry_Date } = req.body;
            console.log('Insert medicine request:', req.body); // Debug log
    
            // Validate inputs
            const medId = parseInt(medication_ID, 10);
            if (!medication_ID || isNaN(medId) || medId <= 0) {
                return res.status(400).json({ error: 'Medication ID is required and must be a positive integer' });
            }
            if (!name || name.trim() === '') {
                return res.status(400).json({ error: 'Name is required' });
            }
            const qty = parseInt(quantity, 10);
            if (!quantity || isNaN(qty) || qty < 0) {
                return res.status(400).json({ error: 'Quantity must be a non-negative integer' });
            }
            const prc = parseFloat(price);
            if (!price || isNaN(prc) || prc <= 0) {
                return res.status(400).json({ error: 'Price must be positive' });
            }
            if (!expiry_Date || isNaN(Date.parse(expiry_Date))) {
                return res.status(400).json({ error: 'Expiry Date is required and must be a valid date' });
            }
    
            const processedInputs = {
                medication_ID: medId,
                name: name.trim(),
                quantity: qty,
                price: prc,
                expiry_Date,
            };
            console.log('Calling Hospital.insertMedicineIfLowStock with:', processedInputs); // Debug log
    
            const result = await Hospital.insertMedicineIfLowStock(medId, name.trim(), qty, prc, expiry_Date);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error in insertMedicineIfLowStock:', error.message); // Debug log
            res.status(500).json({ error: error.message });
        }
    }
    
    static async checkLowStockMedicines(req, res) {
        try {
            const lowStock = await Hospital.checkLowStockMedicines();
            res.status(200).json(lowStock);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // LaboratoryTests
    static async getAllLabTests(req, res) {
        try {
            const tests = await Hospital.getAllLabTests();
            res.status(200).json(tests);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // PatientFeedback
    static async getAllFeedback(req, res) {
        try {
            const feedback = await Hospital.getAllFeedback();
            res.status(200).json(feedback);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // AmbulanceServices
    static async getAllAmbulanceServices(req, res) {
        try {
            const services = await Hospital.getAllAmbulanceServices();
            res.status(200).json(services);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Registration
    static async getAllRegistrations(req, res) {
        try {
            const registrations = await Hospital.getAllRegistrations();
            res.status(200).json(registrations);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Security
    static async getAllSecurity(req, res) {
        try {
            const security = await Hospital.getAllSecurity();
            res.status(200).json(security);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async viewSecurityIncidents(req, res) {
        try {
            const incidents = await Hospital.viewSecurityIncidents();
            res.status(200).json(incidents);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async logSecurityIncident(req, res) {
        try {
            const { incidentType, description, handleBy } = req.body;
            const result = await Hospital.logSecurityIncident(incidentType, description, handleBy);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // SalaryStructure
    static async getAllSalaryStructures(req, res) {
        try {
            const structures = await Hospital.getAllSalaryStructures();
            res.status(200).json(structures);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // StaffSalaries
    static async getAllStaffSalaries(req, res) {
        try {
            const salaries = await Hospital.getAllStaffSalaries();
            res.status(200).json(salaries);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async processSalaries(req, res) {
        try {
            const result = await Hospital.processSalaries();
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getStaffSalaryReport(req, res) {
        try {
            const report = await Hospital.getStaffSalaryReport();
            res.status(200).json(report);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getTopPaidStaff(req, res) {
        try {
            const topPaid = await Hospital.getTopPaidStaff();
            res.status(200).json(topPaid);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Payroll
    static async getAllPayroll(req, res) {
        try {
            const payroll = await Hospital.getAllPayroll();
            res.status(200).json(payroll);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async totalSalariesPaid(req, res) {
        try {
            const salaries = await Hospital.totalSalariesPaid();
            res.status(200).json(salaries);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = HospitalController;