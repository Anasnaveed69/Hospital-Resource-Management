import React, { useState } from 'react';
import { TextField, Button, Box, Alert, Divider, Typography } from '@mui/material';
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
        console.log('Generate bill payload:', payload);
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
        console.log('Pay bill payload:', payload);
        const response = await payBill(payload);
        handleResult(response, 'Payment recorded successfully');
        resetForm();
      } catch (err) {
        handleError(err, 'Failed to record payment');
      }
    },
  });

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Typography variant="h6">Generate Bill</Typography>
      <Box component="form" onSubmit={genFormik.handleSubmit} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Bill ID"
          name="billId"
          type="number"
          margin="normal"
          {...genFormik.getFieldProps('billId')}
          error={genFormik.touched.billId && Boolean(genFormik.errors.billId)}
          helperText={genFormik.touched.billId && genFormik.errors.billId}
        />
        <TextField
          fullWidth
          label="Patient ID"
          name="patientId"
          type="number"
          margin="normal"
          {...genFormik.getFieldProps('patientId')}
          error={genFormik.touched.patientId && Boolean(genFormik.errors.patientId)}
          helperText={genFormik.touched.patientId && genFormik.errors.patientId}
        />
        <TextField
          fullWidth
          label="Total Amount"
          name="totalAmount"
          type="number"
          margin="normal"
          inputProps={{ step: '0.01' }}
          {...genFormik.getFieldProps('totalAmount')}
          error={genFormik.touched.totalAmount && Boolean(genFormik.errors.totalAmount)}
          helperText={genFormik.touched.totalAmount && genFormik.errors.totalAmount}
        />
        <TextField
          fullWidth
          label="Paid Amount"
          name="paidAmount"
          type="number"
          margin="normal"
          inputProps={{ step: '0.01' }}
          {...genFormik.getFieldProps('paidAmount')}
          error={genFormik.touched.paidAmount && Boolean(genFormik.errors.paidAmount)}
          helperText={genFormik.touched.paidAmount && genFormik.errors.paidAmount}
        />
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Generate Bill
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6">Pay Bill</Typography>
      <Box component="form" onSubmit={payFormik.handleSubmit}>
        <TextField
          fullWidth
          label="Bill ID"
          name="billId"
          type="number"
          margin="normal"
          {...payFormik.getFieldProps('billId')}
          error={payFormik.touched.billId && Boolean(payFormik.errors.billId)}
          helperText={payFormik.touched.billId && payFormik.errors.billId}
        />
        <TextField
          fullWidth
          label="Payment Amount"
          name="paymentAmount"
          type="number"
          margin="normal"
          inputProps={{ step: '0.01' }}
          {...payFormik.getFieldProps('paymentAmount')}
          error={payFormik.touched.paymentAmount && Boolean(payFormik.errors.paymentAmount)}
          helperText={payFormik.touched.paymentAmount && payFormik.errors.paymentAmount}
        />
        <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2 }}>
          Pay Bill
        </Button>
      </Box>
    </Box>
  );
}

export default BillForm;