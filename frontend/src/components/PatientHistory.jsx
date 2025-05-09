import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Alert,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Divider,
  CircularProgress,
} from '@mui/material';
import { getPatientHistory } from '../api';

function PatientHistory() {
  const [patientId, setPatientId] = useState('');
  const [history, setHistory] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientId || isNaN(patientId)) {
      setError('Please enter a valid Patient ID');
      return;
    }
    setLoading(true);
    try {
      const response = await getPatientHistory(patientId);
      setHistory(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch history');
      setHistory(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ background: '#f4f6f8', minHeight: '100vh', py: 6 }}>
      <Paper
        elevation={4}
        sx={{
          maxWidth: 700,
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
          Patient History Lookup
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: '#607d8b', mb: 2 }}
        >
          Enter a Patient ID to view their history.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mb: 2,
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
          }}
        >
          <TextField
            label="Patient ID"
            type="number"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
            size="small"
            sx={{ flex: 1, minWidth: 120 }}
            error={!!error && !patientId}
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            sx={{
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              py: 1,
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
              fontSize: '1rem',
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Get History'}
          </Button>
        </Box>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

        {history && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" sx={{ color: '#1976D2', fontWeight: 700, mb: 2 }}>
              Patient Info
            </Typography>
            {history.patientInfo?.length > 0 ? (
              <TableContainer component={Paper} sx={{ mb: 3, borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ background: '#e3f2fd' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Admission Date</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Discharge Date</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Diagnosis</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history.patientInfo.map((info) => (
                      <TableRow key={info.PatientID}>
                        <TableCell>{info.PatientID}</TableCell>
                        <TableCell>{info.Name}</TableCell>
                        <TableCell>{new Date(info.AdmissionDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          {info.Discharge_Date ? new Date(info.Discharge_Date).toLocaleDateString() : 'N/A'}
                        </TableCell>
                        <TableCell>{info.Diagnosis}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography color="text.secondary" sx={{ mb: 2 }}>No patient info found.</Typography>
            )}

            <Typography variant="h6" sx={{ color: '#1976D2', fontWeight: 700, mb: 2 }}>
              Appointments
            </Typography>
            {history.appointments?.length > 0 ? (
              <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                  <TableHead sx={{ background: '#e3f2fd' }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Doctor</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Start Time</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>End Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {history.appointments.map((appt) => (
                      <TableRow key={appt.Appointments_ID}>
                        <TableCell>{appt.Appointments_ID}</TableCell>
                        <TableCell>{appt.Doctor_Name}</TableCell>
                        <TableCell>{new Date(appt.start_Time).toLocaleString()}</TableCell>
                        <TableCell>{new Date(appt.End_Time).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography color="text.secondary">No appointments found.</Typography>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default PatientHistory;
