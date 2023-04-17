import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStateContext} from '../../../contexts/ContextProvider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';




export default function Appointment() {

    const [patients, setPatients] = useState([]);
    
    useEffect(() => {
      if ("user" in localStorage) {  
        axios.get("http://localhost:8080/api/v1/patients").then(response => {
        const doctorPatient = response.data.filter(patient => patient.doc_id ==JSON.parse(localStorage.getItem("user")).userId);
        setPatients(doctorPatient);
        
       
      })
      }
    },[]); 

    
    const  revpatients = patients.slice(patients.length-5,patients.length).reverse().filter((row)=>row.isTreated !=1);
    const lenghtPatient = revpatients.length;
    
     

     
     const { currentColor, currentMode } = useStateContext();

    let navigate = useNavigate();
    const TreatPatientFunc = (patientId) =>{
       navigate(`/treatPatient?id=${patientId}`)

    }
    return (
      <div>
        <div className="border shadow p-5 mb-5 bg-white rounded bg-white dark:text-gray-300 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-760">
          <div className="justify-between items-center gap-2 mb-10">
            <p className="text-xl font-semibold p-3">
              New Appointments ({lenghtPatient})
            </p>

            <div>
              <TableContainer component={Paper}>
                <Table
                  sx={{ minWidth: 600, maxHeight: 10 }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Registration ID</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Age</TableCell>
                      <TableCell align="center">Patient Type</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {revpatients.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="center" component="th" scope="row">
                          {row.patientId}
                        </TableCell>
                        <TableCell align="center">{row.patientName}</TableCell>
                        <TableCell align="center">{row.age}</TableCell>
                        <TableCell align="center">{row.patientType}</TableCell>
                        <TableCell align="center">
                          <Button
                            sx={{ bgcolor: "#14fc65" }}s
                            variant="contained"
                            onClick={(e) => TreatPatientFunc(row.patientId)}
                          >
                            Treat
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
          <div className="md:w-full overflow-auto"></div>
        </div>
      </div>
    );
}
