import React from 'react';


import { Typography } from '@mui/material';
import BedAssignment from '../components/BedAssignment';

function AssignBed() {
  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 ,fontWeight: 'bold',color:'blue'}}> Bed Assignment</Typography>
      <BedAssignment />
    </div>
  );
}

export default AssignBed;