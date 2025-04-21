import React from 'react';
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Alert } from '@mui/material';

function GenericTable({ fetchData, columns, title }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await fetchData();
        setData(response.data);
        setError('');
      } catch (err) {
        setError(`Failed to fetch ${title.toLowerCase()}`);
      }
    };
    fetch();
  }, [fetchData, title]);

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.key}>{col.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {col.format ? col.format(item[col.key]) : item[col.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default GenericTable;