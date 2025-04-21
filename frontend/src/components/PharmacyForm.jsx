import React, { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { insertMedicine } from '../api';

function PharmacyForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const formik = useFormik({
    initialValues: {
      medication_ID: '',  // make sure this matches the form field name
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
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
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
      />
      
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Insert Medicine
      </Button>
    </Box>
  );
}

export default PharmacyForm;
