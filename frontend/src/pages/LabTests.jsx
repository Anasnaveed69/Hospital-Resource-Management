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
     
      <GenericTable fetchData={getLabTests} columns={columns} title="Lab Tests" />
    </div>
  );
}

export default LabTests;
