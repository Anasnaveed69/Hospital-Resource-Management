import React from 'react';
import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getRegistrations } from '../api';

function Registrations() {
  const columns = [
    { key: 'RegistrationID', label: 'Registration ID' },
    { key: 'PatientID', label: 'Patient ID' },
    { key: 'Date', label: 'Date', format: (value) => new Date(value).toLocaleDateString() },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Registrations</Typography>
      <GenericTable fetchData={getRegistrations} columns={columns} title="Registrations" />
    </div>
  );
}

export default Registrations;