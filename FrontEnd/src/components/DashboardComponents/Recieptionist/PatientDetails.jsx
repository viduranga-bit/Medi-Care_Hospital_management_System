import React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";

export default function PatientDetails() {
  const patientId = new URLSearchParams(document.location.search).get("id");

  const [patientData, setPatientData] = useState([]);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    const result = await axios
      .get(`http://localhost:8080/api/v1/patients/${patientId}`)
      .then((res) => {
        setPatientData(res.data);
      });
  };

  const Item3 = styled(Paper)(({ theme }) => ({
    textAlign: "center",
    margin: "15",
  }));

  const Item4 = styled(Paper)(({ theme }) => ({
    textAlign: "center",
    marginBottom: "15",
  }));

  const Item2 = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,

    textAlign: "left",
  }));

  const Item = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    border: "0px solid",
    borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",

    borderRadius: "4px",
  }));
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item3 sx={{ boxShadow: 2 }}>
              <div style={{ justifyContent: "center", display: "flex" }}>
                <Avatar
                  sx={{
                    width: 156,
                    height: 156,
                    marginTop: 8,
                    marginBottom: 2,
                  }}
                ></Avatar>
              </div>
              <Typography variant="body1" gutterBottom>
                Patient ID : {patientData?.name}
              </Typography>
              {patientData?.patientType == "INPATIENT" ? (
                <Chip label="In Patient" color="success" />
              ) : (
                <Chip label="out patient" color="primary" />
              )}
              {patientData?.gender == "MALE" ? (
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500, fontSize: 20 }}
                  gutterBottom
                >
                  Mr . {patientData?.patientName}
                </Typography>
              ) : (
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500, fontSize: 20 }}
                  gutterBottom
                >
                  Miss . {patientData?.patientName}{" "}
                </Typography>
              )}
              <div style={{ height: 20 }}></div>
            </Item3>
          </Grid>

          <Grid item xs={8}>
            <Item2 sx={{ boxShadow: 2 }}>
              <Grid container spacing={0}>
                <Grid item xs={4}>
                  <Item>
                    <div className="md:p-8">
                      <Typography
                        sx={{ fontWeight: "bold" }}
                        variant="body1"
                        gutterBottom
                      >
                        Patient ID Number
                      </Typography>
                      <Typography
                        sx={{ fontWeight: "bold" }}
                        variant="body1"
                        gutterBottom
                      >
                        Patient Name
                      </Typography>

                      <Typography
                        sx={{ fontWeight: "bold" }}
                        variant="body1"
                        gutterBottom
                      >
                        Date Of Birth
                      </Typography>
                      <Typography
                        sx={{ fontWeight: "bold" }}
                        variant="body1"
                        gutterBottom
                      >
                        NIC
                      </Typography>

                      <Typography
                        sx={{ fontWeight: "bold" }}
                        variant="body1"
                        gutterBottom
                      >
                        Gender
                      </Typography>

                      <Typography
                        sx={{ fontWeight: "bold" }}
                        variant="body1"
                        gutterBottom
                      >
                        Patient Type
                      </Typography>
                      <Typography
                        sx={{ fontWeight: "bold" }}
                        variant="body1"
                        gutterBottom
                      >
                        Admission Date
                      </Typography>
                      <Typography
                        sx={{ fontWeight: "bold" }}
                        variant="body1"
                        gutterBottom
                      >
                        Blood Group
                      </Typography>

                      <Typography
                        sx={{ fontWeight: "bold" }}
                        variant="body1"
                        gutterBottom
                      >
                        Contact Number
                      </Typography>

                      <Typography
                        sx={{ fontWeight: "bold" }}
                        variant="body1"
                        gutterBottom
                      >
                        Address
                      </Typography>

                      <Typography
                        sx={{ fontWeight: "bold" }}
                        variant="body1"
                        gutterBottom
                      >
                        Home City
                      </Typography>

                      <Typography
                        sx={{ fontWeight: "bold" }}
                        variant="body1"
                        gutterBottom
                      >
                        Email Address
                      </Typography>
                    </div>
                  </Item>
                </Grid>

                <Grid item xs={1}>
                  <Item>
                    <div className="md:p-8">
                      <Typography variant="body1" gutterBottom>
                        :
                      </Typography>

                      <Typography variant="body1" gutterBottom>
                        :
                      </Typography>

                      <Typography variant="body1" gutterBottom>
                        :
                      </Typography>

                      <Typography variant="body1" gutterBottom>
                        :
                      </Typography>

                      <Typography variant="body1" gutterBottom>
                        :
                      </Typography>

                      <Typography variant="body1" gutterBottom>
                        :
                      </Typography>

                      <Typography variant="body1" gutterBottom>
                        :
                      </Typography>

                      <Typography variant="body1" gutterBottom>
                        :
                      </Typography>

                      <Typography variant="body1" gutterBottom>
                        :
                      </Typography>

                      <Typography variant="body1" gutterBottom>
                        :
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        :
                      </Typography>

                      <Typography variant="body1" gutterBottom>
                        :
                      </Typography>
                    </div>
                  </Item>
                </Grid>

                <Grid item xs={7}>
                  <Item>
                    <div className="md:p-8">
                      <Typography variant="body1" gutterBottom>
                        {patientData?.patientId}
                      </Typography>

                      <Typography variant="body1" gutterBottom>
                        {patientData?.patientName}
                      </Typography>

                      <Typography variant="body1" gutterBottom>
                        {patientData?.dob}
                      </Typography>

                      <Typography variant="body1" gutterBottom>
                        {patientData?.nic}
                      </Typography>

                      <Typography variant="body1" gutterBottom>
                        {patientData?.gender}
                      </Typography>

                      <Typography variant="body1" gutterBottom>
                        {patientData?.patientType}
                      </Typography>

                      <Typography variant="body1" gutterBottom>
                        {patientData?.admitdate}
                      </Typography>

                      <Typography variant="body1" gutterBottom>
                        {patientData?.bloodGroup}
                      </Typography>

                      <Typography variant="body1" gutterBottom>
                        {patientData?.mobileNo}
                      </Typography>

                      <Typography variant="body1" gutterBottom>
                        {patientData?.admitdate}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {patientData?.address}
                      </Typography>

                      <Typography variant="body1" gutterBottom>
                        {patientData?.city}
                      </Typography>
                    </div>
                  </Item>
                </Grid>
              </Grid>
              <Item4>
                <Button
                  sx={{ alignItems: "center", m: 1, width: "18ch" }}
                  variant="contained"
                  size="medium"
                >
                  Edit Details
                </Button>
                <Button
                  sx={{ alignItems: "center", m: 1, width: "25ch" }}
                  variant="contained"
                  size="medium"
                >
                  Print Patient Ticket
                </Button>
              </Item4>
            </Item2>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
