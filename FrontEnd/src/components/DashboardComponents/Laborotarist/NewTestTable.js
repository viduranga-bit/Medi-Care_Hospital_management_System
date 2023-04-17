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
import { useState, useEffect} from "react";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from "../../../contexts/ContextProvider";

const columns = [
  { id: "reportId", label: "Report Id", align: "center", maxWidth: 20 },

  {
    id: "reportName",
    label: "Report Name",
    width: 40,
    align: "center",
  },

  {
    id: "patientName",
    label: "Patient Name",
    maxWidth: 20,
    align: "center",
  },
  {
    id: "doctorName",
    label: "Requested By",
    maxWidth: 20,
    align: "center",
  },
  {
    id: "requestDate",
    label: "Request Time",
    maxWidth: 20,
    align: "center",
  },
];

export default function NewTestTable() {
    const { currentColor, currentMode } = useStateContext();

  const [labReport, setLabReport] = useState([]);
  const [patientData, setPatientData] = useState([]);
  
 console.log(labReport);
  useEffect(() => {
    loadLabReport();
  
  }, []);
 
  const loadLabReport = async () => {
    const result = await axios
      .get("http://localhost:8080/api/v1/labReport/get-lab-details")
      .then((res) => {
          const LaboTest = res.data.filter(labReport => labReport.laboratarist_id ==JSON.parse(localStorage.getItem("user")).userId);
          setLabReport(LaboTest);
          console.log(LaboTest);
      });
  };

  let navigate = useNavigate();
  const submitReportFunc = (patientId,lid) =>{
    navigate(`/submitReport?id=${patientId}&labid=${lid}`);

 }

 const revLabReport = labReport.slice().reverse();

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
      <TableContainer sx={{ maxHeight: 380 }}>
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
              
              <TableCell style={{ textAlign: "center" }}>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {revLabReport.map((row) => {
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
                    <Button
                      sx={{  bgcolor:  "#14fc65" }}
                      variant="contained"
                      onClick={(e) =>
                        submitReportFunc(row.patientId, row.reportId)
                      }
                    >
                      Submit Result
                    </Button>
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
        count={labReport.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
