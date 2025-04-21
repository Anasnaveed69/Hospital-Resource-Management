import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getAlerts } from '../api';

function Alerts() {
  const columns = [
    { key: 'AlertID', label: 'Alert ID' },
    { key: 'Description', label: 'Description' },
    { key: 'Date', label: 'Date', format: (value) => new Date(value).toLocaleDateString() },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Alerts</Typography>
      <GenericTable fetchData={getAlerts} columns={columns} title="Alerts" />
    </div>
  );
}

export default Alerts;