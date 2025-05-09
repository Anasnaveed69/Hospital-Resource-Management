import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Paper,
  Divider,
  CircularProgress,
} from '@mui/material';
import { getBeds, assignBed } from '../api';

function BedAssignment() {
  const [patientId, setPatientId] = useState('');
  const [bedId, setBedId] = useState('');
  const [beds, setBeds] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBeds = async () => {
      try {
        const response = await getBeds();
        setBeds(response.data.filter(bed => bed.status === 'Available'));
        setError('');
      } catch (err) {
        setError('Failed to fetch beds');
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

    setLoading(true);
    const payload = { patientId: Number(patientId), bedId: Number(bedId) };

    try {
      const response = await assignBed(payload);
      setSuccess(response.data.message || 'Bed assigned successfully');
      setError('');
      setPatientId('');
      setBedId('');
      setRefresh(r => !r);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to assign bed');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ background: '#f4f6f8', minHeight: '100vh', py: 6 }}>
      <Paper
        elevation={4}
        sx={{
          maxWidth: 480,
          mx: 'auto',
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          boxShadow: '0 4px 24px rgba(25, 118, 210, 0.08)',
          background: '#fff',
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontWeight: 700,
            color: '#1976D2',
            mb: 1,
            letterSpacing: 1,
          }}
        >
          Assign Bed to Patient
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: '#607d8b', mb: 2 }}
        >
          Select an available bed and assign it to a patient.
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box component="form" onSubmit={handleSubmit}>
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
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Bed</InputLabel>
            <Select
              value={bedId}
              onChange={(e) => setBedId(e.target.value)}
              label="Bed"
              required
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="">Select Bed</MenuItem>
              {beds.map((bed) => (
                <MenuItem key={bed.BedID} value={bed.BedID}>
                  Bed {bed.BedID} ({bed.Type})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            disabled={loading}
            sx={{
              mt: 3,
              borderRadius: 2,
              fontWeight: 700,
              fontSize: '1.07rem',
              py: 1.2,
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
              letterSpacing: 0.5,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Assign Bed'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default BedAssignment;
