import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  CircularProgress,
  Typography,
  Box
} from '@mui/material';

function GenericTable({ fetchData, columns, title }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const response = await fetchData();
      setData(response.data);
      setError('');
    } catch (err) {
      setError(`❌ Failed to fetch ${title.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [fetchData]);

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        {title}
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : data.length === 0 ? (
        <Alert severity="info">No {title.toLowerCase()} data available.</Alert>
      ) : (
        <TableContainer
          component={Paper}
          elevation={3}
          sx={{
            maxHeight: 500,
            borderRadius: 2,
          }}
        >
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                {columns.map((col) => (
                  <TableCell
                    key={col.key}
                    sx={{
                      fontWeight: 600,
                      backgroundColor: '#e3f2fd',
                      color: '#1565c0',
                      position: 'sticky',
                      top: 0,
                      zIndex: 1,
                    }}
                  >
                    {col.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((item, index) => (
                <TableRow
                  key={index}
                  hover
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      backgroundColor: '#e3f2fd',
                    },
                  }}
                >
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
      )}
    </Box>
  );
}

export default GenericTable;