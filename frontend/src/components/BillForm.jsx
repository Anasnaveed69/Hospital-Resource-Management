import React from 'react';

import { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { generateBill, payBill } from '../api';

function BillForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const formik = useFormik({
    initialValues: {
      patientId: '',
      amount: '',
      description: '',
    },
    validationSchema: Yup.object({
      patientId: Yup.number().required('Required').positive().integer(),
      amount: Yup.number().required('Required').positive(),
      description: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await generateBill(values);
        setSuccess(response.data.message || 'Bill generated successfully');
        setError('');
        resetForm();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to generate bill');
        setSuccess('');
      }
    },
  });

  const handlePay = async () => {
    try {
      const response = await payBill({ patientId: Number(formik.values.patientId) });
      setSuccess(response.data.message || 'Bill paid successfully');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to pay bill');
      setSuccess('');
    }
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <TextField
        fullWidth
        label="Patient ID"
        name="patientId"
        type="number"
        margin="normal"
        {...formik.getFieldProps('patientId')}
        error={formik.touched.patientId && Boolean(formik.errors.patientId)}
        helperText={formik.touched.patientId && formik.errors.patientId}
      />
      <TextField
        fullWidth
        label="Amount"
        name="amount"
        type="number"
        margin="normal"
        {...formik.getFieldProps('amount')}
        error={formik.touched.amount && Boolean(formik.errors.amount)}
        helperText={formik.touched.amount && formik.errors.amount}
      />
      <TextField
        fullWidth
        label="Description"
        name="description"
        margin="normal"
        {...formik.getFieldProps('description')}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2, mr: 2 }}>
        Generate Bill
      </Button>
      <Button variant="contained" color="secondary" onClick={handlePay} sx={{ mt: 2 }}>
        Pay Bill
      </Button>
    </Box>
  );
}

export default BillForm;