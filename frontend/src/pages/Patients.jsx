import React from 'react';

import { Typography } from '@mui/material';
import PatientList from '../components/PatientList';

function Patients() {
  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Patient List</Typography>
      <PatientList />
    </div>
  );
}

export default Patients;