import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { toast, ToastContainer } from 'react-toastify'
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
  Button,
  TextField,

} from '@mui/material';

export default function TableData({ data, handleDelete, handleEdit }) {

  const exportdata = () => {
    if (!data || data.length === 0) {
        toast.warning('No data is available to export!', {
        position: 'top-right',
        autoClose: 1000,
      })
      return
    }
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "datasheet");
    XLSX.writeFile(wb, "datasheet.xlsx");
  };
  const importdata = () => {
    const fileinput = document.querySelector('input[name="import"]')
    fileinput.click()
  }
  const importchange = (e) => {
    const file = e.target.files[0]
    if (!file) {
      alert('Please select a file to import');
      return;
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      localStorage.setItem('Data', JSON.stringify(jsonData))
      window.location.reload();
      console.log("Imported Data:", jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const [search, setsearch] = useState('')


  ///////////// pagination////////

  const [currentpage, setcurrentpage] = useState(1)
  const [dataperpage, setdataperpage] = useState(10)

  const lastindex = currentpage * dataperpage;
  const firstindex = lastindex - dataperpage
  const datashow = data.slice(firstindex, lastindex)
  const selectpagehandler = (index) => {
    setcurrentpage(index + 1)
  }
  return (
    <>
    <ToastContainer></ToastContainer>
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
          <TextField type='search' onChange={(e) => setsearch(e.target.value)} placeholder='search' sx={{ background: "white", borderRadius: 2 }} />
          <Box>

            <Button variant="contained" color="secondary" onClick={exportdata} sx={{ mr: 2 }}>
              Export Data
            </Button>
            <input type="file" accept='.xlsx, .xls .csv' style={{ display: 'none' }} name='import' onChange={importchange} />
            <Button variant='contained' color='primary' onClick={importdata}>Import Data</Button>
          </Box>
        </Box>

        <Table aria-label="user data table" sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#e3f2fd', textAlign: 'center' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>S.no</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', }}>Email</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Age</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Role</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {datashow.filter((show) => {
              return search.toLowerCase() === '' ? show :
                show.name.toLowerCase().includes(search) ||
                show.email.toLowerCase().includes(search) ||
                show.role.toLowerCase().includes(search) ||
                show.age.toLowerCase().includes(search) 

            }).map((show, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                  '&:hover': { backgroundColor: '#bbdefb', cursor: 'pointer' },
                }}
              >
                <TableCell align="right">{firstindex +index + 1}</TableCell>
                <TableCell component="th" scope="row" sx={{ fontWeight: 600 }}>
                  {show.name}
                </TableCell>
                <TableCell align="right">{show.email}</TableCell>
                <TableCell align="right">{show.age}</TableCell>
                <TableCell align="right">{show.role}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleDelete(index)}>Delete</Button>
                  <Button onClick={() => handleEdit(index)}>Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        <Box  textAlign={'center'} sx={{ mt: 2 }}>
        {[...Array(Math.ceil(data.length/dataperpage))].map((_,index)=>{
          return(
             <Button variant='outlined' color='primary' sx={{margin:'3px' , "&:hover":{backgroundColor:'primary.main',color: 'white'}}} key={index} onClick={()=> selectpagehandler(index)}>{index + 1}</Button>
          )
        })}
        </Box>
      
      {(data?.length === 0 || !data) && (
        <Typography align="center" sx={{ mt: 2 }}>
          No data available.
        </Typography>
      )}
    </>
  );
}