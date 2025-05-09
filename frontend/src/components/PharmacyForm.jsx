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
import { insertMedicine } from '../api';

function PharmacyForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const formik = useFormik({
    initialValues: {
      medication_ID: '',
      name: '',
      quantity: '',
      price: '',
      expiry_Date: '',
    },
    validationSchema: Yup.object({
      medication_ID: Yup.number()
        .typeError('Medication ID must be a number')
        .required('Medication ID is required')
        .positive('Must be positive')
        .integer('Must be an integer'),
      name: Yup.string()
        .required('Name is required')
        .trim(),
      quantity: Yup.number()
        .typeError('Quantity must be a number')
        .required('Quantity is required')
        .positive('Must be positive')
        .integer('Must be an integer'),
      price: Yup.number()
        .typeError('Price must be a number')
        .required('Price is required')
        .positive('Must be positive')
        .min(0.01, 'Price must be at least 0.01'),
      expiry_Date: Yup.date()
        .typeError('Must be a valid date')
        .required('Expiry Date is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const submissionValues = {
          medication_ID: parseInt(values.medication_ID, 10),
          name: values.name.trim(),
          quantity: parseInt(values.quantity, 10),
          price: parseFloat(values.price),
          expiry_Date: values.expiry_Date,
        };

        if (isNaN(submissionValues.medication_ID)) {
          throw new Error('Invalid Medication ID');
        }

        const response = await insertMedicine(submissionValues);
        setSuccess(response.data.message || 'Medicine inserted successfully');
        setError('');
        resetForm();
      } catch (err) {
        setError(err.response?.data?.error || err.message || 'Failed to insert medicine');
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
          Add New Medicine
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: '#607d8b', mb: 2 }}
        >
          Enter the details of the medicine to add it to the pharmacy.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box component="form" onSubmit={formik.handleSubmit}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          
          <TextField
            fullWidth
            label="Medication ID"
            name="medication_ID"
            type="number"
            margin="normal"
            value={formik.values.medication_ID}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.medication_ID && Boolean(formik.errors.medication_ID)}
            helperText={formik.touched.medication_ID && formik.errors.medication_ID}
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          
          <TextField
            fullWidth
            label="Name"
            name="name"
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          
          <TextField
            fullWidth
            label="Quantity"
            name="quantity"
            type="number"
            margin="normal"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          
          <TextField
            fullWidth
            label="Price"
            name="price"
            type="number"
            step="0.01"
            margin="normal"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2 } }}
          />
          
          <TextField
            fullWidth
            label="Expiry Date"
            name="expiry_Date"
            type="date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={formik.values.expiry_Date}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.expiry_Date && Boolean(formik.errors.expiry_Date)}
            helperText={formik.touched.expiry_Date && formik.errors.expiry_Date}
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
            Insert Medicine
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default PharmacyForm;
