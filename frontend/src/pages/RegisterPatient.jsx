import React from 'react';

import { Typography } from '@mui/material';
import PatientForm from '../components/PatientForm';

function RegisterPatient() {
  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Register New Patient</Typography>
      <PatientForm />
    </div>
  );
}

export default RegisterPatient;
