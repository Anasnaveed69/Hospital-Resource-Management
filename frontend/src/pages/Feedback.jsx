import React from 'react';
import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getFeedback } from '../api';

function Feedback() {
  const columns = [
    { key: 'Feedback_Id', label: 'Feedback ID' },
    { key: 'Patient_Id', label: 'Patient ID' },
    { key: 'Feedback', label: 'Comments' },
    { key: 'Rating', label: 'Rating' },
    { key: 'Feedback_Date', label: 'Date', format: (value) => new Date(value).toLocaleDateString() },
  ];

  return (
    <div>
   
      <GenericTable fetchData={getFeedback} columns={columns} title="Feedback" />
    </div>
  );
}

export default Feedback;
