import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getStaffAvailability } from '../api';

function StaffAvailability() {
  const columns = [
    { key: 'StaffID', label: 'Staff ID' },
    { key: 'Name', label: 'Name' },
    { key: 'Availability', label: 'Availability' },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Staff Availability</Typography>
      <GenericTable fetchData={getStaffAvailability} columns={columns} title="Staff Availability" />
    </div>
  );
}

export default StaffAvailability;