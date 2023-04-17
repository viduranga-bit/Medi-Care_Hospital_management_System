import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function AddPatientForm() {
  return (
    <Box
      sx={{
     
        alignItems: 'center',
        '& > :not(style)': { m: 1 , width: '70ch'},
      }}
    >
      <TextField
        helperText="Please enter Department name"
        id="demo-helper-text-aligned"
        label="Name"
      />
      <TextField
        helperText="Please enter Department Description "
        id="demo-helper-text-aligned-no-helper"
        label="Email"
      />

<div>
  
  <Button variant="contained" size="medium">
    Add Department
  </Button>

</div>
    </Box>

    
    
    
  );
}
