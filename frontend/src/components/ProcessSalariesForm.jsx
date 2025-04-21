import { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { processSalaries } from '../api';

function ProcessSalariesForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const formik = useFormik({
    initialValues: {
      month: '',
      year: '',
    },
    validationSchema: Yup.object({
      month: Yup.number().required('Required').min(1).max(12),
      year: Yup.number().required('Required').min(2000).max(2100),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await processSalaries(values);
        setSuccess(response.data.message || 'Salaries processed successfully');
        setError('');
        resetForm();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to process salaries');
        setSuccess('');
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <TextField
        fullWidth
        label="Month"
        name="month"
        type="number"
        margin="normal"
        {...formik.getFieldProps('month')}
        error={formik.touched.month && Boolean(formik.errors.month)}
        helperText={formik.touched.month && formik.errors.month}
      />
      <TextField
        fullWidth
        label="Year"
        name="year"
        type="number"
        margin="normal"
        {...formik.getFieldProps('year')}
        error={formik.touched.year && Boolean(formik.errors.year)}
        helperText={formik.touched.year && formik.errors.year}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Process Salaries
      </Button>
    </Box>
  );
}

export default ProcessSalariesForm;