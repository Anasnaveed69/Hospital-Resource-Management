import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  CircularProgress,
  Typography,
  Box
} from '@mui/material';
import { getPatients } from '../api';

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await getPatients();
        setPatients(response.data);
        setError('');
      } catch (err) {
        const errorMessage = err.response?.data?.error || err.message || 'Failed to fetch patients';
        setError(errorMessage);
        console.error('Fetch patients error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
   
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : patients.length === 0 ? (
        <Alert severity="info">No patient records found.</Alert>
      ) : (
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{ maxHeight: 500, borderRadius: 2 }}
        >
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                <TableCell sx={{ fontWeight: 600, color: '#1565c0' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1565c0' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1565c0' }}>Admission Date</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1565c0' }}>Diagnosis</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1565c0' }}>Discharge Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((patient, index) => (
                <TableRow
                  key={patient.PatientID}
                  hover
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
                    '&:hover': {
                      backgroundColor: '#e3f2fd',
                    },
                  }}
                >
                  <TableCell>{patient.PatientID}</TableCell>
                  <TableCell>{patient.Name}</TableCell>
                  <TableCell>{new Date(patient.AdmissionDate).toLocaleDateString()}</TableCell>
                  <TableCell>{patient.Diagnosis}</TableCell>
                  <TableCell>
                    {patient.Discharge_Date
                      ? new Date(patient.Discharge_Date).toLocaleDateString()
                      : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default PatientList;
