import React from 'react'
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';

const columns = [
  { id: "patientId", label: "Patient Id",align: "center", maxWidth: 20 },

  {
    id: "patientName",
    label: "Patient Name",
    align: "center",
    minWidth:20
    
  },

  {
    id: "patientType",
    label: "Patient Type",
    maxWidth:20,
    align: "center",
    
  },
  {
    id: "dob",
    label: "Date Of Birth",
    maxWidth:20,
    align: "center",
    
  },
  {
    id: "gender",
    label: "Gender",
    maxWidth:20,
    align: "center",
    
  },
  {
    id: "mobileNo",
    label: "Mobile Number",
    maxWidth:20,
    align: "center",
    
  }
];

export default function NewAppointmentTable() {

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    loadPatient();
  }, []);

  const loadPatient = async () => {
    const result = await axios
      .get("http://localhost:8080/api/v1/patients")
      .then((res) => {
        console.log(res.data);
        setPatients(res.data);
      });
  };

 
  const  revpatients = patients.slice(  ).reverse()
  const lenghtPatient = revpatients.length;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {revpatients.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                  <div>
                 {row.isTreated != 1 ?  <div><Button  color="success" variant="contained"   onClick={(e)=>TreatPatientFunc(row.patientId)} >
          Treat
        </Button></div>:<div><Button disabled color="success" variant="contained"   onClick={(e)=>TreatPatientFunc(row.patientId)} >
          Treated
        </Button></div>}
                     </div>
        
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={revpatients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
    </Paper>
    
  );
}
