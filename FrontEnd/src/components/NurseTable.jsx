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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const columns = [
  { id: "id", label: "User Id",align: "center", maxWidth: 20 },

  {
    id: "name",
    label: "Nurse Name",
    align: "center",
    minWidth:20
    
  },
  {
    id: "phone",
    label: "Phone No",
    maxWidth:20,
    align: "center",
    
  },
  {
    id: "email",
    label: "Email Address",
    maxWidth:20,
    align: "center",
    
  },
  {
    id: "address",
    label: "Living Address",
    maxWidth:20,
    align: "center",
    
  },
  {
    id: "username",
    label: "User Name",
    maxWidth:20,
    align: "center",
    
  },
  {
    id: "passwrd",
    label: "Password",
    maxWidth:20,
    align: "center",
    
  }
];

export default function NurseTable() {

  const [NurseList, setNurse] = useState([]);

  useEffect(() => {
    loadNurse();
  }, []);

  const loadNurse = async () => {
    const result = await axios
      .get("http://localhost:8080/api/v1/users/role/NURSE")
      .then((res) => {
        console.log(res.data);
        setNurse(res.data);
      });
  };

  async function deleteNurse(did) {
    const result = await axios
      .delete(`http://localhost:8080/api/v1/users/delete/${did}`)
      .then((res) => {
        //console.log(res.data);
        loadNurse();
      });
  }

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
            {NurseList.map((row) => {
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
                    <EditIcon />
                    <DeleteIcon onClick={()=>deleteNurse(row.id)}/>
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
        count={NurseList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
    </Paper>
    
  );
}
