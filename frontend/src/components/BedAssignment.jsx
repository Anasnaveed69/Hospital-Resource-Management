import React from 'react';

import { useState, useEffect } from 'react';
import { TextField, Button, Box, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { getBeds, assignBed } from '../api';

function BedAssignment() {
  const [patientId, setPatientId] = useState('');
  const [bedId, setBedId] = useState('');
  const [beds, setBeds] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchBeds = async () => {
      try {
        const response = await getBeds();
        setBeds(response.data.filter(bed => !bed.isOccupied));
        setError('');
      } catch (err) {
        setError('Failed to fetch beds');
      }
    };
    fetchBeds();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await assignBed({ patientId: Number(patientId), bedId });
      setSuccess(response.data.message || 'Bed assigned successfully');
      setError('');
      setPatientId('');
      setBedId('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to assign bed');
      setSuccess('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <TextField
        fullWidth
        label="Patient ID"
        type="number"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
        required
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Bed</InputLabel>
        <Select
          value={bedId}
          onChange={(e) => setBedId(e.target.value)}
          required
        >
          <MenuItem value="">Select Bed</MenuItem>
          {beds.map((bed) => (
            <MenuItem key={bed.BedID} value={bed.BedID}>
              Bed {bed.BedID} (Room {bed.RoomID})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Assign Bed
      </Button>
    </Box>
  );
}

export default BedAssignment;