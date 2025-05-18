import React, { useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import BillForm from '../components/BillForm';
import { getBills } from '../api';

function Bills() {
  const tableRef = useRef();

  const columns = [
    { 
      key: 'Bill_Id', 
      label: 'Bill ID',
      format: (value) => value.toString()
    },
    { 
      key: 'Patient_Id', 
      label: 'Patient ID',
      format: (value) => value.toString()
    },
    { 
      key: 'Total_Amount', 
      label: 'Total Amount',
      format: (value) => value.toFixed(2)
    },
    { 
      key: 'Paid_Amount', 
      label: 'Paid Amount',
      format: (value) => value.toFixed(2)
    },
    { 
      key: 'Due_Amount', 
      label: 'Due Amount',
      format: (value) => value.toFixed(2)
    },
    { 
      key: 'Payment_Status', 
      label: 'Payment Status'
    },
    { 
      key: 'BillingDate', 
      label: 'Billing Date',
      format: (value) => new Date(value).toLocaleDateString()
    }
  ];

  const handleBillChange = () => {
    if (tableRef.current?.refreshData) {
      tableRef.current.refreshData();
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: 'blue' }}>Managing Billing</Typography>
        
        <BillForm onBillChange={handleBillChange} />
        
        <Box sx={{ mt: 5 }}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: 'blue' }}>Billing List</Typography>
          <GenericTable 
            ref={tableRef}
            fetchData={getBills} 
            columns={columns}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default Bills;
