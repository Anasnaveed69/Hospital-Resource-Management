import React from 'react';
import { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { assignDoctor } from '../api';

function AssignDoctorForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const formik = useFormik({
    initialValues: {
      patientId: '',
      staffId: '',
    },
    validationSchema: Yup.object({
      patientId: Yup.number().required('Required').positive().integer(),
      staffId: Yup.number().required('Required').positive().integer(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await assignDoctor(values);
        setSuccess(response.data.message || 'Doctor assigned successfully');
        setError('');
        resetForm();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to assign doctor');
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
        label="Staff ID (Doctor)"
        name="staffId"
        type="number"
        margin="normal"
        {...formik.getFieldProps('staffId')}
        error={formik.touched.staffId && Boolean(formik.errors.staffId)}
        helperText={formik.touched.staffId && formik.errors.staffId}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Assign Doctor
      </Button>
    </Box>
  );
}

export default AssignDoctorForm;