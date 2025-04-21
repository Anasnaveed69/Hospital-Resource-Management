import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getLabTests } from '../api';

function LabTests() {
  const columns = [
    { key: 'TestID', label: 'Test ID' },
    { key: 'PatientID', label: 'Patient ID' },
    { key: 'TestName', label: 'Test Name' },
    { key: 'Date', label: 'Date', format: (value) => new Date(value).toLocaleDateString() },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Laboratory Tests</Typography>
      <GenericTable fetchData={getLabTests} columns={columns} title="Lab Tests" />
    </div>
  );
}

export default LabTests;