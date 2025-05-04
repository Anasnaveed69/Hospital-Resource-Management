import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material';
import BillForm from '../components/BillForm';
import { getBills } from '../api';

function Bills() {
  const [bills, setBills] = useState([]);
  const [error, setError] = useState('');

  const fetchBills = async () => {
    try {
      const response = await getBills();
      console.log('Fetched bills:', response.data);
      setBills(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch bills');
      console.error('Error fetching bills:', err);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" sx={{ mb: 4 }}>Billing Management</Typography>
      <BillForm onBillChange={fetchBills} />
      {error && <Alert severity="error" sx={{ mt: 2, mb: 2 }}>{error}</Alert>}
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Bill List</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bill ID</TableCell>
              <TableCell>Patient ID</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Paid Amount</TableCell>
              <TableCell>Due Amount</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Billing Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.map((bill) => (
              <TableRow key={bill.Bill_Id}>
                <TableCell>{bill.Bill_Id}</TableCell>
                <TableCell>{bill.Patient_Id}</TableCell>
                <TableCell>{bill.Total_Amount.toFixed(2)}</TableCell>
                <TableCell>{bill.Paid_Amount.toFixed(2)}</TableCell>
                <TableCell>{bill.Due_Amount.toFixed(2)}</TableCell>
                <TableCell>{bill.Payment_Status}</TableCell>
                <TableCell>{new Date(bill.BillingDate).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Bills;