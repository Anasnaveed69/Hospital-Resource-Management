import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getTotalSalariesPaid } from '../api';

function TotalSalariesPaid() {
  const columns = [
    { key: 'Year', label: 'Year' },
    { key: 'TotalAmount', label: 'Total Amount' },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Total Salaries Paid</Typography>
      <GenericTable fetchData={getTotalSalariesPaid} columns={columns} title="Total Salaries Paid" />
    </div>
  );
}

export default TotalSalariesPaid;