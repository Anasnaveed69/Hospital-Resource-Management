import React from 'react';
import { Typography } from '@mui/material';
import AssignDoctorForm from '../components/AssignDoctorForm';

function AssignDoctor() {
  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2,fontWeight: 'bold' }}>Assign Doctor</Typography>
      <AssignDoctorForm />
    </div>
  );
}

export default AssignDoctor;