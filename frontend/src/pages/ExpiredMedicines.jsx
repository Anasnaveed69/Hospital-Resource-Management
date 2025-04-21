import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getExpiredMedicines } from '../api';

function ExpiredMedicines() {
  const columns = [
    { key: 'MedicineID', label: 'Medicine ID' },
    { key: 'Name', label: 'Name' },
    { key: 'ExpiryDate', label: 'Expiry Date', format: (value) => new Date(value).toLocaleDateString() },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Expired Medicines</Typography>
      <GenericTable fetchData={getExpiredMedicines} columns={columns} title="Expired Medicines" />
    </div>
  );
}

export default ExpiredMedicines;