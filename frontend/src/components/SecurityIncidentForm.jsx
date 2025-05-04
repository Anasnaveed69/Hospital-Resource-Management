import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Alert, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { logSecurityIncident, getStaff } from '../api';

function SecurityIncidentForm({ onIncidentLogged }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [staff, setStaff] = useState([]);

  // Predefined incident types based on sample data
  const incidentTypes = [
    'Theft',
    'Unauthorized Access',
    'Violence',
    'Fire Alarm',
    'Lost Item',
    'Harassment',
    'Vandalism',
    'Emergency',
  ];

  // Fetch staff for handleBy dropdown
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await getStaff();
        console.log('Fetched staff for form:', response.data);
        setStaff(response.data);
        setError('');
      } catch (err) {
        setError('Failed to load staff list');
        console.error('Error fetching staff:', err);
      }
    };
    fetchStaff();
  }, []);

  const formik = useFormik({
    initialValues: {
      incidentType: '',
      description: '',
      handleBy: '',
    },
    validationSchema: Yup.object({
      incidentType: Yup.string().required('Incident type is required'),
      description: Yup.string().required('Description is required'),
      handleBy: Yup.number().required('Handled by is required').positive().integer(),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const payload = {
          incidentType: values.incidentType,
          description: values.description,
          handleBy: Number(values.handleBy),
        };
        console.log('Log security incident payload:', payload);
        const response = await logSecurityIncident(payload);
        setSuccess(response.data.message || 'Security incident logged');
        setError('');
        resetForm();
        if (onIncidentLogged) onIncidentLogged();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to log security incident');
        setSuccess('');
        console.error('Error logging incident:', err);
      }
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <FormControl

        fullWidth
        
        margin="normal"

        error={formik.touched.incidentType && Boolean(formik.errors.incidentType)}
      >
        <InputLabel id="incidentType-label">Incident Type</InputLabel>
        <Select
          labelId="incidentType-label"
          id="incidentType"
          name="incidentType"
          value={formik.values.incidentType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Incident Type"
        >
          <MenuItem value="">
            <em>Select Incident Type</em>
          </MenuItem>
          {incidentTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{formik.touched.incidentType && formik.errors.incidentType}</FormHelperText>
      </FormControl>
      <TextField
        fullWidth
        label="Description"
        name="description"
        margin="normal"
        multiline
        rows={4}
        {...formik.getFieldProps('description')}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
      <FormControl

        fullWidth

        margin="normal"
        error={formik.touched.handleBy && Boolean(formik.errors.handleBy)}
      >
        <InputLabel id="handleBy-label">Handled By</InputLabel>
        <Select
          labelId="handleBy-label"
          id="handleBy"
          name="handleBy"
          value={formik.values.handleBy}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Handled By"
        >
          <MenuItem value="">
            <em>Select Staff</em>
          </MenuItem>
          {staff.map((s) => (
            <MenuItem key={s.Staff_Id} value={s.Staff_Id}>
              {`${s.Name}${s.Role ? ` (${s.Role})` : ''} (ID: ${s.Staff_Id})`}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{formik.touched.handleBy && formik.errors.handleBy}</FormHelperText>
      </FormControl>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Log Incident
      </Button>
    </Box>
  );
}

export default SecurityIncidentForm;