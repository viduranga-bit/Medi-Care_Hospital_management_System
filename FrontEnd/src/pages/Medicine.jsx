import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import axios from "axios";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Header } from "../components";
import ActionButton from "../components/ExtraComponents/ActionButton";
import Popup from "../components/ExtraComponents/Popup";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
const columns = [


  {
    id: "medicineName",
    label: "Drug Name",
    align: "center",
    minWidth: 20,
  },
  {
    id: "date_added",
    label: "date Added",
    maxWidth: 20,
    align: "center",
  },
  {
    id: "ManufacturingCompany",
    label: "Manfactured By",
    maxWidth: 20,
    align: "center",
  },
  {
    id: "price",
    label: "Price",
    maxWidth: 20,
    align: "center",
  },
  {
    id: "sellingPrice",
    label: "selling Price",
    maxWidth: 20,
    align: "center",
  },
  {
    id: "description",
    label: "Description",
    maxWidth: 20,
    align: "center",
  },

  {
    id: "currentQuantity",
    label: "Current Quantity",
    maxWidth: 20,
    align: "center",
  },
];

export default function Medicine() {
  const [search, setSearch] = useState([]);
  const [medicine, setMedicine] = useState([]);
  const data = { name: "Active", color: "success" };
  const data1 = { name: "InActive", color: "error" };


  const onSubmit = async (newMedi) => {
    setMedicine([...medicine, newMedi]);
    await axios.post("http://localhost:8080/api/v1/medicine",newMedi);  
  
  };

  useEffect(() => {
    LoadMedicine();
  }, []);

  const LoadMedicine = async () => {
    const result = await axios
      .get("http://localhost:8080/api/v1/medicine")
      .then((res) => {
        setMedicine(res.data);
      });
  };

  async function deleteLaborarist(did) {
    const result = await axios
      .delete(`http://localhost:8080/api/v1/users/delete/${did}`)
      .then((res) => {
       loadLaborarist();
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



  const prevMedicine = medicine.slice().reverse();
  console.log(prevMedicine)

  return (
    <div className="border border-warning shadow-lg p-3 mb-5 bg-white rounded  m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Manage Medicine Stock" />

      <Box sx={{ mb: 2, width: "100%", typography: "body1" }}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Popup addNew={onSubmit} />
          </Grid>
          <Grid item xs={6}>
            <form>
              <TextField
                sx={{ alignItems: "left", width: "42ch" }}
                id="search-bar"
                className="text"
                onInput={(e) => {
                  //  setSearchQuery(e.target.value);
                }}
                label="Search Medicine"
                variant="outlined"
                placeholder="Search..."
                size="small"
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon sx={{ ml: 2, mt: 1 }} style={{ fill: "blue" }} />
              </IconButton>
            </form>
          </Grid>
        </Grid>

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
                  <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prevMedicine.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
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

                      <TableCell sx={{textAlign:"center"}}>
                        {row.status === "ACTIVE" ? (
                          <ActionButton data={data} />
                        ) : (
                          <ActionButton data={data1} />
                        )}
                      </TableCell>

                      <TableCell>
                        <DeleteIcon onClick={() => deleteLaborarist(row.id)} />
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
            count={medicine.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
}
