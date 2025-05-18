import React, { useState } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import GenericTable from '../components/GenericTable';
import AddStaffWithSalaryForm from '../components/addStaff';
import { getSalaryStructures, getStaff } from '../api';

function StaffAndSalaryStructures() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleStaffAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const salaryStructureColumns = [
    { 
      key: 'RoleID', 
      label: 'Role ID',
      format: (value) => value.toString()
    },
    { 
      key: 'RoleName', 
      label: 'Role Name'
    },
    { 
      key: 'BaseSalary', 
      label: 'Base Salary',
      format: (value) => value.toFixed(2)
    },
    { 
      key: 'Allowances', 
      label: 'Allowances',
      format: (value) => value.toFixed(2)
    },
    { 
      key: 'Deductions', 
      label: 'Deductions',
      format: (value) => value.toFixed(2)
    },
    { 
      key: 'NetSalary', 
      label: 'Net Salary',
      format: (value) => value.toFixed(2)
    }
  ];

  const staffColumns = [
    { 
      key: 'Staff_Id', 
      label: 'Staff ID',
      format: (value) => value.toString()
    },
    { 
      key: 'Name', 
      label: 'Name'
    },
    { 
      key: 'Role', 
      label: 'Role'
    },
    { 
      key: 'Availability', 
      label: 'Status'
    }
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: 'blue' }}>Staff Management</Typography>
        
        <Paper sx={{ p: 3, mb: 4, borderRadius: 2, boxShadow: '0 4px 24px 0 rgba(34, 41, 47, 0.1)' }}>
          <AddStaffWithSalaryForm onStaffAdded={handleStaffAdded} />
        </Paper>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: 'blue' }}>Staff List</Typography>
          <GenericTable 
            fetchData={getStaff} 
            columns={staffColumns}
            refreshKey={refreshKey}
          />
        </Box>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: 'blue' }}>Salary Structure</Typography>
          <GenericTable 
            fetchData={getSalaryStructures} 
            columns={salaryStructureColumns}
            refreshKey={refreshKey}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default StaffAndSalaryStructures;
