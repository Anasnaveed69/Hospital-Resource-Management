import React from 'react';

import { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { scheduleAppointment } from '../api';

function AppointmentForm() {
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
      patientId: Yup.number().required('Required').positive().integer(),
      staffId: Yup.number().required('Required').positive().integer(),
      startTime: Yup.date().required('Required'),
      endTime: Yup.date().required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await scheduleAppointment(values);
        setSuccess(response.data.message || 'Appointment scheduled successfully');
        setError('');
        resetForm();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to schedule appointment');
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
        Schedule
      </Button>
    </Box>
  );
}

export default AppointmentForm;