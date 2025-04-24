import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Alert, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { getBeds, assignBed } from '../api';

function BedAssignment() {
  const [patientId, setPatientId] = useState('');
  const [bedId, setBedId] = useState('');
  const [beds, setBeds] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchBeds = async () => {
      try {
        const response = await getBeds();
        console.log('Fetched beds:', response.data);
        setBeds(response.data.filter(bed => bed.status === 'Available'));
        setError('');
      } catch (err) {
        setError('Failed to fetch beds');
        console.error('Error fetching beds:', err);
      }
    };
    fetchBeds();
  }, [refresh]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientId || isNaN(patientId) || Number(patientId) <= 0) {
      setError('Please enter a valid Patient ID');
      return;
    }
    if (!bedId) {
      setError('Please select a bed');
      return;
    }

    const payload = { patientId: Number(patientId), bedId: Number(bedId) };
    console.log('Assign bed payload:', payload);

    try {
      const response = await assignBed(payload);
      setSuccess(response.data.message || 'Bed assigned successfully');
      setError('');
      setPatientId('');
      setBedId('');
      setRefresh(!refresh);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to assign bed');
      setSuccess('');
      console.error('Error assigning bed:', err);
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
              Bed {bed.BedID} ({bed.Type})
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