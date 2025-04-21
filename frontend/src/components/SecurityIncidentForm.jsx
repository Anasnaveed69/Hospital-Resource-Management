import React from 'react';

import { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { logSecurityIncident } from '../api';

function SecurityIncidentForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const formik = useFormik({
    initialValues: {
      incidentId: '',
      description: '',
      date: '',
    },
    validationSchema: Yup.object({
      incidentId: Yup.number().required('Required').positive().integer(),
      description: Yup.string().required('Required'),
      date: Yup.date().required('Required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await logSecurityIncident(values);
        setSuccess(response.data.message || 'Incident logged successfully');
        setError('');
        resetForm();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to log incident');
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
        label="Incident ID"
        name="incidentId"
        type="number"
        margin="normal"
        {...formik.getFieldProps('incidentId')}
        error={formik.touched.incidentId && Boolean(formik.errors.incidentId)}
        helperText={formik.touched.incidentId && formik.errors.incidentId}
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
      <TextField
        fullWidth
        label="Date"
        name="date"
        type="date"
        margin="normal"
        InputLabelProps={{ shrink: true }}
        {...formik.getFieldProps('date')}
        error={formik.touched.date && Boolean(formik.errors.date)}
        helperText={formik.touched.date && formik.errors.date}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Log Incident
      </Button>
    </Box>
  );
}

export default SecurityIncidentForm;