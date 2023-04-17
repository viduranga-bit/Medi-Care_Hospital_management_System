import React, { useState,useEffect,useContext } from "react";
import { Button } from '@material-ui/core'
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { ToastContainer , toast  } from 'react-toastify';
import FormControl from "@mui/material/FormControl";

export default function LabReportReqForm(prop) {

 const patientId=prop.patID;
 const [doc_id, setdocId] = useState();

 const docID = doc_id?.userId;

 const [labReport, setlabReport] = useState({
  reportName: "",
  laboratarist_id: "",
  doc_id:"",
  patient_id:patientId
  
});

const {
  reportName,
  laboratarist_id,
  patient_id, 
} = labReport;


 const {open,setOpen, setIsRequestTest} = prop;
 const test ="sdcsdc"
    const btnStyle = { 
      marginTop: 10,
      left: "43%",
  
    }   
    const [laborotarist, setLaborotarist] = useState([]);
   
    

    useEffect(() => {
      if ("user" in localStorage) {
        setdocId(JSON.parse(localStorage.getItem("user")));
      }
    }, []); 

  
    useEffect(() => {
      axios
        .get("http://localhost:8080/api/v1/users/role/LABORARIST")
        .then((response) => {
          setLaborotarist(response.data);
          console.log(response.data);
        });
  
    }, []);

   


    const onInputChange = (e) => {
      setlabReport({ ...labReport, [e.target.name]: e.target.value });
    };


    const onSubmitReport = async (e) => {
    e.preventDefault(); 
    const labreportData = { ...labReport, doc_id:docID };
    await axios
      .post("http://localhost:8080/api/v1/labReport", labreportData)
      .then((r) => {
        if (r.status === 200) {
          //  toast.success("Successfully Registered Patient!", {
          //   position: "top-right",
          //  });
        }
      });

    const res = await axios.patch(`http://localhost:8080/api/v1/patients/${patientId}`, { isRequestTest: true }).then((r) => {
      if (r.status === 200) {
        setIsRequestTest(true);
        setOpen(false);
        toast.success(`${test} report Request is Successfull`,{position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"});
    
      }});
  
   
  };
  return (
    
      <Box
        sx={{
          alignItems: 'center',
          "& .MuiTextField-root": { mt:3},
        }} 
      >
        <form onSubmit={(e) => onSubmitReport(e)}>
      
        <div>


<TextField
          sx={{ ml: 1, width: "57.5ch" }}
          id="filled-multiline-flexible"
          label="Test to be done"
          multiline
          required
          value={reportName}
          maxRows={6}
          variant="outlined"
          name="reportName"  
          onChange={(e) => onInputChange(e)}
        
        />

<FormControl sx={{ m: 1,mt:5, width: "57.5ch" }}>
            <InputLabel>Assign Lab Technician</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="laboratarist_id"
              value={laboratarist_id}
              onChange={(e) => onInputChange(e)}
              required
            >
              {laborotarist.map((laborotarist) => (
                <MenuItem key={laborotarist.id} value={laborotarist.id}>
                  {laborotarist.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        <div >
      </div>
   </div>
  
  
                      <Button type='submit' style={btnStyle} variant='contained'
                             color='primary'>Submit</Button>
    </form>
    <ToastContainer/>
</Box>

  )
}
