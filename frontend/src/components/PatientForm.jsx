import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Alert,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
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
      dischargeDate: '',
      diagnosis: '',
    },
    validationSchema: Yup.object({
      patientId: Yup.number().required('Patient ID is required').positive().integer(),
      name: Yup.string().required('Name is required'),
      admissionDate: Yup.date().required('Admission date is required').typeError('Invalid date'),
      dischargeDate: Yup.date()
        .nullable()
        .typeError('Invalid date')
        .min(Yup.ref('admissionDate'), 'Discharge date cannot be before admission date'),
      diagnosis: Yup.string().required('Diagnosis is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          patientId: Number(values.patientId),
          name: values.name,
          admissionDate: values.admissionDate,
          dischargeDate: values.dischargeDate || null,
          diagnosis: values.diagnosis,
        };
        const response = await registerPatient(payload);
        setSuccess(response.data.message || 'Patient registered successfully');
        setError('');
        resetForm();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to register patient');
        setSuccess('');
      }
    },
  });

  const handleDischargeDateChange = (e) => {
    const value = e.target.value || null;
    formik.setFieldValue('dischargeDate', value);
  };

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
          Patient Registration
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: '#607d8b', mb: 2 }}
        >
          Please fill in the details below to register a new patient.
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Box component="form" onSubmit={formik.handleSubmit}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
          <TextField
            fullWidth
            label="Patient ID"
            name="patientId"
            type="number"
            margin="normal"
            variant="outlined"
            {...formik.getFieldProps('patientId')}
            error={formik.touched.patientId && Boolean(formik.errors.patientId)}
            helperText={formik.touched.patientId && formik.errors.patientId}
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            variant="outlined"
            {...formik.getFieldProps('name')}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <TextField
            fullWidth
            label="Admission Date"
            name="admissionDate"
            type="date"
            margin="normal"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            {...formik.getFieldProps('admissionDate')}
            error={formik.touched.admissionDate && Boolean(formik.errors.admissionDate)}
            helperText={formik.touched.admissionDate && formik.errors.admissionDate}
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <TextField
            fullWidth
            label="Discharge Date"
            name="dischargeDate"
            type="date"
            margin="normal"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={formik.values.dischargeDate}
            onChange={handleDischargeDateChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dischargeDate && Boolean(formik.errors.dischargeDate)}
            helperText={formik.touched.dischargeDate && formik.errors.dischargeDate}
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <TextField
            fullWidth
            label="Diagnosis"
            name="diagnosis"
            margin="normal"
            variant="outlined"
            {...formik.getFieldProps('diagnosis')}
            error={formik.touched.diagnosis && Boolean(formik.errors.diagnosis)}
            helperText={formik.touched.diagnosis && formik.errors.diagnosis}
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{
              mt: 3,
              borderRadius: 2,
              fontWeight: 700,
              fontSize: '1.07rem',
              py: 1.2,
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)',
              letterSpacing: 0.5,
            }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default PatientForm;
