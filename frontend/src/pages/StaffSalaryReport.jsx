import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getStaffSalaryReport } from '../api';

function StaffSalaryReport() {
  const columns = [
    { key: 'StaffID', label: 'Staff ID' },
    { key: 'Name', label: 'Name' },
    { key: 'TotalSalary', label: 'Total Salary' },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Staff Salary Report</Typography>
      <GenericTable fetchData={getStaffSalaryReport} columns={columns} title="Staff Salary Report" />
    </div>
  );
}

export default StaffSalaryReport;