import React from 'react';

import { useState } from 'react';
import { TextField, Button, Box, Alert, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Typography } from '@mui/material';
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
    <Box>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Patient ID"
          type="number"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          required
          sx={{ mr: 2 }}
          error={!!error && !patientId}
        />
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? 'Loading...' : 'Get History'}
        </Button>
      </form>
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      {history && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Patient Info</Typography>
          {history.patientInfo?.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Admission Date</TableCell>
                    <TableCell>Discharge Date</TableCell>
                    <TableCell>Diagnosis</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {history.patientInfo.map((info) => (
                    <TableRow key={info.PatientID}>
                      <TableCell>{info.PatientID}</TableCell>
                      <TableCell>{info.Name}</TableCell>
                      <TableCell>{new Date(info.AdmissionDate).toLocaleDateString()}</TableCell>
                      <TableCell>{info.Discharge_Date ? new Date(info.Discharge_Date).toLocaleDateString() : 'N/A'}</TableCell>
                      <TableCell>{info.Diagnosis}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No patient info found</Typography>
          )}
          <Typography variant="h6" sx={{ mt: 4 }}>Appointments</Typography>
          {history.appointments?.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Doctor</TableCell>
                    <TableCell>Start Time</TableCell>
                    <TableCell>End Time</TableCell>
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
            <Typography>No appointments found</Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

export default PatientHistory;