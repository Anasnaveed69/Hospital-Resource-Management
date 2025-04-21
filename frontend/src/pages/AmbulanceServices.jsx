import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getAmbulanceServices } from '../api';

function AmbulanceServices() {
  const columns = [
    { key: 'ServiceID', label: 'Service ID' },
    { key: 'PatientID', label: 'Patient ID' },
    { key: 'Date', label: 'Date', format: (value) => new Date(value).toLocaleDateString() },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Ambulance Services</Typography>
      <GenericTable fetchData={getAmbulanceServices} columns={columns} title="Ambulance Services" />
    </div>
  );
}

export default AmbulanceServices;