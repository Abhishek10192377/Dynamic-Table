import React, { useEffect, useState } from 'react'
import { Box, Container, Typography, Paper, TextField, Button, MenuItem } from '@mui/material'
import  Tabledata from "../Components/Tabledata"
export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    role: ''
  })
   const [formarry, setformarry] = useState([])
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const localdata = [...formarry,formData]
     setformarry(localdata)
    localStorage.setItem('Data', JSON.stringify(localdata))
    setFormData({ name: '', email: '', age: '', role: '' }) 
  }

   const handleDelete = (index) => {
    const filteremail = formarry.filter((item,idx)=>idx !== index)
    localStorage.setItem('Data', JSON.stringify(filteremail))
    setformarry(filteremail)
  };
  
  const handleEdit = (index) => {
    const editdata = formarry[index]
    setFormData(editdata)
    const updatedata = formarry.filter((item,idx)=>idx !==index)
    localStorage.setItem('Data', JSON.stringify(updatedata))
    setformarry(updatedata)
  }
  useEffect(()=>{
    const savedata = JSON.parse(localStorage.getItem("Data")) ||[]
    setformarry(savedata)
  },[])
  return (
    <>
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 8, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.1)', border: '3px solid' }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }} align="center" gutterBottom>
          Form
        </Typography>

        <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="Full Name" name="name" placeholder="Enter your full name" required onChange={handleChange} value={formData.name} />
          <TextField fullWidth margin="normal" label="Email Address" name="email" type="email" placeholder="Enter your email" required onChange={handleChange} value={formData.email} />
          <TextField fullWidth margin="normal" label="Age" name="age" type="number" placeholder="Enter Your Age" required onChange={handleChange} value={formData.age} />
          <TextField fullWidth margin="normal" label="Role" select required name="role" onChange={handleChange} value={formData.role}>
            <MenuItem value="">Select Role</MenuItem>
            <MenuItem value="Engineer">Engineer</MenuItem>
            <MenuItem value="Doctor">Doctor</MenuItem>
            <MenuItem value="Teacher">Teacher</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 3, py: 1.5, fontWeight: 'bold', fontSize: '1rem', borderRadius: 2 }}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
    <Tabledata data= {formarry} handleDelete={handleDelete} handleEdit={handleEdit}/>
    </>
  )
}
