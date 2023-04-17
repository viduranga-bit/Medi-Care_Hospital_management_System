import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import "dayjs/locale/de";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "react-toastify/dist/ReactToastify.css";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

export default function RegisterPatient() {

  const [resID, setresID] = useState();

  useEffect(() => {
    if ("user" in localStorage) {
      setresID(JSON.parse(localStorage.getItem("user")));
    }
  }, []); 

 
  const recepID = resID?.userId;
  console.log(recepID);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/users/role/DOCTOR")
      .then((response) => {
        setDoctors(response.data);
        console.log(response.data);
      });
  }, []);
  let navigate = useNavigate();
  const [patient, setPatient] = useState({
    patientName: "",
    mobileNo: "",
    dob: "",
    email: "",
    address: "",
    specialNote: "",
    city: "",
    admitdate: "",
    nic: "",
    bloodGroup: "",
    patientType: "",
    gender: "",
    doc_id: "",
    age: "",
    res_id: "",
  });
  const {
    patientName,
    mobileNo,
    email,
    address,
    dob,
    city,
    admitdate,
    nic,
    bloodGroup,
    patientType,
    specialNote,
    gender,
    doc_id,
    age,
    
  } = patient;

  const onInputChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault(); 
    const patientData = { ...patient, res_id: resID?.userId };
    await axios
      .post("http://localhost:8080/api/v1/patients", patientData)
      .then((r) => {
        if (r.status === 200) {
          navigate(`/printPatientDetails?id=${r.data.patientId}`);
          toast.success("Successfully Registered Patient!", {
            position: "top-right",
          });
        }
      });
  };

  

  return (
    <form className="m-3 md:m-1 p-2 md:p-10 " onSubmit={(e) => onSubmit(e)}>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1.5 },
        }}
      >
        <div>
          <Typography variant="h6" gutterBottom>
            Personal Details
          </Typography>
          <TextField
            sx={{ m: 2, width: "55ch", height: "10px" }}
            id="outlined-disabled"
            name="patientName"
            value={patientName}
            onChange={(e) => onInputChange(e)}
            label="Patient Name"
            defaultValue=""
            required
          />

          <TextField
            label="Date Of Birth"
            required
            sx={{ m: 1, width: "55ch" }}
            type="date"
            id="outlined-uncontrolled"
            name="dob"
            value={dob}
            onChange={(e) => onInputChange(e)}
            focused
          />

          <TextField
            sx={{ m: 1, width: "55ch" }}
            required
            id="outlined-disabled"
            name="nic"
            value={nic}
            onChange={(e) => onInputChange(e)}
            label="NIC"
            defaultValue=""
          />
          <TextField
            sx={{ m: 2, width: "55ch", height: "10px" }}
            id="outlined-disabled"
            name="age"
            value={age}
            onChange={(e) => onInputChange(e)}
            label="Age"
            defaultValue=""
            required
          />
          <FormControl sx={{ m: 1, width: "55ch" }}>
            <InputLabel>Gender</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="gender"
              value={gender}
              label="Gender"
              onChange={(e) => onInputChange(e)}
              required
            >
              <MenuItem value={"MALE"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="h6" gutterBottom>
            Admission Details
          </Typography>

          <FormControl sx={{ m: 1, width: "55ch" }}>
            <InputLabel>Patient Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="patientType"
              value={patientType}
              label="Patient Type"
              onChange={(e) => onInputChange(e)}
            >
              <MenuItem value={"INPATIENT"}>In Patient</MenuItem>
              <MenuItem value={"OUTPATIENT"}>Out Patient</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, width: "55ch" }}>
            <InputLabel>Assign Doctor</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="doc_id"
              value={doc_id}
              label="doc_id"
              onChange={(e) => onInputChange(e)}
              required
            >
              {doctors.map((doctor) => (
                <MenuItem key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Admission Date"
            required
            sx={{ m: 1, width: "55ch" }}
            type="date"
            id="outlined-uncontrolled"
            name="admitdate"
            value={admitdate}
            onChange={(e) => onInputChange(e)}
            focused
          />

          <FormControl sx={{ m: 1, width: "55ch" }}>
            <InputLabel>Blood Group</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="bloodGroup"
              value={bloodGroup}
              label="Blood Group"
              onChange={(e) => onInputChange(e)}
            >
              <MenuItem value={"A+"}>A+</MenuItem>
              <MenuItem value={"A-"}>A-</MenuItem>
              <MenuItem value={"B+"}>B+</MenuItem>
              <MenuItem value={"B-"}>B-</MenuItem>
              <MenuItem value={"O+"}>O+</MenuItem>
              <MenuItem value={"O-"}>O-</MenuItem>
              <MenuItem value={"AB+"}>AB+</MenuItem>
              <MenuItem value={"AB-"}>AB-</MenuItem>
            </Select>
          </FormControl>

          <Typography variant="h6" gutterBottom>
            Contact Details
          </Typography>

          <TextField
            sx={{ m: 1, width: "55ch" }}
            id="outlined-disabled"
            name="mobileNo"
            value={mobileNo}
            onChange={(e) => onInputChange(e)}
            label="Contact Number"
            defaultValue=""
          />

          <TextField
            sx={{ m: 1, width: "55ch" }}
            required
            id="outlined-disabled"
            name="address"
            value={address}
            onChange={(e) => onInputChange(e)}
            label="Living Address"
            defaultValue=""
          />

          <TextField
            sx={{ m: 1, width: "55ch" }}
            required
            id="outlined-disabled"
            name="city"
            value={city}
            onChange={(e) => onInputChange(e)}
            label="Home City"
            defaultValue=""
          />
          <TextField
            sx={{ m: 1, width: "55ch" }}
            id="outlined-disabled"
            name="email"
            value={email}
            onChange={(e) => onInputChange(e)}
            label="Email Address"
            defaultValue=""
          />

      
        </div>
      </Box>
      <Button
        sx={{ alignItems: "center", m: 1, width: "42ch" }}
        variant="contained"
        size="medium"
        type="submit"
      >
        Register Patient
      </Button>
      <Toaster />
    </form>
  );
}
