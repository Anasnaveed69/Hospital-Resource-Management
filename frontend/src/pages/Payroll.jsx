import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getPayroll } from '../api';

function Payroll() {
  const columns = [
    { key: 'PayrollID', label: 'Payroll ID' },
    { key: 'StaffID', label: 'Staff ID' },
    { key: 'Amount', label: 'Amount' },
    { key: 'Date', label: 'Date', format: (value) => new Date(value).toLocaleDateString() },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Payroll</Typography>
      <GenericTable fetchData={getPayroll} columns={columns} title="Payroll" />
    </div>
  );
}

export default Payroll;