import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Alert,
  Divider,
  Typography,
  Paper,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { generateBill, payBill } from '../api';

function BillForm({ onBillChange }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleResult = (response, successMsg) => {
    setSuccess(response.data.message || successMsg);
    setError('');
    if (onBillChange) onBillChange(); // Trigger bill list refresh
  };

  const handleError = (err, fallbackMsg) => {
    setError(err.response?.data?.error || fallbackMsg);
    setSuccess('');
    console.error('Error:', err);
  };

  const genFormik = useFormik({
    initialValues: {
      billId: '',
      patientId: '',
      totalAmount: '',
      paidAmount: '',
    },
    validationSchema: Yup.object({
      billId: Yup.number().required('Bill ID is required').positive().integer(),
      patientId: Yup.number().required('Patient ID is required').positive().integer(),
      totalAmount: Yup.number().required('Total amount is required').positive('Must be positive'),
      paidAmount: Yup.number().required('Paid amount is required').min(0, 'Cannot be negative'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          billId: Number(values.billId),
          patientId: Number(values.patientId),
          totalAmount: Number(values.totalAmount),
          paidAmount: Number(values.paidAmount),
        };
        const response = await generateBill(payload);
        handleResult(response, 'Bill generated successfully');
        resetForm();
      } catch (err) {
        handleError(err, 'Failed to generate bill');
      }
    },
  });

  const payFormik = useFormik({
    initialValues: {
      billId: '',
      paymentAmount: '',
    },
    validationSchema: Yup.object({
      billId: Yup.number().required('Bill ID is required').positive().integer(),
      paymentAmount: Yup.number().required('Payment amount is required').positive('Must be positive'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          billId: Number(values.billId),
          paymentAmount: Number(values.paymentAmount),
        };
        const response = await payBill(payload);
        handleResult(response, 'Payment recorded successfully');
        resetForm();
      } catch (err) {
        handleError(err, 'Failed to record payment');
      }
    },
  });

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
          Billing Management
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: '#607d8b', mb: 2 }}
        >
          Generate and pay bills for patients.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Typography variant="h6" sx={{ color: '#1976D2', mt: 2, mb: 1 }}>
          Generate Bill
        </Typography>
        <Box component="form" onSubmit={genFormik.handleSubmit} sx={{ mb: 4 }}>
          <TextField
            fullWidth
            label="Bill ID"
            name="billId"
            type="number"
            margin="normal"
            variant="outlined"
            {...genFormik.getFieldProps('billId')}
            error={genFormik.touched.billId && Boolean(genFormik.errors.billId)}
            helperText={genFormik.touched.billId && genFormik.errors.billId}
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <TextField
            fullWidth
            label="Patient ID"
            name="patientId"
            type="number"
            margin="normal"
            variant="outlined"
            {...genFormik.getFieldProps('patientId')}
            error={genFormik.touched.patientId && Boolean(genFormik.errors.patientId)}
            helperText={genFormik.touched.patientId && genFormik.errors.patientId}
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <TextField
            fullWidth
            label="Total Amount"
            name="totalAmount"
            type="number"
            margin="normal"
            inputProps={{ step: '0.01' }}
            variant="outlined"
            {...genFormik.getFieldProps('totalAmount')}
            error={genFormik.touched.totalAmount && Boolean(genFormik.errors.totalAmount)}
            helperText={genFormik.touched.totalAmount && genFormik.errors.totalAmount}
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <TextField
            fullWidth
            label="Paid Amount"
            name="paidAmount"
            type="number"
            margin="normal"
            inputProps={{ step: '0.01' }}
            variant="outlined"
            {...genFormik.getFieldProps('paidAmount')}
            error={genFormik.touched.paidAmount && Boolean(genFormik.errors.paidAmount)}
            helperText={genFormik.touched.paidAmount && genFormik.errors.paidAmount}
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{
              mt: 2,
              borderRadius: 2,
              fontWeight: 700,
              fontSize: '1.07rem',
              py: 1.2,
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
              letterSpacing: 0.5,
            }}
          >
            Generate Bill
          </Button>
        </Box>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h6" sx={{ color: '#1976D2', mb: 1 }}>
          Pay Bill
        </Typography>
        <Box component="form" onSubmit={payFormik.handleSubmit}>
          <TextField
            fullWidth
            label="Bill ID"
            name="billId"
            type="number"
            margin="normal"
            variant="outlined"
            {...payFormik.getFieldProps('billId')}
            error={payFormik.touched.billId && Boolean(payFormik.errors.billId)}
            helperText={payFormik.touched.billId && payFormik.errors.billId}
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <TextField
            fullWidth
            label="Payment Amount"
            name="paymentAmount"
            type="number"
            margin="normal"
            inputProps={{ step: '0.01' }}
            variant="outlined"
            {...payFormik.getFieldProps('paymentAmount')}
            error={payFormik.touched.paymentAmount && Boolean(payFormik.errors.paymentAmount)}
            helperText={payFormik.touched.paymentAmount && payFormik.errors.paymentAmount}
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            fullWidth
            sx={{
              mt: 2,
              borderRadius: 2,
              fontWeight: 700,
              fontSize: '1.07rem',
              py: 1.2,
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
              letterSpacing: 0.5,
            }}
          >
            Pay Bill
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default BillForm;
