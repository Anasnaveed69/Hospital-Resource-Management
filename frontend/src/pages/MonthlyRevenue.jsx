import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getMonthlyRevenue } from '../api';

function MonthlyRevenue() {
  const columns = [
    { key: 'Month', label: 'Month' },
    { key: 'Year', label: 'Year' },
    { key: 'Revenue', label: 'Revenue' },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Monthly Revenue</Typography>
      <GenericTable fetchData={getMonthlyRevenue} columns={columns} title="Monthly Revenue" />
    </div>
  );
}

export default MonthlyRevenue;