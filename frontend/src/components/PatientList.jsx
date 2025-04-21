import React from 'react';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material';
import { getPatients } from '../api';

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');

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
      }
    };
    fetchPatients();
  }, []);

  return (
    <div>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Admission Date</TableCell>
              <TableCell>Diagnosis</TableCell>
              <TableCell>Discharge Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.PatientID}>
                <TableCell>{patient.PatientID}</TableCell>
                <TableCell>{patient.Name}</TableCell>
                <TableCell>{new Date(patient.AdmissionDate).toLocaleDateString()}</TableCell>
                <TableCell>{patient.Diagnosis}</TableCell>
                <TableCell>
                  {patient.Discharge_Date ? new Date(patient.Discharge_Date).toLocaleDateString() : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PatientList;