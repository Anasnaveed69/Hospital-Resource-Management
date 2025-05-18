import React from 'react';
import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getLabTests } from '../api';

function LabTests() {
  const columns = [
    { key: 'Test_Id', label: 'Test ID' },
    { key: 'Test_Name', label: 'Test Name' },
    { key: 'Description', label: 'Description' },
    { key: 'Cost', label: 'Cost', format: (value) => `$${value.toFixed(2)}` },
  ];

  return (
    <div>
       <Typography variant="h5" sx={{ mb: 2,fontWeight: 'bold',color:'blue' }}>Lab Tests</Typography>
      <GenericTable fetchData={getLabTests} columns={columns} />
    </div>
  );
}

export default LabTests;
