import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import { getPatientAssignments } from '../api';

function PatientAssignments() {
  const columns = [
    { key: 'PatientID', label: 'Patient ID' },
    { key: 'StaffID', label: 'Staff ID' },
    { key: 'AssignmentDate', label: 'Assignment Date', format: (value) => new Date(value).toLocaleDateString() },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Patient Assignments</Typography>
      <GenericTable fetchData={getPatientAssignments} columns={columns} title="Patient Assignments" />
    </div>
  );
}

export default PatientAssignments;