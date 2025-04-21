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
    { key: 'Expiry_Date', label: 'Expiry Date', format: (value) => new Date(value).toLocaleDateString() },
  ];

  return (
    <div>
      <Typography variant="h5" sx={{ mb: 2 }}>Pharmacy Inventory</Typography>
      <PharmacyForm />
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Medicines</Typography>
      <GenericTable fetchData={getPharmacy} columns={columns} title="Pharmacy" />
    </div>
  );
}

export default Pharmacy;