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
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getStaff, assignDoctor, getAppointments } from '../api';
import GenericTable from '../components/GenericTable'; // Make sure this path is correct

function AssignDoctorForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await getStaff();
        const doctorRoles = [
          'Surgeon',
          'Physician',
          'Cardiologist',
          'Pediatrician',
          'Radiologist',
          'Anesthesiologist',
          'Radiology Technician',
          'Doctor'
        ];
        const doctorList = response.data.filter(
          staff => doctorRoles.includes(staff.Role) && staff.Availability === 'Available'
        );
        setDoctors(doctorList);
      } catch (err) {
        console.error('Error fetching staff:', err);
      }
    };
    fetchStaff();
  }, []);

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
        .required('Doctor selection is required'),
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
          doctorId: Number(values.staffId),
          startTime: values.startTime,
          endTime: values.endTime,
        };
        const response = await assignDoctor(payload);
        setSuccess(response.data.message || 'Doctor assigned successfully');
        setError('');
        resetForm();
        setRefreshKey(prev => prev + 1); // Refresh appointments table
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to assign doctor');
        setSuccess('');
        console.error('Error assigning doctor:', err);
      }
    },
  });

  // Appointments table columns
  const appointmentColumns = [
    { key: 'Appointments_ID', label: 'Appointment ID' },
    { key: 'Patient_ID', label: 'Patient ID' },
    { key: 'Staff_ID', label: 'Staff ID' },
    { key: 'start_Time', label: 'Start Time', format: (v) => new Date(v).toLocaleString() },
    { key: 'End_Time', label: 'End Time', format: (v) => new Date(v).toLocaleString() },
  ];

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
         Appointment Booking
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: '#607d8b', mb: 2 }}
        >
          Select an available doctor and assign them to a patient.
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box component="form" onSubmit={formik.handleSubmit}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <TextField
            fullWidth
            label="Patient ID"
            name="patientId"
            type="number"
            margin="normal"
            variant="outlined"
            {...formik.getFieldProps('patientId')}
            error={formik.touched.patientId && Boolean(formik.errors.patientId)}
            helperText={formik.touched.patientId && formik.errors.patientId}
            InputProps={{ sx: { borderRadius: 2 } }}
          />

          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            error={formik.touched.staffId && Boolean(formik.errors.staffId)}
            sx={{ borderRadius: 2 }}
          >
            <InputLabel>Doctor</InputLabel>
            <Select
              name="staffId"
              value={formik.values.staffId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Doctor"
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="">Select Doctor</MenuItem>
              {doctors.map((doc) => (
                <MenuItem key={doc.Staff_Id} value={doc.Staff_Id}>
                  Dr. {doc.Name} ({doc.Role})
                </MenuItem>
              ))}
            </Select>
            {formik.touched.staffId && formik.errors.staffId && (
              <Typography color="error" variant="caption" sx={{ ml: 2, mt: 0.5 }}>
                {formik.errors.staffId}
              </Typography>
            )}
          </FormControl>

          <TextField
            fullWidth
            label="Start Time"
            name="startTime"
            type="datetime-local"
            margin="normal"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            {...formik.getFieldProps('startTime')}
            error={formik.touched.startTime && Boolean(formik.errors.startTime)}
            helperText={formik.touched.startTime && formik.errors.startTime}
            InputProps={{ sx: { borderRadius: 2 } }}
          />

          <TextField
            fullWidth
            label="End Time"
            name="endTime"
            type="datetime-local"
            margin="normal"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            {...formik.getFieldProps('endTime')}
            error={formik.touched.endTime && Boolean(formik.errors.endTime)}
            helperText={formik.touched.endTime && formik.errors.endTime}
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
            Assign Doctor
          </Button>
        </Box>
      </Paper>

      {/* Appointments Table */}
      <Paper
        elevation={4}
        sx={{
          maxWidth: 900,
          mx: 'auto',
          mt: 6,
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          boxShadow: '0 4px 24px rgba(25, 118, 210, 0.08)',
          background: '#fff',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: '#1976D2',
            mb: 2,
            letterSpacing: 0.5,
          }}
        >
        </Typography>
        <GenericTable
          fetchData={getAppointments}
          columns={appointmentColumns}
          title="Appointments List"
          refreshKey={refreshKey}
          sx={{
            '& .MuiTableCell-root': { color: '#263238' },
            '& .MuiTableHead-root': { backgroundColor: '#e3f2fd' },
          }}
        />
      </Paper>
    </Box>
  );
}

export default AssignDoctorForm;
