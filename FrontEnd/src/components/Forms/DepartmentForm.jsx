import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import {useState } from  "react";


export default function DepartmentForm(props) {
  const {changeTabTo} = props;
  

const[department,setDepartment]=useState({

   deptName:"",
   description:"",


});
const {deptName,description} = department;

 const onInputChange = (e) => {
    setDepartment({...department,[e.target.name]:e.target.value});
};
  const onSubmit = async(e)=>{
  
    e.preventDefault();
    await axios.post("http://localhost:8080/api/v1/departments",department)
    changeTabTo("1")
  }
  return (

    <form onSubmit={(e)=>onSubmit(e)}>
    <Box
      sx={{
     
        alignItems: 'center',
        '& > :not(style)': { m: 1 , width: '70ch'},
      }}
    >
      <TextField
        helperText="Please enter Department name"
        id="demo-helper-text-aligned"
        label="Department Name"
        name ="deptName"
        value={deptName}
        onChange={(e)=>onInputChange(e)}
        required
      />
      <TextField
        helperText="Please enter Department Description "
        id="demo-helper-text-aligned-no-helper"
        label="Description"
        name ="description"
        value={description}
        onChange={(e)=>onInputChange(e)}
        required
      />

<div>
  
  <Button variant="contained" size="medium" type='submit'>
    Add Department
  </Button>

</div>
    </Box>

    </form>
    
    
  );
}
