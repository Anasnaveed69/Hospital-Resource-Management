const { sql, poolPromise } = require('../config/db');

class Hospital {
    // Patients
    static async getAllPatients() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().query('SELECT * FROM Patients');
        return result.recordset;
    }

    static async registerPatient(patientId, name, admissionDate, diagnosis) {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request()
            .input('PatientID', sql.Int, patientId)
            .input('Name', sql.VarChar(255), name)
            .input('AdmissionDate', sql.Date, admissionDate)
            .input('Diagnosis', sql.VarChar(255), diagnosis)
            .execute('RegisterPatient');
        return { message: `Patient ${patientId} registration attempted` };
    }

    static async dischargePatient(patientId, dischargeDate) {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request()
            .input('PatientID', sql.Int, patientId)
            .input('DischargeDate', sql.Date, dischargeDate)
            .execute('DischargePatient');
        return { message: `Discharge attempted for patient ${patientId}` };
    }

    static async getPatientHistory(patientId) {
        try {
          const pool = await poolPromise;
          if (!pool) throw new Error('Database pool is not initialized');
    
          const result = await pool.request()
            .input('patient_id', sql.Int, patientId)
            .execute('GetPatientHistory');
    
          // Check for error result
          if (result.recordsets[0][0]?.result === 'error') {
            throw new Error(result.recordsets[0][0].message);
          }
    
          // Format response for PatientHistory.jsx
          return {
            patientInfo: result.recordsets[0] || [],
            appointments: result.recordsets[1] || []
          };
        } catch (err) {
          throw new Error(`Database error: ${err.message}`);
        }
      }
    // Room
    static async getAllRooms() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().query('SELECT * FROM Room');
        return result.recordset;
    }

    // Beds
    static async getAllBeds() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().query('SELECT * FROM Beds');
        return result.recordset;
    }

    static async trackBedOccupancy() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().execute('TrackBedOccupancy');
        return result.recordset;
    }

    static async assignBedToPatient(patientId) {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request()
            .input('patient_id', sql.Int, patientId)
            .execute('AssignBedToPatient');
        return { message: `Bed assignment attempted for patient ${patientId}` };
    }

    // Medical Equipment
    static async getAllEquipment() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().query('SELECT * FROM Medical_Equipment');
        return result.recordset;
    }

    static async trackMedicalEquipment() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().execute('TrackMedicalEquipment');
        return result.recordset;
    }

    // Staff
    static async getAllStaff() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().query('SELECT * FROM Staff');
        return result.recordset;
    }

    static async trackStaffAvailability() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().execute('TrackStaffAvailability');
        return result.recordset;
    }

    static async staffPerformanceReport() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().execute('StaffPerformanceReport');
        return result.recordset;
    }

    // Appointments
    static async getAllAppointments() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().query('SELECT * FROM Appointments');
        return result.recordset;
    }

    static async scheduleAppointment(patientId, doctorId, appointmentDate) {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request()
            .input('patient_id', sql.Int, patientId)
            .input('doctor_id', sql.Int, doctorId)
            .input('appointment_date', sql.DateTime, appointmentDate)
            .execute('ScheduleAppointment');
        return { message: 'Appointment scheduled' };
    }

    static async assignDoctorToPatient(patientId, doctorId, appointmentDate) {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request()
            .input('PatientID', sql.Int, patientId)
            .input('DoctorID', sql.Int, doctorId)
            .input('AppointmentDate', sql.DateTime, appointmentDate)
            .execute('AssignDoctorToPatient');
        return { message: `Doctor assigned to patient ${patientId}` };
    }

    static async viewPatientAssignments() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().execute('ViewPatientAssignments');
        return result.recordset;
    }

    // Scheduling
    static async getAllSchedules() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().query('SELECT * FROM Scheduling');
        return result.recordset;
    }

    // AlertsReports
    static async getAllAlerts() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().query('SELECT * FROM AlertsReports');
        return result.recordset;
    }

    // Billing
    static async getAllBills() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().query('SELECT * FROM Billing');
        return result.recordset;
    }

    static async generateBill(billId, patientId, totalAmount, paidAmount) {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request()
            .input('BillID', sql.Int, billId)
            .input('PatientID', sql.Int, patientId)
            .input('TotalAmount', sql.Decimal(8, 2), totalAmount)
            .input('PaidAmount', sql.Decimal(8, 2), paidAmount)
            .execute('GenerateBill');
        return { message: `Bill ${billId} generated` };
    }

    static async payBill(billId, paymentAmount) {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request()
            .input('BillID', sql.Int, billId)
            .input('PaymentAmount', sql.Decimal(8, 2), paymentAmount)
            .execute('PayBill');
        return { message: `Payment of ${paymentAmount} recorded for bill ${billId}` };
    }

    static async getMonthlyRevenue() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().execute('GetMonthlyRevenue');
        return result.recordset;
    }

    // Pharmacy
    static async getAllPharmacy() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().query('SELECT * FROM Pharmacy');
        return result.recordset;
    }

    static async checkLowStock() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().execute('CheckLowStock');
        return result.recordset;
    }

    static async checkExpiredMedicines() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().execute('CheckExpiredMedicines');
        return result.recordset;
    }

    static async insertMedicineIfLowStock(medicationId, name, quantity, price, expiryDate) {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request()
            .input('Medication_ID', sql.Int, medicationId)
            .input('Name', sql.VarChar(255), name)
            .input('Quantity', sql.Int, quantity)
            .input('Price', sql.Decimal(8, 2), price)
            .input('Expiry_Date', sql.Date, expiryDate)
            .execute('InsertMedicineIfLowStock');
        return { message: `Medicine ${name} stock update attempted` };
    }

    static async checkLowStockMedicines() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().execute('CheckLowStockMedicines');
        return result.recordset;
    }

    // LaboratoryTests
    static async getAllLabTests() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().query('SELECT * FROM LaboratoryTests');
        return result.recordset;
    }

    // PatientFeedback
    static async getAllFeedback() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().query('SELECT * FROM PatientFeedback');
        return result.recordset;
    }

    // AmbulanceServices
    static async getAllAmbulanceServices() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().query('SELECT * FROM AmbulanceServices');
        return result.recordset;
    }

    // Registration
    static async getAllRegistrations() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().query('SELECT * FROM Registration');
        return result.recordset;
    }

    // Security
    static async getAllSecurity() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().query('SELECT * FROM Security');
        return result.recordset;
    }

    static async viewSecurityIncidents() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().execute('ViewSecurityIncidents');
        return result.recordset;
    }

    static async logSecurityIncident(incidentType, description, handleBy) {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request()
            .input('IncidentType', sql.VarChar(255), incidentType)
            .input('Description', sql.Text, description)
            .input('HandleBy', sql.Int, handleBy)
            .execute('LogSecurityIncident');
        return { message: 'Security incident logged' };
    }

    // SalaryStructure
    static async getAllSalaryStructures() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().query('SELECT * FROM SalaryStructure');
        return result.recordset;
    }

    // StaffSalaries
    static async getAllStaffSalaries() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().query('SELECT * FROM StaffSalaries');
        return result.recordset;
    }

    static async processSalaries() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().execute('ProcessSalaries');
        return { message: 'Salaries processed' };
    }

    static async getStaffSalaryReport() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().execute('GetStaffSalaryReport');
        return result.recordset;
    }

    static async getTopPaidStaff() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().execute('GetTopPaidStaff');
        return result.recordset;
    }

    // Payroll
    static async getAllPayroll() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().query('SELECT * FROM Payroll');
        return result.recordset;
    }

    static async totalSalariesPaid() {
        const pool = await poolPromise;
                if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().execute('TotalSalariesPaid');
        return result.recordset;
    }
}

module.exports = Hospital;