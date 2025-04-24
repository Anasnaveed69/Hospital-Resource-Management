import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getStaff } from '../api';

function Staff() {
  const columns = [
    { key: 'Staff_Id', label: 'Staff ID' },
    { key: 'Name', label: 'Name' },
    { key: 'Role', label: 'Role' },
    { key: 'Availability', label: 'Availability' },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Staff</Typography>
      <GenericTable fetchData={getStaff} columns={columns} title="Staff" />
    </div>
  );
}

export default Staff;