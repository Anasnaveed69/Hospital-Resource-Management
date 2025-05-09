import React, { useState } from 'react';
import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import ProcessSalariesForm from '../components/ProcessSalariesForm';
import { getStaffSalaries } from '../api';

function StaffSalaries() {
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSalariesProcessed = () => {
        setRefreshKey((prev) => prev + 1);
    };

    const columns = [
        { key: 'SalaryID', label: 'Salary ID' },
        { key: 'StaffID', label: 'Staff ID' },
        { key: 'RoleID', label: 'Role ID' },
        { key: 'GrossSalary', label: 'Gross Salary' },
        { key: 'Allowances', label: 'Allowances' },
        { key: 'Deductions', label: 'Deductions' },
        { key: 'NetSalary', label: 'Net Salary' },
        {
            key: 'PaymentDate',
            label: 'Payment Date',
            format: (value) => new Date(value).toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric',
            }),
        },
        { key: 'PaymentStatus', label: 'Payment Status' },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h5" sx={{ mb: 2 ,fontWeight: 'bold'}}>Process Salaries</Typography>
            <ProcessSalariesForm onSalariesProcessed={handleSalariesProcessed} />
        
            <GenericTable
                fetchData={getStaffSalaries}
                columns={columns}
                title="Staff Salaries"
                refreshKey={refreshKey}
            />
        </div>
    );
}

export default StaffSalaries;