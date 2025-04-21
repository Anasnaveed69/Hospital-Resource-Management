import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getTopPaidStaff } from '../api';

function TopPaidStaff() {
  const columns = [
    { key: 'StaffID', label: 'Staff ID' },
    { key: 'Name', label: 'Name' },
    { key: 'Salary', label: 'Salary' },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Top Paid Staff</Typography>
      <GenericTable fetchData={getTopPaidStaff} columns={columns} title="Top Paid Staff" />
    </div>
  );
}

export default TopPaidStaff;