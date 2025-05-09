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
import { addEquipment } from '../api';

function AddEquipmentForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const formik = useFormik({
    initialValues: {
      equipmentId: '',
      name: '',
      location: '',
      availability: '',
    },
    validationSchema: Yup.object({
      equipmentId: Yup.number()
        .required('Equipment ID is required')
        .positive('Equipment ID must be positive')
        .integer('Equipment ID must be an integer'),
      name: Yup.string()
        .required('Name is required')
        .max(255, 'Name must be 255 characters or less'),
      location: Yup.string()
        .required('Location is required')
        .max(255, 'Location must be 255 characters or less'),
      availability: Yup.string()
        .required('Availability is required')
        .oneOf(['Available', 'In Use', 'Under Maintenance'], 'Invalid availability status'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          equipmentId: Number(values.equipmentId),
          name: values.name,
          location: values.location,
          availability: values.availability,
        };
        const response = await addEquipment(payload);
        setSuccess(response.data.message || `Equipment ${values.name} added successfully`);
        setError('');
        resetForm();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to add equipment');
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
          Add Equipment
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: '#607d8b', mb: 2 }}
        >
          Enter details to add new equipment to the hospital inventory.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box component="form" onSubmit={formik.handleSubmit}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <TextField
            fullWidth
            label="Equipment ID"
            name="equipmentId"
            type="number"
            margin="normal"
            {...formik.getFieldProps('equipmentId')}
            error={formik.touched.equipmentId && Boolean(formik.errors.equipmentId)}
            helperText={formik.touched.equipmentId && formik.errors.equipmentId}
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
            label="Location"
            name="location"
            margin="normal"
            {...formik.getFieldProps('location')}
            error={formik.touched.location && Boolean(formik.errors.location)}
            helperText={formik.touched.location && formik.errors.location}
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
            <MenuItem value="In Use">In Use</MenuItem>
            <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
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
            Add Equipment
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default AddEquipmentForm;
