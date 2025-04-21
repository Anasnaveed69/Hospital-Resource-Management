import React from 'react';

import { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerPatient } from '../api';

function PatientForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const formik = useFormik({
    initialValues: {
      patientId: '',
      name: '',
      admissionDate: '',
      diagnosis: '',
    },
    validationSchema: Yup.object({
      patientId: Yup.number().required('Required').positive().integer(),
      name: Yup.string().required('Required'),
      admissionDate: Yup.date().required('Required'),
      diagnosis: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await registerPatient(values);
        setSuccess(response.data.message || 'Patient registered successfully');
        setError('');
        resetForm();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to register patient');
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
        label="Name"
        name="name"
        margin="normal"
        {...formik.getFieldProps('name')}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />
      <TextField
        fullWidth
        label="Admission Date"
        name="admissionDate"
        type="date"
        margin="normal"
        InputLabelProps={{ shrink: true }}
        {...formik.getFieldProps('admissionDate')}
        error={formik.touched.admissionDate && Boolean(formik.errors.admissionDate)}
        helperText={formik.touched.admissionDate && formik.errors.admissionDate}
      />
      <TextField
        fullWidth
        label="Diagnosis"
        name="diagnosis"
        margin="normal"
        {...formik.getFieldProps('diagnosis')}
        error={formik.touched.diagnosis && Boolean(formik.errors.diagnosis)}
        helperText={formik.touched.diagnosis && formik.errors.diagnosis}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Register
      </Button>
    </Box>
  );
}

export default PatientForm;