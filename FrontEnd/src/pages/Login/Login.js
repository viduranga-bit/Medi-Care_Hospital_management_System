import React, { useState } from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer} from "react-toastify";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://amithviduranga.me/">
        Amith Viduranga
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate();
  const [userId,setUserId]= useState([])




  const setUserDetails = async (username) => {
    
    const result = await axios
      .get(`http://localhost:8080/api/v1/users/${username}`)
      .then((res) => {
       console.log(res.data);
        const user ={
          role:res.data.role,
          name:res.data.name,
          email:res.data.email,
          userId:res.data.id
        }
        setUserId(res.data.id);
        localStorage.setItem("user", JSON.stringify(user));
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const reqest = {
      username: data.get("username"),
      password: data.get("password"),
    };

    const result = await axios
      .post("http://localhost:8080/authenticate", reqest)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        
        navigate("/", {
          state: {
            message:
              `Hi ${reqest.username} Welcome back,You have successfully logged in!`,
          },
        });
        setUserDetails(reqest.username);
        
     
      })
      .catch((err) => {
        console.log(err);
      });


    
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://img.freepik.com/premium-photo/medicine-doctor-team-meeting-analysis_34200-351.jpg?w=996)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Welcome
            </Typography>
            <Typography component="h1" variant="h6">
              Medicare Hospital Management System
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="User Name"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
             
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Grid container>
               
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer/>
    </ThemeProvider>
  );
}

const userRole = [
  { label: "Admin" },
  { label: "Doctor" },
  { label: "Patient" },
  { label: "Nurse" },
  { label: "Labrorarist" },
  { label: "Accountant" },
  { label: "Pharmacist" },
];
