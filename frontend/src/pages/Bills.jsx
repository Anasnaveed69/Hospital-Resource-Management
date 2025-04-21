import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material';
import BillForm from '../components/BillForm';
import { getBills } from '../api';

function Bills() {
  const [bills, setBills] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await getBills();
        setBills(response.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch bills');
      }
    };
    fetchBills();
  }, []);

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Billing Management</Typography>
      <BillForm />
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Bill List</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bill ID</TableCell>
              <TableCell>Patient ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.map((bill) => (
              <TableRow key={bill.BillID}>
                <TableCell>{bill.BillID}</TableCell>
                <TableCell>{bill.PatientID}</TableCell>
                <TableCell>{bill.Amount}</TableCell>
                <TableCell>{bill.Description}</TableCell>
                <TableCell>{bill.Status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Bills;