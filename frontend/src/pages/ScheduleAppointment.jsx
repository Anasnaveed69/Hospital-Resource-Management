import React from 'react';

import { Typography } from '@mui/material';
import AppointmentForm from '../components/AppointmentForm';

function ScheduleAppointment() {
  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Schedule Appointment</Typography>
      <AppointmentForm />
    </div>
  );
}

export default ScheduleAppointment;