import React from 'react';

import { Typography, Box } from '@mui/material';

function Home() {
  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4">Welcome to Hospital Resource Management System</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Manage patients, beds, staff, billing, pharmacy, and more efficiently.
      </Typography>
    </Box>
  );
}

export default Home;