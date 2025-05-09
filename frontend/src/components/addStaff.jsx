import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Alert,
  Typography,
  Paper,
  Divider,
  MenuItem,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { addStaffWithSalary } from '../api';

function AddStaffWithSalaryForm({ onStaffAdded }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const formik = useFormik({
    initialValues: {
      staffId: '',
      name: '',
      role: '',
      availability: 'Available',
     
    },
    validationSchema: Yup.object({
      staffId: Yup.number()
        .required('Staff ID is required')
        .positive('Staff ID must be positive')
        .integer('Staff ID must be an integer'),
      name: Yup.string()
        .required('Name is required')
        .max(255, 'Name must be 255 characters or less'),
      role: Yup.string()
        .required('Role is required')
        .max(255, 'Role must be 255 characters or less'),
      availability: Yup.string()
        .oneOf(['Available', 'On Leave', 'On Duty', 'Terminated'], 'Invalid availability status'),

    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          staffId: Number(values.staffId),
          name: values.name,
          role: values.role,
          availability: values.availability,
          
        };
        const response = await addStaffWithSalary(payload);
        setSuccess(response.data.message || `Staff ${values.name} added successfully`);
        setError('');
        resetForm();
        if (onStaffAdded) onStaffAdded();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to add staff');
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
          Add Staff
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: '#607d8b', mb: 2 }}
        >
          Enter staff details and salary information below.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box component="form" onSubmit={formik.handleSubmit}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <TextField
            fullWidth
            label="Staff ID"
            name="staffId"
            type="number"
            margin="normal"
            {...formik.getFieldProps('staffId')}
            error={formik.touched.staffId && Boolean(formik.errors.staffId)}
            helperText={formik.touched.staffId && formik.errors.staffId}
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            {...formik.getFieldProps('name')}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <TextField
            fullWidth
            label="Role"
            name="role"
            margin="normal"
            {...formik.getFieldProps('role')}
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          <TextField
            fullWidth
            select
            label="Availability"
            name="availability"
            margin="normal"
            {...formik.getFieldProps('availability')}
            error={formik.touched.availability && Boolean(formik.errors.availability)}
            helperText={formik.touched.availability && formik.errors.availability}
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2 } }}
          >
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="On Leave">On Leave</MenuItem>
            <MenuItem value="On Duty">On Duty</MenuItem>
            <MenuItem value="Terminated">Terminated</MenuItem>
          </TextField>
         
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
            Add Staff
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default AddStaffWithSalaryForm;
