import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getStaffPerformance } from '../api';

function StaffPerformance() {
  const columns = [
    { key: 'StaffID', label: 'Staff ID' },
    { key: 'Name', label: 'Name' },
    { key: 'PerformanceScore', label: 'Performance Score' },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Staff Performance</Typography>
      <GenericTable fetchData={getStaffPerformance} columns={columns} title="Staff Performance" />
    </div>
  );
}

export default StaffPerformance;