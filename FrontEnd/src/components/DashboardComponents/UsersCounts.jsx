import React, { useEffect, useState } from "react";
import { earningData, userCountsData } from "../../data/dummy";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
 

  textAlign: "center",
 
}));

export default function UsersCounts() {



  const [allUsers, setAllUsers] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);
  const [allPatients, setAllPatients] = useState([]);

  const loadAllUsers = async () => {
    const result = axios
      .get(`http://localhost:8080/api/v1/users/get-all-users`)
      .then((res) => {
        setAllUsers(res.data);
      });
  };

  const loadDepartments = async () =>{
    const result = axios
      .get(`http://localhost:8080/api/v1/departments`)
      .then((res) => {
        setAllDepartments(res.data);
      });

  }

  const loadPatients = async () => {
    const result = axios
      .get(`http://localhost:8080/api/v1/patients`)
      .then((res) => {
        setAllPatients(res.data);
      });
  };

  useEffect(() => {
    loadAllUsers();
    loadDepartments();
    loadPatients();
  }, []);

 var patients = allPatients.length
 var dep = allDepartments.length;

  var doctor=null;
   var Receptionist=null;
    var labo=null;
   var pharm=null;
   var nurse=null;

  for(var i =0;i<allUsers.length;i++){

    if(allUsers[i].role === "DOCTOR"){
      doctor=doctor+1;
    }else if(allUsers[i].role === "RECIEPTIONIST"){
     Receptionist = Receptionist+1

  }else if(allUsers[i].role === "LABORARIST"){

    labo=labo+1;
  }else if(allUsers[i].role === "PHARMACIST"){
    pharm=pharm+1;

  }else if(allUsers[i].role === "NURSE"){
    
    nurse=nurse+1;

  }else{

  }

  }

  const count = [dep, doctor, patients, nurse, pharm, labo];
  console.log(count);

  return (
    <div>
      <div className=" flex mt-4 flex-wrap lg:flex-nowrap justify-center ">
        <div className=" flex m-3 flex-wrap justify-center gap-9   items-center">
          {earningData.map((item, index) => (
            <div
              key={item.title}
              className="border shadow-lg bg-white h-25 dark:text-gray-200 dark:bg-secondary-dark-bg w-44 p-4 pt-4 rounded-2xl "
            >
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <button
                      type="button"
                      style={{
                        display: "flex",
                        color: item.iconColor,
                        backgroundColor: item.iconBg,
                      }}
                      className="text-2xl opacity-0.7 rounded-full  p-4 hover:drop-shadow-xl"
                    >
                      {item.icon}
                    </button>
                    <p className="mt-3">
                      <span className="text-lg font-semibold" />
                    </p>
                    <p className="text-sm text-gray-400  mt-1">{item.title}</p>
                  </Grid>
                  <Grid sx={{ mt: 3 }} item xs={6}>
                    <p
                      className=" mt-4  ml-4 align Right font-extrabold  text-slate-700"
                      style={{ fontSize: "40px" }}
                    >
                      {count[index]}
                    </p>
                  </Grid>
                </Grid>
              </Box>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
