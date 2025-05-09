import { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { processSalaries } from '../api';

function ProcessSalariesForm({ onSalariesProcessed }) {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const formik = useFormik({
        initialValues: {
            salaryId: '',
        },
        validationSchema: Yup.object({
            salaryId: Yup.number()
                .required('Salary ID is required')
                .positive('Salary ID must be positive')
                .integer('Salary ID must be an integer'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const payload = {
                    salaryId: Number(values.salaryId),
                };
                console.log('Process salaries payload:', payload);
                const response = await processSalaries(payload);
                setSuccess(response.data.message || `Salary processed for SalaryID ${values.salaryId}`);
                setError('');
                resetForm();
                if (onSalariesProcessed) onSalariesProcessed();
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to process salary');
                setSuccess('');
                console.error('Error processing salary:', err);
            }
        },
    });

    return (
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
            <TextField
                fullWidth
                label="Salary ID"
                name="salaryId"
                type="number"
                margin="normal"
                {...formik.getFieldProps('salaryId')}
                error={formik.touched.salaryId && Boolean(formik.errors.salaryId)}
                helperText={formik.touched.salaryId && formik.errors.salaryId}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Process Salary
            </Button>
        </Box>
    );
}

export default ProcessSalariesForm;