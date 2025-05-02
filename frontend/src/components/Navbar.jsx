import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Hospital Resource Management
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/register-patient">Register Patient</Button>
          <Button color="inherit" component={Link} to="/patients">Patients</Button>
          <Button color="inherit" component={Link} to="/patient-history">Patient History</Button>
          <Button color="inherit" component={Link} to="/assign-bed">Assign Bed</Button>
          <Button color="inherit" component={Link} to="/assign-doctor">Assign Doctor</Button>
          <Button color="inherit" component={Link} to="/schedule-appointment">Schedule Appointment</Button>
          <Button color="inherit" component={Link} to="/bills">Bills</Button>
          <Button color="inherit" component={Link} to="/rooms">Rooms</Button>
          <Button color="inherit" component={Link} to="/beds">Beds</Button>
          <Button color="inherit" component={Link} to="/staff">Staff</Button>
          <Button color="inherit" component={Link} to="/pharmacy">Pharmacy</Button>
          <Button color="inherit" component={Link} to="/security-incidents">Security Incidents</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;