import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getAmbulanceServices } from '../api';

function AmbulanceServices() {
  const columns = [
    { key: 'Service_ID', label: 'Service ID' },

    { key: 'Driver_Name', label: 'Driver Name' },
    { key: 'Vehicle_Number', label: 'Vehicle Number' },
    { key: 'Pickup_Location', label: 'Pickup Location' },
    { key: 'Drop_Location', label: 'Drop Location' },
    { key: 'Service_Date', label: 'Service Date', format: (value) => new Date(value).toLocaleDateString() },
  ];

  return (
    <div>
      
      <GenericTable
        fetchData={getAmbulanceServices}
        columns={columns}
        title="Ambulance Services"
      />
    </div>
  );
}

export default AmbulanceServices;
