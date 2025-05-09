import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getPayroll } from '../api';

function Payroll() {
  const columns = [
    { key: 'PayrollID', label: 'Payroll ID' },
    { key: 'MonthYear', label: 'Month & Year' },
    { key: 'TotalGrossSalary', label: 'Gross Salary (Rs)' },
    { key: 'TotalDeductions', label: 'Deductions (Rs)' },
    { key: 'TotalNetSalary', label: 'Net Salary (Rs)' },
    {
      key: 'ProcessedDate',
      label: 'Processed Date',
      format: (value) => new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <Typography
        variant="h5"
        sx={{
          mb: 2,
          fontFamily: 'Intro Rust, sans-serif',
          fontWeight: 600,
        }}
      >
 
      </Typography>
      <GenericTable fetchData={getPayroll} columns={columns} title="Payroll Records" />
    </div>
  );
}

export default Payroll;
