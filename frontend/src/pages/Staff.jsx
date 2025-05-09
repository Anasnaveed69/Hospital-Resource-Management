import React, { useState } from 'react';
import { Typography, Box, Paper, Divider } from '@mui/material';
import GenericTable from '../components/GenericTable';
import AddStaffWithSalaryForm from '../components/addStaff';
import { getSalaryStructures, getStaff } from '../api';

function StaffAndSalaryStructures() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleStaffAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const salaryStructureColumns = [
    { key: 'RoleID', label: 'Role ID' },
    { key: 'RoleName', label: 'Role Name' },
    { key: 'BaseSalary', label: 'Base Salary' },
    { key: 'Allowances', label: 'Allowances' },
    { key: 'Deductions', label: 'Deductions' },
    { key: 'NetSalary', label: 'Net Salary' },
  ];

  const staffColumns = [
    { key: 'Staff_Id', label: 'Staff ID' },
    { key: 'Name', label: 'Name' },
    { key: 'Role', label: 'Role' },
    { key: 'Availability', label: 'Availability' },
  ];

  return (
    <Box sx={{ background: '#f4f6f8', minHeight: '100vh', py: 6 }}>
      <Paper
        elevation={4}
        sx={{
          maxWidth: 900,
          mx: 'auto',
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          boxShadow: '0 4px 24px rgba(25, 118, 210, 0.08)',
          background: '#fff',
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontWeight: 700,
            color: '#1976D2',
            mb: 2,
            letterSpacing: 1,
          }}
        >
          Staff and Salary Management
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: '#1976D2',
            mb: 2,
            letterSpacing: 0.5,
          }}
        >
   
        </Typography>
        <AddStaffWithSalaryForm onStaffAdded={handleStaffAdded} />

        <Typography
          variant="h6"
          sx={{
            mt: 5,
            mb: 2,
            fontWeight: 700,
            color: '#1976D2',
            letterSpacing: 0.5,
          }}
        >
        
        </Typography>
        <GenericTable
          fetchData={getSalaryStructures}
          columns={salaryStructureColumns}
          title="Salary Structures"
          refreshKey={refreshKey}
          sx={{
            '& .MuiTableCell-root': { color: '#263238' },
            '& .MuiTableHead-root': { backgroundColor: '#e3f2fd' },
          }}
        />

        <Typography
          variant="h6"
          sx={{
            mt: 5,
            mb: 2,
            fontWeight: 700,
            color: '#1976D2',
            letterSpacing: 0.5,
          }}
        >
        </Typography>
        <GenericTable
          fetchData={getStaff}
          columns={staffColumns}
          title="Staff"
          refreshKey={refreshKey}
          sx={{
            '& .MuiTableCell-root': { color: '#263238' },
            '& .MuiTableHead-root': { backgroundColor: '#e3f2fd' },
          }}
        />
      </Paper>
    </Box>
  );
}

export default StaffAndSalaryStructures;
