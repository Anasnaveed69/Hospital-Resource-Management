import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import SecurityIncidentForm from '../components/SecurityIncidentForm';
import { getSecurityIncidents } from '../api';

function SecurityIncidents() {
  const columns = [
    { key: 'IncidentID', label: 'Incident ID' },
    { key: 'Description', label: 'Description' },
    { key: 'Date', label: 'Date', format: (value) => new Date(value).toLocaleDateString() },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Security Incidents</Typography>
      <SecurityIncidentForm />
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Incident List</Typography>
      <GenericTable fetchData={getSecurityIncidents} columns={columns} title="Security Incidents" />
    </div>
  );
}

export default SecurityIncidents;