import React from 'react';
import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getSalaryStructures } from '../api';

function SalaryStructures() {
  const columns = [
    { key: 'StructureID', label: 'Structure ID' },
    { key: 'Role', label: 'Role' },
    { key: 'BaseSalary', label: 'Base Salary' },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Salary Structures</Typography>
      <GenericTable fetchData={getSalaryStructures} columns={columns} title="Salary Structures" />
    </div>
  );
}

export default SalaryStructures;