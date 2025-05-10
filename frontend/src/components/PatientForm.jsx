import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Alert,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  Fade,
  Slide,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerPatient } from '../api';

function PatientForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      patientId: '',
      name: '',
      admissionDate: '',
      dischargeDate: '',
      diagnosis: '',
    },
    validationSchema: Yup.object({
      patientId: Yup.number()
        .typeError('Patient ID must be a number')
        .required('Patient ID is required')
        .positive('Patient ID must be positive')
        .integer('Patient ID must be an integer'),
      name: Yup.string()
        .required('Name is required')
        .max(100, 'Name is too long'),
      admissionDate: Yup.date()
        .required('Admission date is required')
        .typeError('Invalid date'),
      dischargeDate: Yup.date()
        .nullable()
        .typeError('Invalid date')
        .min(Yup.ref('admissionDate'), 'Discharge date cannot be before admission date'),
      diagnosis: Yup.string()
        .required('Diagnosis is required')
        .max(500, 'Diagnosis is too long'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const payload = {
          patientId: Number(values.patientId),
          name: values.name.trim(),
          admissionDate: values.admissionDate,
          dischargeDate: values.dischargeDate || null,
          diagnosis: values.diagnosis.trim(),
        };
        const response = await registerPatient(payload);
        setSuccess(response.data.message || 'Patient registered successfully');
        setError('');
        resetForm();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to register patient');
        setSuccess('');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleDischargeDateChange = (e) => {
    const value = e.target.value || null;
    formik.setFieldValue('dischargeDate', value);
  };

  return (
    <Box
      sx={{
        background: '#f4f6f8',
        minHeight: '100vh',
        py: { xs: 4, sm: 6 },
        px: { xs: 2, sm: 0 },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 520,
          width: '100%',
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(25, 118, 210, 0.12)',
          backgroundColor: '#fff',
          transition: 'box-shadow 0.3s ease',
          '&:hover, &:focus-within': {
            boxShadow: '0 12px 48px rgba(25, 118, 210, 0.18)',
          },
        }}
        component="section"
        aria-labelledby="patient-registration-title"
      >
        <Typography
          id="patient-registration-title"
          variant="h5"
          component="h1"
          align="center"
          sx={{
            fontWeight: 700,
            color: '#1976D2',
            mb: 1,
            letterSpacing: 1,
            userSelect: 'none',
          }}
        >
          Patient Registration
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: '#607d8b', mb: 3 }}
        >
          Please fill in the details below to register a new patient.
        </Typography>
        <Divider sx={{ mb: 4 }} />

        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          aria-describedby="form-feedback"
        >
          <Fade in={!!error}>
            <Box>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }} role="alert" id="form-feedback">
                  {error}
                </Alert>
              )}
            </Box>
          </Fade>
          <Fade in={!!success}>
            <Box>
              {success && (
                <Alert severity="success" sx={{ mb: 3 }} role="alert" id="form-feedback">
                  {success}
                </Alert>
              )}
            </Box>
          </Fade>

          <Slide direction="right" in timeout={500} mountOnEnter unmountOnExit>
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
              inputProps={{ 'aria-required': true, min: 1 }}
              autoComplete="off"
            />
          </Slide>

          <Slide direction="left" in timeout={600} mountOnEnter unmountOnExit>
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
              inputProps={{ 'aria-required': true, maxLength: 100 }}
              autoComplete="name"
            />
          </Slide>

          <Slide direction="right" in timeout={700} mountOnEnter unmountOnExit>
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
              inputProps={{ 'aria-required': true }}
            />
          </Slide>

          <Slide direction="left" in timeout={800} mountOnEnter unmountOnExit>
            <TextField
              fullWidth
              label="Discharge Date"
              name="dischargeDate"
              type="date"
              margin="normal"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              value={formik.values.dischargeDate || ''}
              onChange={handleDischargeDateChange}
              onBlur={formik.handleBlur}
              error={formik.touched.dischargeDate && Boolean(formik.errors.dischargeDate)}
              helperText={formik.touched.dischargeDate && formik.errors.dischargeDate}
              InputProps={{ sx: { borderRadius: 2 } }}
              inputProps={{ 'aria-required': false }}
            />
          </Slide>

          <Slide direction="right" in timeout={900} mountOnEnter unmountOnExit>
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
              inputProps={{ 'aria-required': true, maxLength: 500 }}
              multiline
              minRows={3}
            />
          </Slide>

          <Slide direction="up" in timeout={1000} mountOnEnter unmountOnExit>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              disabled={loading}
              sx={{
                mt: 4,
                borderRadius: 3,
                fontWeight: 700,
                fontSize: '1.1rem',
                py: 1.5,
                letterSpacing: 0.5,
                boxShadow: '0 4px 16px rgba(25, 118, 210, 0.15)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 6px 24px rgba(25, 118, 210, 0.25)',
                  transform: 'scale(1.02)',
                },
              }}
              aria-live="polite"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
            </Button>
          </Slide>
        </Box>
      </Paper>
    </Box>
  );
}

export default PatientForm;
