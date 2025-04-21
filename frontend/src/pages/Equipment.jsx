import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getEquipment } from '../api';

function Equipment() {
  const columns = [
    { key: 'EquipmentID', label: 'Equipment ID' },
    { key: 'Name', label: 'Name' },
    { key: 'Status', label: 'Status' },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Medical Equipment</Typography>
      <GenericTable fetchData={getEquipment} columns={columns} title="Equipment" />
    </div>
  );
}

export default Equipment;