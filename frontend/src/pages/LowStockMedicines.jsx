import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getLowStockMedicines } from '../api';

function LowStockMedicines() {
  const columns = [
    { key: 'Medication_ID', label: 'Medicine ID' },
    { key: 'Name', label: 'Name' },
    { key: 'Quantity', label: 'Quantity' },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Low Stock Medicines</Typography>
      <GenericTable fetchData={getLowStockMedicines} columns={columns} title="Low Stock Medicines" />
    </div>
  );
}

export default LowStockMedicines;