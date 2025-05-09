import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Alert,
  MenuItem,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addAlertReport } from '../api';

function AddAlertReportForm({ onAlertAdded }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const formik = useFormik({
    initialValues: {
      type: '',
      description: '',
      timestamp: '',
    },
    validationSchema: Yup.object({
      type: Yup.string()
        .required('Type is required')
        .max(255, 'Type must be 255 characters or less'),
      description: Yup.string().required('Description is required'),
      timestamp: Yup.date()
        .nullable()
        .transform((value, originalValue) => (originalValue === '' ? null : value))
        .typeError('Invalid date format'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          type: values.type,
          description: values.description,
          timestamp: values.timestamp || undefined,
        };
        const response = await addAlertReport(payload);
        setSuccess(response.data.message || 'Alert report added successfully');
        setError('');
        resetForm();
        if (onAlertAdded) onAlertAdded();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to add alert report');
        setSuccess('');
      }
    },
  });

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
          Add Alert Report
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: '#607d8b', mb: 2 }}
        >
          Report a new alert for security, medical, maintenance, or administrative issues.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box component="form" onSubmit={formik.handleSubmit}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <TextField
            fullWidth
            select
            label="Type"
            name="type"
            margin="normal"
            {...formik.getFieldProps('type')}
            error={formik.touched.type && Boolean(formik.errors.type)}
            helperText={formik.touched.type && formik.errors.type}
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2 } }}
          >
            <MenuItem value="Security">Security</MenuItem>
            <MenuItem value="Medical">Medical</MenuItem>
            <MenuItem value="Maintenance">Maintenance</MenuItem>
            <MenuItem value="Administrative">Administrative</MenuItem>
          </TextField>

          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={4}
            margin="normal"
            {...formik.getFieldProps('description')}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2 } }}
          />

          <TextField
            fullWidth
            label="Timestamp"
            name="timestamp"
            type="datetime-local"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            {...formik.getFieldProps('timestamp')}
            error={formik.touched.timestamp && Boolean(formik.errors.timestamp)}
            helperText={formik.touched.timestamp && formik.errors.timestamp}
            variant="outlined"
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
            Add Alert Report
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default AddAlertReportForm;
