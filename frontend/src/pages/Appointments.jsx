import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getAppointments } from '../api';

function Appointments() {
  const columns = [
    { key: 'Appointments_ID', label: 'Appointment ID' },
    { key: 'PatientID', label: 'Patient ID' },
    { key: 'StaffID', label: 'Staff ID' },
    { key: 'start_Time', label: 'Start Time', format: (value) => new Date(value).toLocaleString() },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Appointments</Typography>
      <GenericTable fetchData={getAppointments} columns={columns} title="Appointments" />
    </div>
  );
}

export default Appointments;