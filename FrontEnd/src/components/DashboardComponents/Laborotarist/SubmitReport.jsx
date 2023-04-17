import React from "react";
import { useState, useEffect } from "react";
import { Header } from "../../../components";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FormControl from "@mui/joy/FormControl";
import Textarea from "@mui/joy/Textarea";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import RoundedButton from "../../ExtraComponents/RoundedButton";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",

  padding: theme.spacing(5),
  textAlign: "center",
  borderWidth: "2px",
  boxShadow: "12px",
  color: theme.palette.text.secondary,
}));

export default function SubmitReport() {
  const [open, setOpen] = React.useState(false);
  const [isRequestTest, setIsRequestTest] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const patientId = new URLSearchParams(document.location.search).get("id");
  const reportId = new URLSearchParams(document.location.search).get("labid");
  const [patientData, setPatientData] = useState([]);
  let navigate = useNavigate();
  const [docID, SetDocID] = useState([]);

  const doctorId = docID;

  useEffect(() => {
    loadPatients();

    if ("user" in localStorage) {
      const docID = JSON.parse(localStorage.getItem("user")).userId;

      SetDocID(docID);
    }
  }, []);

  const loadPatients = async () => {
    const result = await axios
      .get(`http://localhost:8080/api/v1/patients/${patientId}`)
      .then((res) => {
        setPatientData(res.data);
        setIsRequestTest(res.data.isRequestTest);
      });
  };
  const [file, setFile] = useState(null);
  const [labprice, setPrice] = useState({
    price:""
  });

  const {price}=labprice

  const onInputChange = (e) => {
    setPrice({ ...labprice, [e.target.name]: e.target.value });
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("price", String(price)  );

    const res = await axios.patch(
          `http://localhost:8080/api/v1/patients/isSubmit/${patientId}`,
        { isSubmitReport: true }
    );
    // res.data.headers["Content-Type"];

    await axios
      .post(
        `http://localhost:8080/api/v1/labReport/upload/${reportId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((r) => {
        if (r.status === 200) {
          toast.success("Successfully Upload Test Report", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

            navigate(-1);
        } else {
          toast.error("File Upload is Unsuccessfull", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });


   
  };

  return (
    <div>
      <div className="border shadow p-5 md:m-12 md:mt-4 md:p-10 bg-white rounded-3xl">
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Header title="Test Report - " value={patientData?.patientName} />
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
              <form className="m-3  p-2 md:p-10 " onSubmit={(e) => onSubmit(e)}>
                <Box
                  sx={{
                    "& .MuiTextField-root": { mt: 2 },
                  }}
                >
                  {/* <div>
                    <p className=" mb-2 mt-8 align Right font-extrabold  text-slate-700">
                      Enter Price Of the Test
                    </p>
                    <FormControl
                      sx={{
                        mt: 2,
                      }}
                    >
                      <Textarea
                        value={price}
                        required
                        name="price"
                        onChange={(e) => onInputChange(e)}
                        placeholder="Enter Price of the test in rupees Here....."
                        minRows={1}
                      />
                    </FormControl>
                  </div> */}

                  <p className=" mt-7 mb-4 align Right font-extrabold  text-slate-700">
                    SUBMIT TEST REPORT
                  </p>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      alignItems="center"
                      justifyContent="center"
                      xs={12}
                    >
                      <Item>
                        <p className="mt-3 mb-4  text-1xl align Right font-extrabold tracking-tight text-slate-600">
                          Please Choose PDF file of Test Result using following
                          button...
                        </p>

                        <Button variant="contained" component="label">
                          <input
                            type="file"
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                        </Button>
                      </Item>

                      <Button sx={{ mt: 4 }} variant="contained" type="submit">
                        Submit Test Details
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      </div>

      <ToastContainer />
    </div>
  );
}
