import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Alert,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getStaff, assignDoctor } from '../api';

function AssignDoctorForm() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [doctors, setDoctors] = useState([]);

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
          'Radiology Technician'
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
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to assign doctor');
        setSuccess('');
        console.error('Error assigning doctor:', err);
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

      <FormControl fullWidth margin="normal" error={formik.touched.staffId && Boolean(formik.errors.staffId)}>
        <InputLabel>Doctor</InputLabel>
        <Select
          name="staffId"
          value={formik.values.staffId}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Doctor"
        >
          <MenuItem value="">Select Doctor</MenuItem>
          {doctors.map((doc) => (
            <MenuItem key={doc.Staff_Id} value={doc.Staff_Id}>
             Doctor {doc.Name} ({doc.Role})    
            </MenuItem>
          ))}
        </Select>
        {formik.touched.staffId && formik.errors.staffId && (
          <div style={{ color: 'red', fontSize: '0.8em' }}>{formik.errors.staffId}</div>
        )}
      </FormControl>

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
        Assign Doctor
      </Button>
    </Box>
  );
}

export default AssignDoctorForm;
