import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getSchedules } from '../api';

function Schedules() {
  const columns = [
    { key: 'ScheduleID', label: 'Schedule ID' },
    { key: 'StaffID', label: 'Staff ID' },
    { key: 'StartTime', label: 'Start Time', format: (value) => new Date(value).toLocaleString() },
    { key: 'EndTime', label: 'End Time', format: (value) => new Date(value).toLocaleString() },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Schedules</Typography>
      <GenericTable fetchData={getSchedules} columns={columns} title="Schedules" />
    </div>
  );
}

export default Schedules;