import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import IconButton from "@mui/material/IconButton";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function NurseForm(props) {
  const { changeTabTo } = props;

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [nurse, setNurse] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    username: "",
    roleId: "3",
    role: "NURSE",
  });
  const { name, phone, email, address, password, username } = nurse;
  console.log("amith")
  const onInputChange = (e) => {
    setNurse({ ...nurse, [e.target.name]: e.target.value });
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/register", nurse);
    changeTabTo("1");
  };
 
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <Box
       
        sx={{
          alignItems: 'center',
          "& .MuiTextField-root": { m: 1 },
        }}
        
      >
        <div>
          <TextField
           
            sx={{ m: 1, width: "40ch" }}
            id="outlined-disabled"
            name="name"
            value={name}
            onChange={(e) => onInputChange(e)}
            label="Name"
            defaultValue=""
            required

          />

          
          <TextField
            required
            sx={{ m: 1, width: "40ch" }}
            type="phone"
            id="outlined-disabled"
            name="phone"
            value={phone}
            onChange={(e) => onInputChange(e)}
            label="phone"
            defaultValue=""
          />
          <TextField
            required
            sx={{ m: 1, width: "40ch" }}
            type="email"
            id="outlined-disabled"
            name="email"
            value={email}
            onChange={(e) => onInputChange(e)}
            label="Email"
            defaultValue=""
          />
          <TextField
            sx={{ m: 1, width: "40ch" }}
            required
            id="outlined-disabled"
            name="address"
            value={address}
            onChange={(e) => onInputChange(e)}
            label="Living Address"
            defaultValue=""
          />
          <TextField
            required
            sx={{ m: 1, width: "40ch" }}
            id="outlined-disabled"
            label="User Name"
            name="username"
            value={username}
            onChange={(e) => onInputChange(e)}
            defaultValue=""
          />

<TextField
  required
  label="Password"
  name="password"
  value={password}
  onChange={(e) => onInputChange(e)}
  id="outlined-disabled"
  sx={{ m: 1, width: "40ch" }}
  type={showPassword ? "text" : "password"}
  InputProps={{
   endAdornment: (
    
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    )
  }}
 />
        </div>

        <TextField
          name="role"
          value="NURSE"
          onChange={(e) => onInputChange(e)}
          disabled
          id="outlined-read-only-input"
          label="User Mode"
          defaultValue="NURSE"
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>
      <Button
        sx={{ m: 1, width: "42ch" }}
        variant="contained"
        size="medium"
        type="submit"
      >
        Register Nurse
      </Button>
    </form>
  );
}
