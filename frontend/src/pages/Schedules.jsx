import React from 'react';
import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getSchedules } from '../api';

function Schedules() {
  const columns = [
    { key: 'Schedule_ID', label: 'Schedule ID' },
    { key: 'Resources_ID', label: 'Resource ID' },
    { key: 'start_Time', label: 'Start Time', format: (value) => new Date(value).toLocaleString() },
    { key: 'End_Time', label: 'End Time', format: (value) => new Date(value).toLocaleString() },
    { key: 'status', label: 'Status' },
  ];

  return (
    <div>
      
      <GenericTable fetchData={getSchedules} columns={columns} title="Schedules" />
    </div>
  );
}

export default Schedules;
