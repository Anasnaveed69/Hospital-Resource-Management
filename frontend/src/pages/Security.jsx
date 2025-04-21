import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getSecurity } from '../api';

function Security() {
  const columns = [
    { key: 'SecurityID', label: 'Security ID' },
    { key: 'Description', label: 'Description' },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Security</Typography>
      <GenericTable fetchData={getSecurity} columns={columns} title="Security" />
    </div>
  );
}

export default Security;