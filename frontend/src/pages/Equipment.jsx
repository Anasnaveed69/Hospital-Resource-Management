import React, { useState } from 'react';
import { Typography, Box, Paper, Divider } from '@mui/material';
import GenericTable from '../components/GenericTable';
import AddEquipmentForm from '../components/addEquipmentForm';
import { getEquipment } from '../api';

function Equipment() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEquipmentAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const columns = [
    { key: 'EquipmentID', label: 'Equipment ID' },
    { key: 'Name', label: 'Name' },
    { key: 'Location', label: 'Location' },
    { key: 'Availability', label: 'Availability' },
  ];

  return (
    <Box sx={{ background: '#f4f6f8', minHeight: '100vh', py: 6 }}>
      <Paper
        elevation={4}
        sx={{
          maxWidth: 700,
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
          Equipment Management
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <AddEquipmentForm onEquipmentAdded={handleEquipmentAdded} />
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
          fetchData={getEquipment}
          columns={columns}
          title="Equipment"
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

export default Equipment;
