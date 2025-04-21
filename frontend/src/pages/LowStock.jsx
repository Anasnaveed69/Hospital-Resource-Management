import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getLowStock } from '../api';

function LowStock() {
  const columns = [
    { key: 'Medication_ID', label: 'Medicine ID' },
    { key: 'Name', label: 'Name' },
    { key: 'Quantity', label: 'Quantity' },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Low Stock Medicines</Typography>
      <GenericTable fetchData={getLowStock} columns={columns} title="Low Stock" />
    </div>
  );
}

export default LowStock;