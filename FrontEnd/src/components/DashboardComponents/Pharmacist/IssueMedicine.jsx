import React from "react";
import { useState, useEffect, useRef } from "react";
import { Header } from "../../../components";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControl from "@mui/joy/FormControl";
import Textarea from "@mui/joy/Textarea";
import "react-toastify/dist/ReactToastify.css";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import RoundedButton from "../../ExtraComponents/RoundedButton";
import { HashLoader } from "react-spinners";
import { useStateContext } from "../../../contexts/ContextProvider";
import Autosuggest from "react-autosuggest";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { red } from "@mui/material/colors";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";

const Item = styled(Paper)(({ theme }) => ({
  textAlign: "center",
  alignItems: "center",
  borderWidth: "1px",
  boxShadow: "1px",
}));

const columns = [


  {
    id: "medicineName",
    label: "Medicine Name",
    width: 40,
    align: "center",
  },

  {
    id: "qunataty",
    label: "Issued Qty",
    maxWidth: 20,
    align: "center",
  },
  {
    id: "medicineID",
    label: "Medicine ID",
    maxWidth: 20,
    align: "center",
  },
];

export default function IssueMedicine() {
  const [open, setOpen] = React.useState(false);
  const [isRequestTest, setIsRequestTest] = React.useState(false);
  const [isSubmitReport, setIsSubmitReport] = React.useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const { currentColor, currentMode } = useStateContext();
   const [pharmID, SetPharmID] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const formRef = useRef(null);
  const patientId = new URLSearchParams(document.location.search).get("id");
  const precripId = new URLSearchParams(document.location.search).get("labid");

  const [patientData, setPatientData] = useState([]);
  const [prescriptionData, setPrescriptionData] = useState([]);
  let navigate = useNavigate();

  const filteredReports = prescriptionData.filter(
    (report) => report.patient_id == patientId
  );
  const descriptions = [filteredReports[0]?.description];

  const DescriptionString = descriptions.join("\n");

  const medicineList = [filteredReports[0]?.medication];

  const medicineListnString = descriptions.join("\n");



  const [selectedMedicine, setSelectedMedicine] = useState(null);

  const handleMedicineChange = (event, newValue) => {
    event.preventDefault();
    setSelectedMedicine(newValue);
  };

  const loadPatients = async () => {
    const result = await axios
      .get(`http://localhost:8080/api/v1/patients/${patientId}`)
      .then((res) => {
        setPatientData(res.data);
        setIsRequestTest(res.data.isRequestTest);
        setIsSubmitReport(res.data.isSubmitReport);
      });
  };

  const loadPrescription = async () => {
    const result = await axios
      .get("http://localhost:8080/api/v1/prescription/get-prescription-details")
      .then((res) => {
        setPrescriptionData(res.data);
      });
  };

  const [medicineData, setMedicineData] = useState({
    medicineName:"",
    pharmacistID: "",
    qunataty:"",
    medicineId: "",
    pharmacistID:"",
    patientId:patientId,
    MedicineCode:""
  });
  const {qunataty} =
    medicineData;

  const availableQty = null;


  const onInputChange = (e) => {
    setMedicineData({ ...medicineData, [e.target.name]: e.target.value });
  };

  const [Medicine, setMedicine] = useState("");

  const loadMedicine = async () => {
    const result = await axios
      .get("http://localhost:8080/api/v1/medicine")
      .then((res) => {
        const medicines = res.data;
        setMedicine(medicines);
      });
  };

  useEffect(() => {
    loadMedicine();
    loadPatients();
    loadPrescription();

    if ("user" in localStorage) {
      const id = JSON.parse(localStorage.getItem("user")).userId;

      SetPharmID(id);
    }
  }, []);
 const [allocations, setAllocations] = useState([]);


  useEffect(() => {
    const fetchAllocations = async () => {
 
        const response = await axios.get(
          `http://localhost:8080/api/v1/medicineAllocation/get-details-by-pid/${patientId}`
        );
        setAllocations(response.data);
      
    };
    fetchAllocations();
  }, []);

  const onSubmit = async (e) => {
    
    e.preventDefault();
    e.target.reset();
    const medicinefullData = {
      ...medicineData,
      medicineName: selectedMedicine?.medicineName,
      medicineID: selectedMedicine?.medicineId,
      medicineCode: selectedMedicine?.itemCode,
      pharmacistID: pharmID,
    };
    await axios
      .post("http://localhost:8080/api/v1/medicineAllocation", medicinefullData)
      .then((r) => {
       
      });

      const medid = selectedMedicine?.medicineId;
      console.log(medid);

       await axios
         .post(
           `http://localhost:8080/api/v1/medicineAllocation/allocate-medicine/${medid}/${qunataty}`
         )
         .then((r) => {});

    const result = await axios
      .get(
        `http://localhost:8080/api/v1/medicineAllocation/get-details-by-pid/${patientId}`
      )
      .then((res) => {
        const medicines = res.data;
        setAllocations(medicines);
      });

  
  };

  const MarkAsDone = async (e) => {
   
    const res = await axios.patch(
      `http://localhost:8080/api/v1/prescription/${precripId}`,
      { isIssuedMedicine: true }
    );
    navigate(-1);
  };
  const loadMedAllocations= async () =>{

    const response = await axios.get(
      `http://localhost:8080/api/v1/medicineAllocation/get-details-by-pid/${patientId}`
    );
    setAllocations(response.data);  

  }
  async function deleteMedAllocation(did) {
    const result = await axios
      .delete(
        `http://localhost:8080/api/v1/medicineAllocation/delete-med-from-allocation/${did}`
      )
      .then((res) => {
        console.log(res.data);
        loadMedAllocations();
      });
  }

  return (
    <div>
      <div className="border shadow p-5 md:m-12 md:mt-4 md:p-10 bg-white rounded-3xl">
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Header
              title="Issue Medicine Patient - "
              value={patientData?.patientName}
            />
            <p className="ml-1  text-1xl align Right font-extrabold tracking-tight text-slate-700">
              Age : {patientData?.age} | Gender : {patientData?.gender}
            </p>
          </Grid>
          <Grid item xs={2}>
            <p className="mt-3  text-1xl align Right font-extrabold tracking-tight text-slate-600">
              Patient ID : {patientData?.patientId}
            </p>
          </Grid>
          <Grid item xs={12}>
            <div>
              <Box
                sx={{
                  "& .MuiTextField-root": { mt: 2 },
                }}
              >
                <p className=" mb-2 mt-8 align Right font-extrabold  text-slate-700">
                  SPECIAL NOTES FORM DOCTOR
                </p>

                <Card variant="outlined">
                  <div>
                    {DescriptionString.split("\n").map((line, index) => (
                      <p
                        className="m-5 ml-10  text-1xl align Right font-extrabold tracking-tight text-slate-500"
                        key={index}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </Card>

                <p className=" mb-2 mt-8  align Right font-extrabold  text-slate-700">
                  PRESCRIPTED MEDICINE LIST
                </p>
                <Card variant="outlined">
                  <div>
                    {medicineListnString.split("\n").map((line, index) => (
                      <p
                        className="m-5 ml-10  text-1xl align Right font-extrabold tracking-tight text-slate-500"
                        key={index}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </Card>
                <Grid container spacing={2}>
                  <Grid
                    item
                    alignItems="center"
                    justifyContent="center"
                    xs={12}
                  >
                    <p className=" mb-2 mt-8 align Right font-extrabold  text-slate-700">
                      ISSUE MEDICATIONS
                    </p>

                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <form onSubmit={(e) => onSubmit(e)}>
                            <Item>
                              <div className="card" style={{ width: "100%" }}>
                                <FormControl
                                  sx={{
                                    mt: 5,
                                    ml: 5,
                                    mr: 5,
                                    mb: 2,
                                  }}
                                >
                                  <Autocomplete
                                    id="Select Medicine"
                                    options={Medicine}
                                    autoHighlight
                                    getOptionLabel={(option) =>
                                      `${option.itemCode} ${option.medicineName}`
                                    }
                                    renderOption={(props, option) => (
                                      <Box component="li" {...props}>
                                        {option.medicineName}
                                      </Box>
                                    )}
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        label="Choose a Medicine"
                                        inputProps={{
                                          ...params.inputProps,
                                          autoComplete: "true",
                                        }}
                                      />
                                    )}
                                    value={selectedMedicine}
                                    onChange={handleMedicineChange}
                                  />
                                  {selectedMedicine && (
                                    <>
                                      {selectedMedicine.currentQuantity != 0 ? (
                                        <p
                                          className="ml-1 text-slate-700"
                                          style={{
                                            textAlign: "left",
                                          }}
                                        >
                                          Available Quantity:{" "}
                                          {selectedMedicine.currentQuantity}
                                        </p>
                                      ) : (
                                        <p
                                          style={{
                                            color: "#ff0000",
                                            textAlign: "left",
                                          }}
                                          className="ml-1 text-slate-700 "
                                        >
                                          No Available Quantity
                                        </p>
                                      )}
                                    </>
                                  )}
                                </FormControl>

                                <FormControl
                                  sx={{
                                    mt: 2,
                                    ml: 5,
                                    mr: 5,
                                    mb: 5,
                                  }}
                                >
                                  {selectedMedicine?.currentQuantity != 0 ? (
                                    <Textarea
                                      required
                                      value={qunataty}
                                      name="qunataty"
                                      onChange={(e) => onInputChange(e)}
                                      placeholder="Enter Quantity Here"
                                      minRows={1}
                                    />
                                  ) : (
                                    <Textarea
                                      required
                                      name="medication"
                                      onChange={(e) => onInputChange(e)}
                                      placeholder="Enter Quantity Here"
                                      minRows={1}
                                      disabled
                                    />
                                  )}
                                </FormControl>
                              </div>
                              {selectedMedicine?.currentQuantity != 0 ? (
                                <Button
                                  sx={{
                                    alignItems: "center",
                                    width: "20ch",
                                    mb: 2,
                                  }}
                                  variant="contained"
                                  size="medium"
                                  type="submit"
                                >
                                  Issue Medicine
                                </Button>
                              ) : (
                                <Button
                                  disabled
                                  sx={{
                                    alignItems: "center",
                                    width: "20ch",
                                    mb: 2,
                                  }}
                                  variant="contained"
                                  size="medium"
                                  type="submit"
                                >
                                  Issue Medicine
                                </Button>
                              )}
                            </Item>
                          </form>
                        </Grid>
                        <Grid item xs={6}>
                          <Item>
                            <div style={{ margin: "20px" }}>
                              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                                <TableContainer sx={{ height: 220 }}>
                                  <Table stickyHeader aria-label="sticky table">
                                    <TableHead
                                      sx={{
                                        height: 5,
                                      }}
                                    >
                                      <TableRow>
                                        {columns.map((column) => (
                                          <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{
                                              minWidth: column.minWidth,
                                            }}
                                          >
                                            {column.label}
                                          </TableCell>
                                        ))}

                                        <TableCell
                                          style={{ textAlign: "center" }}
                                        >
                                          Options
                                        </TableCell>
                                      </TableRow>
                                    </TableHead>
                                    <TableBody>
                                      {allocations.map((row) => {
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
                                                <TableCell
                                                  key={column.id}
                                                  align={column.align}
                                                >
                                                  {column.format &&
                                                  typeof value === "number"
                                                    ? column.format(value)
                                                    : value}
                                                </TableCell>
                                              );
                                            })}
                                            <TableCell>
                                              <DeleteIcon
                                                onClick={() =>
                                                  deleteMedAllocation(
                                                    row.issueId
                                                  )
                                                }
                                              />
                                            </TableCell>
                                          </TableRow>
                                        );
                                      })}
                                    </TableBody>
                                  </Table>
                                </TableContainer>
                              </Paper>
                            </div>
                          </Item>
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Button
                sx={{ alignItems: "center", mt: 5, width: "22ch" }}
                variant="contained"
                size="medium"
                type="submit"
                onClick={(e) => MarkAsDone()}
              >
                Mark As Done
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
