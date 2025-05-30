# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



import React, { useRef } from 'react';
import * as XLSX from 'xlsx';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button
} from '@mui/material';

export default function TableData({ data, setData }) {
  const fileInputRef = useRef();

  // Export data to Excel
  const exportdata = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "datasheet");
    XLSX.writeFile(wb, "datasheet.xlsx");
  };

  // Trigger hidden file input
  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  // Import Excel file and convert to JSON
  const importdata = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 1000,
          margin: '40px auto',
          boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            p: 2,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            User Data Table
          </Typography>
          <Box>
            <Button variant="contained" color="secondary" onClick={exportdata} sx={{ mr: 2 }}>
              Export Data
            </Button>
            <input
              type="file"
              accept=".xlsx,.xls"
              ref={fileInputRef}
              onChange={importdata}
              style={{ display: 'none' }}
            />
            <Button variant="contained" color="secondary" onClick={handleImportClick}>
              Import Data
            </Button>
          </Box>
        </Box>

        <Table aria-label="user data table" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Age</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(data || []).map((show, idx) => (
              <TableRow
                key={idx}
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                  '&:hover': { backgroundColor: '#bbdefb', cursor: 'pointer' },
                }}
              >
                <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                  {show.name}
                </TableCell>
                <TableCell align="right">{show.email}</TableCell>
                <TableCell align="right">{show.age}</TableCell>
                <TableCell align="right">{show.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {(data?.length === 0 || !data) && (
        <Typography align="center" sx={{ mt: 2 }}>
          No data available.
        </Typography>
      )}
    </>
  );
}


import React from 'react';
import * as XLSX from 'xlsx';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button
} from '@mui/material';

export default function TableData({ data }) {
  const exportdata = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data || []);
    XLSX.utils.book_append_sheet(wb, ws, "datasheet");
    XLSX.writeFile(wb, "datasheet.xlsx");
  };

  const rows = data || [];

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 1000,
          margin: '40px auto',
          boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            p: 2,
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            User Data Table
          </Typography>
          <Button variant="contained" color="secondary" onClick={exportdata}>
            Export Data
          </Button>
        </Box>

        <Table aria-label="user data table" sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Age</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Role</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.length > 0 ? (
              rows.map((show, idx) => (
                <TableRow
                  key={idx}
                  sx={{
                    '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                    '&:hover': { backgroundColor: '#bbdefb', cursor: 'pointer' },
                  }}
                >
                  <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                    {show.name}
                  </TableCell>
                  <TableCell align="right">{show.email}</TableCell>
                  <TableCell align="right">{show.age}</TableCell>
                  <TableCell align="right">{show.role}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ fontStyle: 'italic' }}>
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
