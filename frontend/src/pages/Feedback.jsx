import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getFeedback } from '../api';

function Feedback() {
  const columns = [
    { key: 'FeedbackID', label: 'Feedback ID' },
    { key: 'PatientID', label: 'Patient ID' },
    { key: 'Comments', label: 'Comments' },
    { key: 'Date', label: 'Date', format: (value) => new Date(value).toLocaleDateString() },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Patient Feedback</Typography>
      <GenericTable fetchData={getFeedback} columns={columns} title="Feedback" />
    </div>
  );
}

export default Feedback;