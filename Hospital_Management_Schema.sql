-- Patients Table

-- use HOSPITAL; -- Commented out for Azure SQL compatibility
CREATE TABLE Patients (
	PatientID INT NOT NULL,
    Name VARCHAR(255) NOT NULL,
    AdmissionDate DATE NOT NULL,
    Discharge_Date DATE NOT NULL,
    Diagnosis VARCHAR(255) NOT NULL
);
ALTER TABLE Patients ADD CONSTRAINT patients_patientid_primary PRIMARY KEY(PatientID);

-- Room Table
CREATE TABLE Room (
    RoomID INT NOT NULL,
    Room_Number VARCHAR(255) NOT NULL,
    Type VARCHAR(255) NOT NULL,
    Status VARCHAR(255) NOT NULL,
    number_of_Beds INT NOT NULL
);
ALTER TABLE Room ADD CONSTRAINT room_roomid_primary PRIMARY KEY(RoomID);

-- Beds Table
CREATE TABLE Beds (
    BedID INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    Type VARCHAR(255) NOT NULL,
    Assigned_To INT NOT NULL
);
ALTER TABLE Beds ADD CONSTRAINT beds_bedid_primary PRIMARY KEY(BedID);
ALTER TABLE Beds ADD CONSTRAINT beds_assigned_to_foreign FOREIGN KEY(Assigned_To) REFERENCES Patients(PatientID);

-- Medical_Equipment Table
CREATE TABLE Medical_Equipment (
    EquipmentID INT NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Location VARCHAR(255) NOT NULL,
    Availability VARCHAR(255) NOT NULL
);
ALTER TABLE "Medical_Equipment" ADD CONSTRAINT "medical_equipment_equipmentid_primary" PRIMARY KEY("EquipmentID");

-- Staff Table
-- Staff Table
CREATE TABLE Staff (
    Staff_Id INT NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Role VARCHAR(255) NOT NULL,
    Availability VARCHAR(255) NOT NULL,
    PRIMARY KEY (Staff_Id)
);

-- Appointments Table
CREATE TABLE Appointments (
    Appointments_ID INT NOT NULL,
    Patient_ID INT NOT NULL,
    Staff_ID INT NOT NULL,
    start_Time DATETIME NOT NULL,
    End_Time DATETIME NOT NULL,
    PRIMARY KEY (Appointments_ID),
    FOREIGN KEY (Patient_ID) REFERENCES Patients(PatientID),
    FOREIGN KEY (Staff_ID) REFERENCES Staff(Staff_Id)
);

-- Scheduling Table
CREATE TABLE Scheduling (
    Schedule_ID INT NOT NULL,
    Resources_ID INT NOT NULL,
    start_Time DATETIME NOT NULL,
    End_Time DATETIME NOT NULL,
    status VARCHAR(255) NOT NULL,
    PRIMARY KEY (Schedule_ID)
);

-- Alerts-Reports Table
CREATE TABLE AlertsReports (
    Alert_ID INT NOT NULL,
    Type VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL,
    Timestamp DATETIME NOT NULL,
    PRIMARY KEY (Alert_ID)
);

-- Billing Table
CREATE TABLE Billing (
    Bill_Id INT NOT NULL,
    Patient_Id INT NOT NULL,
    Total_Amount DECIMAL(8,2) NOT NULL,
    Paid_Amount DECIMAL(8,2) NOT NULL,
    Due_Amount DECIMAL(8,2) NOT NULL,
    Payment_Status VARCHAR(255) NOT NULL,
    BillingDate DATE NOT NULL,
    PRIMARY KEY (Bill_Id),
    FOREIGN KEY (Patient_Id) REFERENCES Patients(PatientID)
);

-- Pharmacy Table
CREATE TABLE Pharmacy (
    Medication_ID INT NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Quantity INT NOT NULL,
    Price DECIMAL(8,2) NOT NULL,
    Expiry_Date DATE NOT NULL,
    PRIMARY KEY (Medication_ID)
);

-- Laboratory Tests Table
CREATE TABLE LaboratoryTests (
    Test_Id INT NOT NULL,
    Test_Name VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL,
    Cost DECIMAL(8,2) NOT NULL,
    PRIMARY KEY (Test_Id)
);

-- Patient Feedback Table
CREATE TABLE PatientFeedback (
    Feedback_Id INT NOT NULL,
    Patient_Id INT NOT NULL,
    Feedback TEXT NOT NULL,
    Rating INT NOT NULL,
    Feedback_Date DATE NOT NULL,
    PRIMARY KEY (Feedback_Id),
    FOREIGN KEY (Patient_Id) REFERENCES Patients(PatientID)
);

-- Ambulance Services Table
CREATE TABLE AmbulanceServices (
    Service_ID INT NOT NULL,
    Patient_Id INT NOT NULL,
    Driver_Name VARCHAR(255) NOT NULL,
    Vehicle_Number VARCHAR(255) NOT NULL,
    Pickup_Location VARCHAR(255) NOT NULL,
    Drop_Location VARCHAR(255) NOT NULL,
    Service_Date DATE NOT NULL,
    PRIMARY KEY (Service_ID),
    FOREIGN KEY (Patient_Id) REFERENCES Patients(PatientID)
);

-- Registration Table
CREATE TABLE Registration (
    Registration_No INT NOT NULL,
    Patient_Id INT NOT NULL,
    Type VARCHAR(255) NOT NULL,
    PRIMARY KEY (Registration_No),
    FOREIGN KEY (Patient_Id) REFERENCES Patients(PatientID)
);

-- Security Table
CREATE TABLE Security (
    ID INT NOT NULL,
    Incident_Type VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL,
    Timestamp DATETIME NOT NULL,
    HandleBy INT NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (HandleBy) REFERENCES Staff(Staff_Id)
);

-- Parking Lots Table
CREATE TABLE ParkingLots (
    LotID INT PRIMARY KEY,
    LotName VARCHAR(255),
    TotalSpaces INT,
    AvailableSpaces INT,
    Location VARCHAR(255)
);

-- Salary Structure Table
CREATE TABLE SalaryStructure (
    RoleID INT PRIMARY KEY,
    RoleName VARCHAR(50),
    BaseSalary DECIMAL(10,2),
    Allowances DECIMAL(10,2),
    Deductions DECIMAL(10,2),
    NetSalary DECIMAL(10,2)
);

-- Staff Salaries Table
CREATE TABLE StaffSalaries (
    SalaryID INT PRIMARY KEY,
    StaffID INT,
    RoleID INT,
    GrossSalary DECIMAL(10,2),
    Allowances DECIMAL(10,2),
    Deductions DECIMAL(10,2),
    NetSalary DECIMAL(10,2),
    PaymentDate DATE,
    PaymentStatus VARCHAR(50),
    FOREIGN KEY (StaffID) REFERENCES Staff(Staff_Id),
    FOREIGN KEY (RoleID) REFERENCES SalaryStructure(RoleID)
);

-- Payroll Table
CREATE TABLE Payroll (
    PayrollID INT PRIMARY KEY,
    MonthYear VARCHAR(7), -- Format: YYYY-MM (e.g., 2023-10)
    TotalGrossSalary DECIMAL(10, 2),
    TotalDeductions DECIMAL(10, 2),
    TotalNetSalary DECIMAL(10, 2),
    ProcessedDate DATE
)

-- Insert into Patients Table
INSERT INTO Patients (PatientID, Name, AdmissionDate, Discharge_Date, Diagnosis) VALUES
(1, 'John Doe', '2024-03-10', '2024-03-15', 'Pneumonia'),
(2, 'Jane Smith', '2024-03-12', '2024-03-18', 'Diabetes'),
(3, 'Emily Johnson', '2024-03-14', '2024-03-19', 'Fracture'),
(4, 'Michael Brown', '2024-03-15', '2024-03-20', 'Asthma'),
(5, 'Sarah Davis', '2024-03-16', '2024-03-22', 'Hypertension'),
(6, 'David Wilson', '2024-03-18', '2024-03-25', 'Flu'),
(7, 'Emma Martinez', '2024-03-19', '2024-03-27', 'COVID-19'),
(8, 'Olivia Garcia', '2024-03-21', '2024-03-30', 'Migraine'),
(9, 'James Anderson', '2024-03-22', '2024-04-01', 'Allergy'),
(10, 'William Thomas', '2024-03-24', '2024-04-05', 'Bronchitis');

-- Insert into Room Table
INSERT INTO Room (RoomID, Room_Number, Type, Status, number_of_Beds) VALUES
(1, '101', 'ICU', 'Occupied', 2),
(2, '102', 'General', 'Available', 4),
(3, '103', 'Maternity', 'Occupied', 3),
(4, '104', 'Surgical', 'Available', 1),
(5, '105', 'General', 'Occupied', 2),
(6, '106', 'ICU', 'Available', 2),
(7, '107', 'Maternity', 'Occupied', 3),
(8, '108', 'Surgical', 'Available', 1),
(9, '109', 'General', 'Occupied', 4),
(10, '110', 'ICU', 'Available', 2);

-- Insert into Beds Table
INSERT INTO Beds (BedID, status, Type, Assigned_To) VALUES
(1, 'Occupied', 'ICU', 1),
(2, 'Available', 'General', 2),
(3, 'Occupied', 'Maternity', 3),
(4, 'Available', 'Surgical', 4),
(5, 'Occupied', 'General', 5),
(6, 'Available', 'ICU', 6),
(7, 'Occupied', 'Maternity', 7),
(8, 'Available', 'Surgical', 8),
(9, 'Occupied', 'General', 9),
(10, 'Available', 'ICU', 10);

-- Insert into Medical Equipment Table
INSERT INTO Medical_Equipment (EquipmentID, Name, Location, Availability) VALUES
(1, 'X-ray Machine', 'Radiology Room', 'Available'),
(2, 'ECG Machine', 'Cardiology Dept', 'In Use'),
(3, 'Ventilator', 'ICU', 'Available'),
(4, 'MRI Scanner', 'Imaging Center', 'In Maintenance'),
(5, 'Defibrillator', 'Emergency Ward', 'Available'),
(6, 'Surgical Lamp', 'Operation Theater', 'In Use'),
(7, 'Dialysis Machine', 'Nephrology Dept', 'Available'),
(8, 'Infusion Pump', 'Pediatrics', 'In Use'),
(9, 'Ultrasound Machine', 'Gynecology Dept', 'Available'),
(10, 'CT Scanner', 'Radiology Room', 'In Maintenance');

-- Insert into Staff Table
INSERT INTO Staff (Staff_Id, Name, Role, Availability) VALUES
(1, 'Dr. Alice Walker', 'Surgeon', 'Available'),
(2, 'Dr. Bob Carter', 'Physician', 'On Leave'),
(3, 'Dr. Charles Lee', 'Cardiologist', 'Available'),
(4, 'Dr. Diana Scott', 'Pediatrician', 'Available'),
(5, 'Dr. Edward Kim', 'Radiologist', 'On Leave'),
(6, 'Nurse Fiona Adams', 'Nurse', 'Available'),
(7, 'Nurse George Baker', 'Nurse', 'Available'),
(8, 'Technician Harry Smith', 'Lab Technician', 'Available'),
(9, 'Technician Isabel Johnson', 'Radiology Technician', 'Available'),
(10, 'Dr. Jack White', 'Anesthesiologist', 'On Duty');

-- Insert into Appointments Table
INSERT INTO Appointments (Appointments_ID, Patient_ID, Staff_ID, start_Time, End_Time) VALUES
(1, 1, 1, '2024-03-25 09:00:00', '2024-03-25 09:30:00'),
(2, 2, 2, '2024-03-25 10:00:00', '2024-03-25 10:30:00'),
(3, 3, 3, '2024-03-25 11:00:00', '2024-03-25 11:30:00'),
(4, 4, 4, '2024-03-25 12:00:00', '2024-03-25 12:30:00'),
(5, 5, 5, '2024-03-25 13:00:00', '2024-03-25 13:30:00'),
(6, 6, 6, '2024-03-25 14:00:00', '2024-03-25 14:30:00'),
(7, 7, 7, '2024-03-25 15:00:00', '2024-03-25 15:30:00'),
(8, 8, 8, '2024-03-25 16:00:00', '2024-03-25 16:30:00'),
(9, 9, 9, '2024-03-25 17:00:00', '2024-03-25 17:30:00'),
(10, 10, 10, '2024-03-25 18:00:00', '2024-03-25 18:30:00');

-- Insert into Billing Table
INSERT INTO Billing (Bill_Id, Patient_Id, Total_Amount, Paid_Amount, Due_Amount, Payment_Status, BillingDate) VALUES
(1, 1, 5000.00, 3000.00, 2000.00, 'Pending', '2024-03-26'),
(2, 2, 7000.00, 7000.00, 0.00, 'Paid', '2024-03-26'),
(3, 3, 2000.00, 1500.00, 500.00, 'Pending', '2024-03-26'),
(4, 4, 4500.00, 4500.00, 0.00, 'Paid', '2024-03-26'),
(5, 5, 6000.00, 4000.00, 2000.00, 'Pending', '2024-03-26'),
(6, 6, 3500.00, 3500.00, 0.00, 'Paid', '2024-03-26'),
(7, 7, 8000.00, 5000.00, 3000.00, 'Pending', '2024-03-26'),
(8, 8, 1000.00, 1000.00, 0.00, 'Paid', '2024-03-26'),
(9, 9, 9000.00, 6000.00, 3000.00, 'Pending', '2024-03-26'),
(10, 10, 12000.00, 10000.00, 2000.00, 'Pending', '2024-03-26');

-- Insert into Scheduling Table
INSERT INTO Scheduling (Schedule_ID, Resources_ID, start_Time, End_Time, status) VALUES
(1, 1, '2024-03-25 08:00:00', '2024-03-25 12:00:00', 'Scheduled'),
(2, 2, '2024-03-25 09:00:00', '2024-03-25 13:00:00', 'Completed'),
(3, 3, '2024-03-25 10:00:00', '2024-03-25 14:00:00', 'Scheduled'),
(4, 4, '2024-03-25 11:00:00', '2024-03-25 15:00:00', 'In Progress'),
(5, 5, '2024-03-25 12:00:00', '2024-03-25 16:00:00', 'Scheduled'),
(6, 6, '2024-03-25 13:00:00', '2024-03-25 17:00:00', 'Completed'),
(7, 7, '2024-03-25 14:00:00', '2024-03-25 18:00:00', 'Scheduled'),
(8, 8, '2024-03-25 15:00:00', '2024-03-25 19:00:00', 'In Progress'),
(9, 9, '2024-03-25 16:00:00', '2024-03-25 20:00:00', 'Completed'),
(10, 10, '2024-03-25 17:00:00', '2024-03-25 21:00:00', 'Scheduled');

-- Insert into AlertsReports Table
INSERT INTO AlertsReports (Alert_ID, Type, Description, Timestamp) VALUES
(1, 'Emergency', 'Fire alarm triggered in ward 3', '2024-03-25 08:45:00'),
(2, 'Equipment Failure', 'X-ray machine malfunctioned', '2024-03-25 09:10:00'),
(3, 'Security', 'Unauthorized person detected', '2024-03-25 09:45:00'),
(4, 'Medical', 'Patient 5 had an emergency', '2024-03-25 10:30:00'),
(5, 'Lab Issue', 'Incorrect test results detected', '2024-03-25 11:00:00'),
(6, 'Power Outage', 'Backup generator activated', '2024-03-25 11:30:00'),
(7, 'Supply Shortage', 'Insufficient blood units available', '2024-03-25 12:15:00'),
(8, 'Security', 'Suspicious activity near pharmacy', '2024-03-25 13:00:00'),
(9, 'Maintenance', 'Plumbing issue in patient room 202', '2024-03-25 13:45:00'),
(10, 'Medical', 'ICU ventilator failure reported', '2024-03-25 14:20:00');

-- Insert into Pharmacy Table
INSERT INTO Pharmacy (Medication_ID, Name, Quantity, Price, Expiry_Date) VALUES
(1, 'Paracetamol', 100, 10.00, '2025-06-15'),
(2, 'Ibuprofen', 50, 15.00, '2025-07-10'),
(3, 'Insulin', 30, 200.00, '2025-05-20'),
(4, 'Amoxicillin', 40, 25.00, '2025-12-05'),
(5, 'Metformin', 20, 50.00, '2026-03-30'),
(6, 'Omeprazole', 60, 30.00, '2025-08-18'),
(7, 'Salbutamol', 70, 35.00, '2025-09-25'),
(8, 'Aspirin', 90, 12.00, '2025-11-10'),
(9, 'Cough Syrup', 55, 20.00, '2025-07-05'),
(10, 'Vitamin C', 120, 8.00, '2025-10-12');

-- Insert into Laboratory Tests Table
INSERT INTO LaboratoryTests (Test_Id, Test_Name, Description, Cost) VALUES
(1, 'Blood Test', 'Complete blood count test', 50.00),
(2, 'X-Ray', 'Chest X-ray screening', 120.00),
(3, 'MRI', 'Brain MRI scan', 500.00),
(4, 'CT Scan', 'Abdominal CT scan', 450.00),
(5, 'ECG', 'Heart ECG test', 200.00),
(6, 'Ultrasound', 'Pregnancy ultrasound', 300.00),
(7, 'Liver Function', 'Liver function analysis', 75.00),
(8, 'Kidney Function', 'Kidney function test', 85.00),
(9, 'Thyroid Test', 'Thyroid hormone level test', 95.00),
(10, 'Covid Test', 'COVID-19 PCR test', 100.00);

-- Insert into Patient Feedback Table
INSERT INTO PatientFeedback (Feedback_Id, Patient_Id, Feedback, Rating, Feedback_Date) VALUES
(1, 1, 'Great service and friendly staff', 5, '2024-03-26'),
(2, 2, 'Doctor was very attentive', 4, '2024-03-26'),
(3, 3, 'Waiting time was too long', 3, '2024-03-26'),
(4, 4, 'Excellent treatment!', 5, '2024-03-26'),
(5, 5, 'Nurses were very helpful', 4, '2024-03-26'),
(6, 6, 'Billing process took a lot of time', 3, '2024-03-26'),
(7, 7, 'Satisfied with the care received', 5, '2024-03-26'),
(8, 8, 'Pharmacy was out of stock of my medication', 2, '2024-03-26'),
(9, 9, 'Great facilities and clean environment', 5, '2024-03-26'),
(10, 10, 'Doctor explained everything clearly', 5, '2024-03-26');

-- Insert into Security Table
INSERT INTO Security (ID, Incident_Type, Description, Timestamp, HandleBy) VALUES
(1, 'Theft', 'Wallet stolen from patient room', '2024-03-25 10:00:00', 6),
(2, 'Unauthorized Access', 'Visitor entered restricted area', '2024-03-25 11:00:00', 7),
(3, 'Violence', 'Patient had a physical altercation', '2024-03-25 12:00:00', 8),
(4, 'Fire Alarm', 'False fire alarm triggered', '2024-03-25 13:00:00', 9),
(5, 'Lost Item', 'Doctor lost a stethoscope', '2024-03-25 14:00:00', 10),
(6, 'Theft', 'Mobile phone stolen from cafeteria', '2024-03-25 15:00:00', 6),
(7, 'Unauthorized Access', 'Attempted break-in at pharmacy', '2024-03-25 16:00:00', 7),
(8, 'Harassment', 'Nurse reported harassment by patient', '2024-03-25 17:00:00', 8),
(9, 'Vandalism', 'Graffiti found on hospital walls', '2024-03-25 18:00:00', 9),
(10, 'Emergency', 'Suspicious package found in lobby', '2024-03-25 19:00:00', 10);


INSERT INTO SalaryStructure (RoleID, RoleName, BaseSalary, Allowances, Deductions, NetSalary) VALUES
(1, 'Doctor', 100000.00, 20000.00, 10000.00, 110000.00),
(2, 'Nurse', 60000.00, 15000.00, 5000.00, 70000.00),
(3, 'Surgeon', 150000.00, 25000.00, 15000.00, 160000.00),
(4, 'Pharmacist', 50000.00, 10000.00, 3000.00, 57000.00),
(5, 'Lab Technician', 40000.00, 8000.00, 2000.00, 46000.00),
(6, 'Security Guard', 30000.00, 5000.00, 1000.00, 34000.00),
(7, 'Receptionist', 35000.00, 6000.00, 1500.00, 39500.00),
(8, 'Janitor', 25000.00, 4000.00, 500.00, 28500.00),
(9, 'Administrator', 70000.00, 15000.00, 5000.00, 80000.00),
(10, 'Radiologist', 90000.00, 18000.00, 7000.00, 101000.00);


INSERT INTO StaffSalaries (SalaryID, StaffID, RoleID, GrossSalary, Allowances, Deductions, NetSalary, PaymentDate, PaymentStatus) VALUES
(1, 1, 1, 120000.00, 20000.00, 10000.00, 110000.00, '2025-03-01', 'Paid'),
(2, 2, 2, 70000.00, 15000.00, 5000.00, 70000.00, '2025-03-01', 'Paid'),
(3, 3, 3, 170000.00, 25000.00, 15000.00, 160000.00, '2025-03-01', 'Paid'),
(4, 4, 4, 60000.00, 10000.00, 3000.00, 57000.00, '2025-03-01', 'Paid'),
(5, 5, 5, 48000.00, 8000.00, 2000.00, 46000.00, '2025-03-01', 'Paid'),
(6, 6, 6, 35000.00, 5000.00, 1000.00, 34000.00, '2025-03-01', 'Paid'),
(7, 7, 7, 40000.00, 6000.00, 1500.00, 39500.00, '2025-03-01', 'Paid'),
(8, 8, 8, 29000.00, 4000.00, 500.00, 28500.00, '2025-03-01', 'Paid'),
(9, 9, 9, 75000.00, 15000.00, 5000.00, 80000.00, '2025-03-01', 'Paid'),
(10, 10, 10, 100000.00, 18000.00, 7000.00, 101000.00, '2025-03-01', 'Paid');


INSERT INTO Payroll (PayrollID, MonthYear, TotalGrossSalary, TotalDeductions, TotalNetSalary, ProcessedDate) VALUES
(1, '2025-03', 895000.00, 66500.00, 961500.00, '2025-03-02'),
(2, '2025-02', 875000.00, 65000.00, 940000.00, '2025-02-28'),
(3, '2025-01', 860000.00, 64000.00, 926000.00, '2025-01-31'),
(4, '2024-12', 840000.00, 62000.00, 918000.00, '2024-12-31'),
(5, '2024-11', 820000.00, 60000.00, 900000.00, '2024-11-30'),
(6, '2024-10', 800000.00, 58000.00, 882000.00, '2024-10-31'),
(7, '2024-09', 780000.00, 56000.00, 864000.00, '2024-09-30'),
(8, '2024-08', 760000.00, 54000.00, 846000.00, '2024-08-31'),
(9, '2024-07', 740000.00, 52000.00, 828000.00, '2024-07-31'),
(10, '2024-06', 720000.00, 50000.00, 810000.00, '2024-06-30');

--show table
SELECT * FROM Patients;
SELECT * FROM Room;
SELECT * FROM Beds;
SELECT * FROM Medical_Equipment;
SELECT * FROM Staff;
SELECT * FROM Appointments;
SELECT * FROM Scheduling;
SELECT * FROM AlertsReports;
SELECT * FROM Billing;
SELECT * FROM Pharmacy;
SELECT * FROM LaboratoryTests;
SELECT * FROM PatientFeedback;
SELECT * FROM AmbulanceServices;
SELECT * FROM Registration;
SELECT * FROM Security;
SELECT * FROM SalaryStructure;
SELECT * FROM StaffSalaries;
SELECT * FROM Payroll;

--1 procedure to track the bed occupancy
go
CREATE PROCEDURE TrackBedOccupancy
AS
BEGIN
    SELECT Room.RoomID, Room.Room_Number, Room.Type AS Room_Type, 
           Beds.BedID, Beds.status AS Bed_Status, Patients.Name AS Patient_Name
    FROM Room
    LEFT JOIN Beds ON Room.RoomID = Beds.BedID
    LEFT JOIN Patients ON Beds.Assigned_To = Patients.PatientID
    ORDER BY Room.Room_Number;
END;
GO


-- 2️ Procedure to Track Medical Equipment Availability
CREATE PROCEDURE TrackMedicalEquipment
AS
BEGIN
    SELECT EquipmentID, Name, Location, Availability 
    FROM Medical_Equipment 
    ORDER BY Availability DESC;
END;
GO


-- 3️ Procedure to Track Staff Availability
CREATE PROCEDURE TrackStaffAvailability
AS
BEGIN
    SELECT Staff_Id, Name, Role, Availability 
    FROM Staff 
    WHERE Availability = 'Available';
END;
GO


-- 4️ Procedure to Assign a Bed to a Patient
CREATE PROCEDURE AssignBedToPatient
    @patient_id INT
AS
BEGIN
    DECLARE @available_bed INT;

    -- Find an available bed
    SELECT TOP 1 @available_bed = BedID 
    FROM Beds 
    WHERE status = 'Available';

    -- If a bed is found, assign it
    IF @available_bed IS NOT NULL
    BEGIN
        UPDATE Beds 
        SET Assigned_To = @patient_id, status = 'Occupied' 
        WHERE BedID = @available_bed;

        PRINT CONCAT('Bed ', @available_bed, ' assigned to patient ', @patient_id);
    END
    ELSE
    BEGIN
        PRINT 'No available beds!';
    END
END;
GO


-- 5️ Procedure to Schedule an Appointment
CREATE PROCEDURE ScheduleAppointment
    @patient_id INT,
    @doctor_id INT,
    @appointment_date DATETIME
AS
BEGIN
    INSERT INTO Appointments (Patient_ID, Staff_ID, start_Time, End_Time)
    VALUES (@patient_id, @doctor_id, @appointment_date, DATEADD(MINUTE, 30, @appointment_date));

    PRINT 'Appointment Scheduled Successfully';
END;
GO

-- 6️ Procedure to View Patients with Assigned Beds & Doctors

CREATE PROCEDURE ViewPatientAssignments
AS
BEGIN
    SELECT Patients.PatientID, Patients.Name AS Patient_Name, 
           Room.Room_Number, Beds.BedID, Beds.status AS Bed_Status,
           Staff.Name AS Assigned_Doctor
    FROM Patients
    LEFT JOIN Beds ON Patients.PatientID = Beds.Assigned_To
    LEFT JOIN Room ON Beds.BedID = Room.RoomID
    LEFT JOIN Appointments ON Patients.PatientID = Appointments.Patient_ID
    LEFT JOIN Staff ON Appointments.Staff_ID = Staff.Staff_Id;
END;
GO


-- 7️ Procedure to Check Low Stock Pharmacy Items
CREATE PROCEDURE CheckLowStock
AS
BEGIN
    SELECT Medication_ID, Name, Quantity, Expiry_Date
    FROM Pharmacy
    WHERE Quantity < 10
    ORDER BY Quantity ASC;
END;
GO

-- 8️ Procedure to Check Expired Medicines

CREATE PROCEDURE CheckExpiredMedicines
AS
BEGIN
    SELECT Medication_ID, Name, Expiry_Date
    FROM Pharmacy
    WHERE Expiry_Date < GETDATE();
END;
GO

-- 9️ Procedure to Generate Monthly Revenue Report
CREATE PROCEDURE MonthlyRevenueReport
AS
BEGIN
    SELECT FORMAT(BillingDate, 'yyyy-MM') AS Month, 
           SUM(Total_Amount) AS Total_Billed, 
           SUM(Paid_Amount) AS Total_Paid, 
           SUM(Due_Amount) AS Total_Due
    FROM Billing
    GROUP BY FORMAT(BillingDate, 'yyyy-MM')
    ORDER BY Month DESC;
END;
GO


-- 10 Procedure to Get Staff Performance Report
CREATE PROCEDURE StaffPerformanceReport
AS
BEGIN
    SELECT Staff.Name, Staff.Role, COUNT(Appointments.Appointments_ID) AS Total_Appointments
    FROM Staff
    LEFT JOIN Appointments ON Staff.Staff_Id = Appointments.Staff_ID
    GROUP BY Staff.Name, Staff.Role
    ORDER BY Total_Appointments DESC;
END;
GO

-- 1️1 Procedure to Get Total Salaries Paid Per Month
CREATE PROCEDURE TotalSalariesPaid
AS
BEGIN
    SELECT MonthYear, SUM(TotalNetSalary) AS TotalSalariesPaid
    FROM Payroll
    GROUP BY MonthYear
    ORDER BY MonthYear DESC;
END;
GO

-- 1️2️ Procedure to View Security Incidents

CREATE PROCEDURE ViewSecurityIncidents
AS
BEGIN
    SELECT Incident_Type, Description, Timestamp, Staff.Name AS Handled_By
    FROM Security
    LEFT JOIN Staff ON Security.HandleBy = Staff.Staff_Id
    ORDER BY Timestamp DESC;
END;
GO


-- 1️3️ Trigger to Log Unauthorized Access
CREATE TRIGGER UnauthorizedAccessLog
ON Security
AFTER INSERT
AS
BEGIN
    IF EXISTS (SELECT 1 FROM inserted WHERE Incident_Type = 'Unauthorized Access')
    BEGIN
        INSERT INTO AlertsReports (Type, Description, Timestamp)
        VALUES ('Security', 'Unauthorized access detected', GETDATE());
    END
END;
GO

--14 Procedure to get patient history
CREATE PROCEDURE GetPatientHistory
    @patient_id INT
AS
BEGIN
    -- Check if patient exists in Registration table
    IF EXISTS (SELECT 1 FROM Registration WHERE Patient_Id = @patient_id)
    BEGIN
        PRINT 'Patient is already registered. Retrieving history...';

        SELECT PatientID, Name, AdmissionDate, Discharge_Date, Diagnosis
        FROM Patients
        WHERE PatientID = @patient_id;

        SELECT Appointments_ID, Staff.Name AS Doctor_Name, start_Time, End_Time
        FROM Appointments
        INNER JOIN Staff ON Appointments.Staff_ID = Staff.Staff_Id
        WHERE Patient_ID = @patient_id
        ORDER BY start_Time DESC;

        SELECT Bill_Id, Total_Amount, Paid_Amount, Due_Amount, Payment_Status, BillingDate
        FROM Billing
        WHERE Patient_Id = @patient_id
        ORDER BY BillingDate DESC;

        SELECT lt.Test_Id, lt.Test_Name, lt.Description, lt.Cost
        FROM LaboratoryTests lt
        INNER JOIN Appointments appt ON lt.Test_Id = appt.Patient_ID
        WHERE appt.Patient_ID = @patient_id;

        SELECT Feedback_Id, Feedback, Rating, Feedback_Date
        FROM PatientFeedback
        WHERE Patient_Id = @patient_id
        ORDER BY Feedback_Date DESC;
    END
    ELSE
    BEGIN
        PRINT 'Patient is not registered. Please register the patient first.';
    END
END;
GO

--15 Procedure to check stock of medicine 
CREATE PROCEDURE InsertMedicineIfLowStock
    @Medication_ID INT,
    @Name VARCHAR(255),
    @Quantity INT,
    @Price DECIMAL(8,2),
    @Expiry_Date DATE
AS
BEGIN
    DECLARE @ExistingStock INT;

    -- Check if the medicine already exists
    SELECT @ExistingStock = Quantity
    FROM Pharmacy
    WHERE Medication_ID = @Medication_ID;

    -- If the medicine exists, check stock level
    IF @ExistingStock IS NOT NULL
    BEGIN
        IF @ExistingStock < 100
        BEGIN
            -- Update stock quantity
            UPDATE Pharmacy
            SET Quantity = Quantity + @Quantity
            WHERE Medication_ID = @Medication_ID;

            PRINT CONCAT(@Quantity, ' units of ', @Name, ' added to stock. New total: ', @ExistingStock + @Quantity);
        END
        ELSE
        BEGIN
            PRINT 'Stock is sufficient. No additional stock added.';
        END
    END
    ELSE
    BEGIN
        -- Insert new medicine if it does not exist
        INSERT INTO Pharmacy (Medication_ID, Name, Quantity, Price, Expiry_Date)
        VALUES (@Medication_ID, @Name, @Quantity, @Price, @Expiry_Date);

        PRINT CONCAT(@Quantity, ' units of new medicine ', @Name, ' added to inventory.');
    END
END;
GO

--15 procedure for salary
CREATE PROCEDURE ProcessSalaries
AS
BEGIN
    DECLARE @StaffID INT, @RoleID INT, @BaseSalary DECIMAL(10,2), 
            @Allowances DECIMAL(10,2), @Deductions DECIMAL(10,2), 
            @Bonus DECIMAL(10,2), @NetSalary DECIMAL(10,2);

  
    DECLARE staff_cursor CURSOR FOR 
    SELECT s.Staff_Id, ss.RoleID, ss.BaseSalary, ss.Allowances, ss.Deductions
    FROM Staff s
    JOIN SalaryStructure ss ON s.Role = ss.RoleName;

    OPEN staff_cursor;
    FETCH NEXT FROM staff_cursor INTO @StaffID, @RoleID, @BaseSalary, @Allowances, @Deductions;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        
        SET @Bonus = CASE 
            WHEN @RoleID = 1 THEN @BaseSalary * 0.10  -- Doctors get 10% bonus
            WHEN @RoleID = 2 THEN @BaseSalary * 0.05  -- Nurses get 5% bonus
            ELSE 0                                    -- Others get no bonus
        END;

   
        SET @NetSalary = (@BaseSalary + @Allowances + @Bonus) - @Deductions;

        INSERT INTO StaffSalaries (StaffID, RoleID, GrossSalary, Allowances, Deductions, NetSalary, PaymentDate, PaymentStatus)
        VALUES (@StaffID, @RoleID, (@BaseSalary + @Bonus), @Allowances, @Deductions, @NetSalary, GETDATE(), 'Paid');

      
        PRINT CONCAT('Salary processed for Staff ID: ', @StaffID, ' | Net Salary: ', @NetSalary);

  
        FETCH NEXT FROM staff_cursor INTO @StaffID, @RoleID, @BaseSalary, @Allowances, @Deductions;
    END;

    CLOSE staff_cursor;
    DEALLOCATE staff_cursor;
END;
GO

--16
CREATE PROCEDURE RegisterPatient
    @PatientID INT,
    @Name VARCHAR(255),
    @AdmissionDate DATE,
    @Diagnosis VARCHAR(255)
AS
BEGIN
    IF EXISTS (SELECT 1 FROM Patients WHERE PatientID = @PatientID)
    BEGIN
        PRINT 'Patient is already registered.';
    END
    ELSE
    BEGIN
        INSERT INTO Patients (PatientID, Name, AdmissionDate, Discharge_Date, Diagnosis)
        VALUES (@PatientID, @Name, @AdmissionDate, NULL, @Diagnosis);

        INSERT INTO Registration (Registration_No, Patient_Id, Type)
        VALUES (@PatientID, @PatientID, 'New Admission');

        PRINT 'Patient registered successfully.';
    END
END;
GO

--17
CREATE PROCEDURE DischargePatient
    @PatientID INT,
    @DischargeDate DATE
AS
BEGIN
    IF EXISTS (SELECT 1 FROM Patients WHERE PatientID = @PatientID)
    BEGIN
        UPDATE Patients
        SET Discharge_Date = @DischargeDate
        WHERE PatientID = @PatientID;

        UPDATE Beds
        SET status = 'Available', Assigned_To = NULL
        WHERE Assigned_To = @PatientID;

        PRINT 'Patient discharged and bed freed.';
    END
    ELSE
    BEGIN
        PRINT 'Patient not found.';
    END
END;
GO


--18
CREATE PROCEDURE AssignDoctorToPatient
    @PatientID INT,
    @DoctorID INT,
    @AppointmentDate DATETIME
AS
BEGIN
    IF EXISTS (SELECT 1 FROM Patients WHERE PatientID = @PatientID) AND
       EXISTS (SELECT 1 FROM Staff WHERE Staff_Id = @DoctorID AND Role = 'Doctor')
    BEGIN
        INSERT INTO Appointments (Patient_ID, Staff_ID, start_Time, End_Time)
        VALUES (@PatientID, @DoctorID, @AppointmentDate, DATEADD(MINUTE, 30, @AppointmentDate));

        PRINT 'Doctor assigned successfully.';
    END
    ELSE
    BEGIN
        PRINT 'Invalid Patient ID or Doctor ID.';
    END
END;
GO

--19

CREATE PROCEDURE GenerateBill
    @BillID INT,
    @PatientID INT,
    @TotalAmount DECIMAL(8,2),
    @PaidAmount DECIMAL(8,2)
AS
BEGIN
    DECLARE @DueAmount DECIMAL(8,2) = @TotalAmount - @PaidAmount;

    INSERT INTO Billing (Bill_Id, Patient_Id, Total_Amount, Paid_Amount, Due_Amount, Payment_Status, BillingDate)
    VALUES (@BillID, @PatientID, @TotalAmount, @PaidAmount, @DueAmount, 
            CASE WHEN @DueAmount = 0 THEN 'Paid' ELSE 'Pending' END, GETDATE());

    PRINT 'Bill generated successfully.';
END;
GO

--20

CREATE PROCEDURE PayBill
    @BillID INT,
    @PaymentAmount DECIMAL(8,2)
AS
BEGIN
    DECLARE @DueAmount DECIMAL(8,2);
    
    SELECT @DueAmount = Due_Amount FROM Billing WHERE Bill_Id = @BillID;

    IF @DueAmount IS NULL
    BEGIN
        PRINT 'Bill not found.';
    END
    ELSE IF @PaymentAmount > @DueAmount
    BEGIN
        PRINT 'Payment exceeds due amount.';
    END
    ELSE
    BEGIN
        UPDATE Billing
        SET Paid_Amount = Paid_Amount + @PaymentAmount,
            Due_Amount = Due_Amount - @PaymentAmount,
            Payment_Status = CASE WHEN Due_Amount - @PaymentAmount = 0 THEN 'Paid' ELSE 'Pending' END
        WHERE Bill_Id = @BillID;

        PRINT 'Payment recorded successfully.';
    END
END;
GO

--21
CREATE PROCEDURE CheckLowStockMedicines
AS
BEGIN
    SELECT Medication_ID, Name, Quantity, Expiry_Date
    FROM Pharmacy
    WHERE Quantity < 100
    ORDER BY Quantity ASC;
END;
GO


--22

CREATE PROCEDURE LogSecurityIncident
    @IncidentType VARCHAR(255),
    @Description TEXT,
    @HandleBy INT
AS
BEGIN
    INSERT INTO Security (Incident_Type, Description, Timestamp, HandleBy)
    VALUES (@IncidentType, @Description, GETDATE(), @HandleBy);

    PRINT 'Security incident logged.';
END;
GO


--23

CREATE PROCEDURE GetMonthlyRevenue
AS
BEGIN
    SELECT FORMAT(BillingDate, 'yyyy-MM') AS Month, 
           SUM(Total_Amount) AS TotalRevenue, 
           SUM(Paid_Amount) AS TotalPaid, 
           SUM(Due_Amount) AS TotalDue
    FROM Billing
    GROUP BY FORMAT(BillingDate, 'yyyy-MM')
    ORDER BY Month DESC;
END;
GO

--24

CREATE PROCEDURE GetStaffSalaryReport
AS
BEGIN
    SELECT ss.SalaryID, s.Name AS StaffName, ss.GrossSalary, ss.Allowances, ss.Deductions, 
           ss.NetSalary, ss.PaymentDate, ss.PaymentStatus
    FROM StaffSalaries ss
    JOIN Staff s ON ss.StaffID = s.Staff_Id
    ORDER BY ss.PaymentDate DESC;
END;
GO

--25
CREATE PROCEDURE GetTopPaidStaff
AS
BEGIN
    SELECT TOP 5 s.Name AS StaffName, ss.NetSalary
    FROM StaffSalaries ss
    JOIN Staff s ON ss.StaffID = s.Staff_Id
    ORDER BY ss.NetSalary DESC;
END;
GO


--26

