const { sql, poolPromise } = require('../config/db');

class Hospital {
    // Patients
    static async getAllPatients() {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request().query('SELECT * FROM Patients');
        return result.recordset;
    }

    static async registerPatient(patientId, name, admissionDate, dischargeDate, diagnosis) {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');
    
        const result = await pool.request()
            .input('PatientID', sql.Int, patientId)
            .input('Name', sql.VarChar(255), name)
            .input('AdmissionDate', sql.Date, admissionDate)
            .input('DischargeDate', sql.Date, dischargeDate || null)
            .input('Diagnosis', sql.VarChar(255), diagnosis)
            .execute('RegisterPatient');
        return { message: `Patient ${patientId} registered successfully` };
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

    static async assignBed(patientId, bedId) {
        try {
          const pool = await poolPromise;
          if (!pool) throw new Error('Database pool is not initialized');
    
          console.log('Raw inputs to AssignBed:', { patientId, bedId });
    
          const request = pool.request();
          request.input('PatientID', sql.Int, patientId);
          request.input('BedID', sql.Int, bedId);
    
          const result = await request.execute('AssignBed');
    
          console.log('AssignBed result:', result);
    
          return { message: 'Bed assigned successfully' };
        } catch (err) {
          console.error('Database error in assignBed:', err.message);
          throw new Error(`Failed to assign bed: ${err.message}`);
        }
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

    static async addEquipment(equipmentId, name, location, availability) {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request()
            .input('EquipmentID', sql.Int, equipmentId)
            .input('Name', sql.VarChar(255), name)
            .input('Location', sql.VarChar(255), location)
            .input('Availability', sql.VarChar(255), availability)
            .execute('AddEquipment');

        return { message: `Equipment ${name} added successfully` };
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

    static async addStaffWithSalary(staffId, name, role, availability, baseSalary, allowances, deductions) {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request()
            .input('Staff_Id', sql.Int, staffId)
            .input('Name', sql.VarChar(255), name)
            .input('Role', sql.VarChar(255), role)
            .input('Availability', sql.VarChar(255), availability || 'Available')
            
            .execute('AddStaffMember');

        return {
            message: result.recordset[0]?.Message || `Staff ${name} added successfully`,
            staff: result.recordsets[1]?.[0],
            salaryStructure: result.recordsets[2]?.[0]
        };
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

    static async assignDoctorToPatient(patientId, doctorId, startTime, endTime) {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');
    
        const result = await pool.request()
            .input('PatientID', sql.Int, patientId)
            .input('StaffID', sql.Int, doctorId) // Assuming StaffID in DB corresponds to doctorId
            .input('StartTime', sql.DateTime, startTime)
            .input('EndTime', sql.DateTime, endTime)
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

    static async addAlertReport(type, description, timestamp) {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');

        const result = await pool.request()
            .input('Type', sql.VarChar(255), type)
            .input('Description', sql.Text, description)
            .input('Timestamp', sql.DateTime, timestamp || null)
            .execute('AddAlertReport');

        return {
            message: result.recordset[0]?.Result || 'Alert report added successfully',
            alert: result.recordsets[0]?.[0]
        };
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
        try {
            const pool = await poolPromise;
            if (!pool) throw new Error('Database pool is not initialized');
    
            // Log raw inputs
            console.log('Raw inputs to insertMedicineIfLowStock:', {
                medicationId,
                name,
                quantity,
                price,
                expiryDate,
            });
    
            // Validate inputs
            const medId = parseInt(medicationId, 10);
            if (!medicationId || isNaN(medId) || medId <= 0) {
                throw new Error('Medication ID is required and must be a positive integer');
            }
            if (!name || name.trim() === '') {
                throw new Error('Name is required');
            }
            const qty = parseInt(quantity, 10);
            if (!quantity || isNaN(qty) || qty < 0) {
                throw new Error('Quantity must be a non-negative integer');
            }
            const prc = parseFloat(price);
            if (!price || isNaN(prc) || prc <= 0) {
                throw new Error('Price must be positive');
            }
            if (!expiryDate || isNaN(Date.parse(expiryDate))) {
                throw new Error('Expiry Date is required and must be a valid date');
            }
    
            const processedInputs = {
                Medication_ID: medId,
                Name: name.trim(),
                Quantity: qty,
                Price: prc,
                Expiry_Date: expiryDate,
            };
            console.log('Executing InsertMedicineIfLowStock with:', processedInputs);
    
            const result = await pool.request()
                .input('Medication_ID', sql.Int, medId)
                .input('Name', sql.VarChar(255), name.trim())
                .input('Quantity', sql.Int, qty)
                .input('Price', sql.Decimal(8, 2), prc)
                .input('Expiry_Date', sql.Date, new Date(expiryDate))
                .execute('InsertMedicineIfLowStock');
            return { message: `Medicine ${name.trim()} stock update attempted` };
        } catch (err) {
            throw new Error(`Database error: ${err.message}`);
        }
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
    static async processSalaries(salaryId) {
        const pool = await poolPromise;
        if (!pool) throw new Error('Database pool is not initialized');
    
        const result = await pool.request()
            .input('SalaryID', sql.Int, salaryId)
            .execute('ProcessSalaries');
        return { message: `Salary processed for SalaryID ${salaryId}` };
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