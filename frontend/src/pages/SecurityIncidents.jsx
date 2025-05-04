import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import SecurityIncidentForm from '../components/SecurityIncidentForm';
import { getSecurity, getStaff } from '../api';

function SecurityIncidents() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [staffMap, setStaffMap] = useState({});

  // Fetch staff to map HandleBy to names
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await getStaff();
        console.log('Fetched staff:', response.data);
        const map = response.data.reduce((acc, s) => {
          acc[s.Staff_Id] = s.Name;
          return acc;
        }, {});
        setStaffMap(map);
      } catch (err) {
        console.error('Error fetching staff for mapping:', err);
      }
    };
    fetchStaff();
  }, []);

  const handleIncidentLogged = () => {
    setRefreshKey((prev) => prev + 1); // Trigger table refresh
  };

  const columns = [
    { key: 'ID', label: 'Incident ID' },
    { key: 'Incident_Type', label: 'Incident Type' },
    { key: 'Description', label: 'Description' },
    {
      key: 'HandleBy',
      label: 'Handled By',
      format: (value) => staffMap[value] || `ID: ${value}`,
    },
    {
      key: 'Timestamp',
      label: 'Timestamp',
      format: (value) => new Date(value).toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }),
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" sx={{ mb: 4 }}>Security Incidents</Typography>
      <SecurityIncidentForm onIncidentLogged={handleIncidentLogged} />
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Incident List</Typography>
      <GenericTable
        fetchData={getSecurity}
        columns={columns}
        title="Security Incidents"
        refreshKey={refreshKey}
      />
    </div>
  );
}

export default SecurityIncidents;