import React from 'react';
import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getRooms } from '../api';

function Rooms() {
  const columns = [
    { key: 'RoomID', label: 'Room ID' },
    { key: 'Room_Number', label: 'Room Number' },
    { key: 'Type', label: 'Type' },
    { key: 'Status', label: 'Status' },
    { key: 'number_of_Beds', label: 'Number of Beds' },
  ];

  return (
    <div>
     
      <GenericTable fetchData={getRooms} columns={columns} title="Rooms" />
    </div>
  );
}

export default Rooms;