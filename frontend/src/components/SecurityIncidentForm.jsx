import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Alert,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { logSecurityIncident, getStaff } from '../api';

function SecurityIncidentForm({ onIncidentLogged }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [staff, setStaff] = useState([]);

  // Predefined incident types
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

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await getStaff();
        setStaff(response.data);
        setError('');
      } catch (err) {
        setError('Failed to load staff list');
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
        const response = await logSecurityIncident(payload);
        setSuccess(response.data.message || 'Security incident logged');
        setError('');
        resetForm();
        if (onIncidentLogged) onIncidentLogged();
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to log security incident');
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
          Log Security Incident
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: '#607d8b', mb: 2 }}
        >
          Report a security incident and assign it to a staff member.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box component="form" onSubmit={formik.handleSubmit}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <FormControl
            fullWidth
            margin="normal"
            error={formik.touched.incidentType && Boolean(formik.errors.incidentType)}
            variant="outlined"
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
              sx={{ borderRadius: 2 }}
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
            <FormHelperText>
              {formik.touched.incidentType && formik.errors.incidentType}
            </FormHelperText>
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
            variant="outlined"
            InputProps={{ sx: { borderRadius: 2 } }}
          />

          <FormControl
            fullWidth
            margin="normal"
            error={formik.touched.handleBy && Boolean(formik.errors.handleBy)}
            variant="outlined"
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
              sx={{ borderRadius: 2 }}
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
            <FormHelperText>
              {formik.touched.handleBy && formik.errors.handleBy}
            </FormHelperText>
          </FormControl>

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
            Log Incident
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default SecurityIncidentForm;
