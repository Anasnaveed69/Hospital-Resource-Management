# Hospital Resource Management System

## Project Overview
The **Hospital Resource Management System (HRMS)** is a database-driven application designed to help hospitals efficiently manage their resources, including beds, medical equipment, and staff. The system provides real-time tracking, scheduling, and allocation of resources to optimize hospital operations and enhance patient care.

## Features
### 1. **Real-Time Resource Tracking**
- Monitor occupancy status of hospital beds (occupied, vacant, reserved).
- Track location and availability of medical equipment (ventilators, MRI machines, etc.).
- Manage schedules and availability of doctors, nurses, and support staff.

### 2. **Resource Scheduling and Allocation**
- Automatically allocate resources based on patient needs and priorities.
- Schedule surgeries, appointments, and medical procedures.
- Notify staff about resource allocations and changes in real time.

### 3. **Integration with Patient Admission System**
- Automatically assign beds to incoming patients.
- Allocate medical equipment based on patient requirements.
- Assign medical staff according to expertise and availability.

### 4. **Inventory Management**
- Track usage and availability of medical supplies (medicines, syringes, gloves, etc.).
- Generate alerts for low inventory levels and restocking requirements.

### 5. **Reporting and Analytics**
- Generate reports on resource utilization, patient occupancy, and staff performance.
- Identify bottlenecks and provide data-driven insights for improvement.

### 6. **Role-Based Access Control**
- Restrict access to sensitive data based on user roles.
- Define access permissions for administrators.

### 7. **Web-Based Interface**
- Provide a user-friendly interface accessible via web browsers.
- Enable real-time updates and monitoring of resource availability.

## Technology Stack
### **Database**
- Microsoft SQL Server (Relational Database Management System)

### **Backend**
- Node.js / Python (Server-side programming)

### **Frontend**
- React.js (Web framework for user interface development)

### **Cloud Integration**
- To be decided

### **AI Integration**
- To be decided

## Use Cases
- **Hospitals**: Manage hospital beds, equipment, and staff efficiently.
- **Clinics**: Schedule appointments and allocate resources for outpatient services.
- **Emergency Rooms**: Track and allocate resources in real-time during emergencies.

## Benefits
- **Improved Efficiency**: Optimize resource utilization and reduce patient wait times.
- **Enhanced Patient Care**: Ensure timely and appropriate medical attention.
- **Cost Savings**: Minimize wastage of resources and improve operational efficiency.
- **Data-Driven Decision Making**: Leverage analytics for better resource planning.

## Installation & Setup
### **Prerequisites**
- Node.js installed on your system
- Microsoft SQL Server setup
- Git installed (optional)

### **Setup Instructions**
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/hospital-resource-management.git
   ```
2. Navigate to the project directory:
   ```sh
   cd hospital-resource-management
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the backend server:
   ```sh
   npm start
   ```
5. Open `http://localhost:5000` in your browser to access the application.

## API Endpoints
| Method | Endpoint | Description |
|--------|------------------------------|---------------------------------|
| GET | `/api/patient-history/:id` | Fetch patient history by ID |
| GET | `/api/resources` | Get all available resources |
| POST | `/api/allocate-resource` | Allocate a resource to a patient |
| POST | `/api/add-patient` | Add a new patient |
| GET | `/api/inventory` | Fetch current inventory status |

## Contributors
- **Anas Naveed Butt** (L23-0764)
- **Muhammad Usman Saboor** (L23-0813)
- **Muhammad Ibrahim Rashid** (L23-0741)

## License
This project is licensed under the MIT License.

---
This README provides a comprehensive overview of the project. Let me know if you need any modifications!

