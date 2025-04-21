import React from 'react';



import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getRooms } from '../api';

function Rooms() {
  const columns = [
    { key: 'RoomID', label: 'Room ID' },
    { key: 'Type', label: 'Type' },
    { key: 'Capacity', label: 'Capacity' },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Rooms</Typography>
      <GenericTable fetchData={getRooms} columns={columns} title="Rooms" />
    </div>
  );
}

export default Rooms;