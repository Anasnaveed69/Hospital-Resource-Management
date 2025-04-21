import React from 'react';
import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { trackEquipment } from '../api';

function TrackEquipment() {
  const columns = [
    { key: 'EquipmentID', label: 'Equipment ID' },
    { key: 'Name', label: 'Name' },
    { key: 'UsageStatus', label: 'Usage Status' },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Track Equipment</Typography>
      <GenericTable fetchData={trackEquipment} columns={columns} title="Equipment Tracking" />
    </div>
  );
}

export default TrackEquipment;