import React, { useState } from 'react';
import { Typography, Box, Paper, Divider } from '@mui/material';
import GenericTable from '../components/GenericTable';
import AddAlertReportForm from '../components/addAlerts';
import { getAlerts } from '../api';

function Alerts() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAlertAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const columns = [
    { key: 'Alert_ID', label: 'Alert ID' },
    { key: 'Type', label: 'Type' },
    { key: 'Description', label: 'Description' },
    {
      key: 'Timestamp',
      label: 'Date & Time',
      format: (value) => new Date(value).toLocaleString(),
    },
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
            mb: 2,
            fontWeight: 700,
            color: '#1976D2',
            letterSpacing: 1,
          }}
        >
          Alert Reports
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: 700,
            color: '#1976D2',
            letterSpacing: 0.5,
          }}
        >
          
        </Typography>
        <AddAlertReportForm onAlertAdded={handleAlertAdded} />

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
          fetchData={getAlerts}
          columns={columns}
          title="Alert Lists"
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

export default Alerts;
