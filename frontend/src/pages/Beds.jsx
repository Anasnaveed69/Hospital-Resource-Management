import React from 'react';
import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getBeds } from '../api';

function Beds() {
  const columns = [
    { key: 'BedID', label: 'Bed ID' },
    { key: 'status', label: 'Status' },
    { key: 'Type', label: 'Type' },
    { key: 'Assigned_To', label: 'Assigned To', format: (value) => value || 'None' },
  ];

  return (
    <div>
  <Typography variant="h5" sx={{ mb: 2,fontWeight: 'bold',color:'blue' }}>Bed List</Typography>
      <GenericTable fetchData={getBeds} columns={columns} />
    </div>
  );
}

export default Beds;