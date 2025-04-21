import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getBedOccupancy } from '../api';

function BedOccupancy() {
  const columns = [
    { key: 'BedID', label: 'Bed ID' },
    { key: 'PatientID', label: 'Patient ID' },
    { key: 'RoomID', label: 'Room ID' },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Bed Occupancy</Typography>
      <GenericTable fetchData={getBedOccupancy} columns={columns} title="Bed Occupancy" />
    </div>
  );
}

export default BedOccupancy;