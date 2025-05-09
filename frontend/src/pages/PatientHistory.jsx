import React from 'react';

import { Typography } from '@mui/material';
import PatientHistory from '../components/PatientHistory';

function PatientHistoryPage() {
  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2,fontWeight: 'bold' }}>Patient History</Typography>
      <PatientHistory />
    </div>
  );
}

export default PatientHistoryPage;