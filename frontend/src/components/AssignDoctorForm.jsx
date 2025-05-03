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
      startTime: '',
      endTime: '',
    },
    validationSchema: Yup.object({
      patientId: Yup.number()
        .required('Patient ID is required')
        .positive('Must be a positive number')
        .integer('Must be an integer'),
      staffId: Yup.number()
        .required('Staff ID is required')
        .positive('Must be a positive number')
        .integer('Must be an integer'),
      startTime: Yup.date()
        .required('Start time is required')
        .min(new Date(), 'Start time must be in the future'),
      endTime: Yup.date()
        .required('End time is required')
        .min(Yup.ref('startTime'), 'End time must be after start time'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
       
        const payload = {
          patientId: Number(values.patientId),
          doctorId: Number(values.staffId),  // ✅ Correct key name
          startTime: values.startTime,
          endTime: values.endTime,
        };

        const response = await assignDoctor(payload);
        setSuccess(response.data.message || 'Doctor assigned successfully');
        setError('');
        resetForm();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to assign doctor');
        setSuccess('');
        console.error('Error assigning doctor:', err);
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

      <TextField
        fullWidth
        label="Start Time"
        name="startTime"
        type="datetime-local"
        margin="normal"
        InputLabelProps={{ shrink: true }}
        {...formik.getFieldProps('startTime')}
        error={formik.touched.startTime && Boolean(formik.errors.startTime)}
        helperText={formik.touched.startTime && formik.errors.startTime}
      />

      <TextField
        fullWidth
        label="End Time"
        name="endTime"
        type="datetime-local"
        margin="normal"
        InputLabelProps={{ shrink: true }}
        {...formik.getFieldProps('endTime')}
        error={formik.touched.endTime && Boolean(formik.errors.endTime)}
        helperText={formik.touched.endTime && formik.errors.endTime}
      />

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Assign Doctor
      </Button>
    </Box>
  );
}

export default AssignDoctorForm;