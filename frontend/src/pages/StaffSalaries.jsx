import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import ProcessSalariesForm from '../components/ProcessSalariesForm';
import { getStaffSalaries } from '../api';

function StaffSalaries() {
  const columns = [
    { key: 'SalaryID', label: 'Salary ID' },
    { key: 'StaffID', label: 'Staff ID' },
    { key: 'Amount', label: 'Amount' },
    { key: 'Month', label: 'Month' },
    { key: 'Year', label: 'Year' },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Staff Salaries</Typography>
      <ProcessSalariesForm />
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Salaries</Typography>
      <GenericTable fetchData={getStaffSalaries} columns={columns} title="Staff Salaries" />
    </div>
  );
}

export default StaffSalaries;