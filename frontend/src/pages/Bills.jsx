import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert, CircularProgress, Typography, Box } from '@mui/material';
import BillForm from '../components/BillForm';
import { getBills } from '../api';

function Bills() {
  const [bills, setBills] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchBills = async () => {
    try {
      const response = await getBills();
      setBills(response.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch bills');
      console.error('Error fetching bills:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Billing Management
      </Typography>
      
      <BillForm onBillChange={fetchBills} />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : bills.length === 0 ? (
        <Alert severity="info">No bill records found.</Alert>
      ) : (
        <>
          {/* Total Bills Heading */}
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
            Total Bills
          </Typography>

          <TableContainer
            component={Paper}
            elevation={3}
            sx={{ maxHeight: 500, borderRadius: 2 }}
          >
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                  <TableCell sx={{ fontWeight: 600, color: '#1565c0' }}>Bill ID</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1565c0' }}>Patient ID</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1565c0' }}>Total Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1565c0' }}>Paid Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1565c0' }}>Due Amount</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1565c0' }}>Payment Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1565c0' }}>Billing Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bills.map((bill, index) => (
                  <TableRow
                    key={bill.Bill_Id}
                    hover
                    sx={{
                      backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
                      '&:hover': {
                        backgroundColor: '#e3f2fd',
                      },
                    }}
                  >
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
        </>
      )}
    </Box>
  );
}

export default Bills;
