import React from 'react';

import { Typography } from '@mui/material';
import GenericTable from '../components/GenericTable';
import PharmacyForm from '../components/PharmacyForm';
import { getPharmacy } from '../api';

function Pharmacy() {
  const columns = [
    { key: 'Medication_ID', label: 'Medicine ID' },
    { key: 'Name', label: 'Name' },
    {key: 'Price', label: 'Price' },
    { key: 'Quantity', label: 'Quantity' },
    { key: 'Expiry_Date', label: 'Updation Date', format: (value) => new Date(value).toLocaleDateString() },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2,fontWeight: 'bold' }}>Pharmacy Inventory</Typography>
      <PharmacyForm />

      <GenericTable fetchData={getPharmacy} columns={columns} title="Medicines" />
    </div>
  );
}

export default Pharmacy;