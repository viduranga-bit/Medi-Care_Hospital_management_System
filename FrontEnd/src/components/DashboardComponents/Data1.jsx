import React, { useState, useEffect } from 'react';
import {recentTransactions,dropdownData } from "../../data/dummy";
import { useStateContext} from '../../contexts/ContextProvider';
import Button from '@mui/material/Button';
import axios from 'axios';  
import FaceIcon from '@mui/icons-material/Face';
import Chip from '@mui/material/Chip';




export default function Data1() {
    const { currentColor, currentMode } = useStateContext();

    const [patients, setPatients] = useState([]);
    const [labReportData, setlabReport] = useState([]);
    
    useEffect(() => {
        loadLabReport();
      if ("user" in localStorage) {  
        axios.get("http://localhost:8080/api/v1/patients").then(response => {
        const doctorPatient = response.data.filter(patient => patient.doc_id ==JSON.parse(localStorage.getItem("user")).userId);
        setPatients(doctorPatient);
        
       
      })
      }
    },[]);
    const loadLabReport = async () => {
        const result = await axios
            .get(`http://localhost:8080/api/v1/labReport`)
            .then((res) => {
                setlabReport(res.data);
            });
    };
    const handleOpenPdf = (pid) => {

        //e.preventDefault();

        const filteredReports = labReportData.filter(
            (report) => report.patient_id == pid
        );

        const pdfBinaryData = filteredReports[0]?.labReport_Id;
        const pdfBinaryDatacontent = filteredReports[0]?.fileName;
        const url = `http://localhost:8080/api/v1/labReport/download/${pdfBinaryData}`;

        window.open(url, "_blank");
    }
    
    const  revpatients = patients.slice(patients.length-5,patients.length).reverse().filter((row)=>row.isRequestTest==1);
    const lenghtPatient = revpatients.length;
    
  return (
    <div>
        <div className="border shadow p-5 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
          <div className="flex justify-between items-center gap-2">
            <p className="text-xl font-semibold">Test Result Waiting Patients</p>
        
          </div>
          <div className="mt-10 w-72 md:w-400">
            {revpatients.map((item) => (
              <div key={item.patientName} className="flex justify-between mt-4">
                <div className="flex gap-3">
                
                    <Chip className="border shadow p-5" sx={{height:"50px"}}  label= {`PID: ${item.patientId}`} />
                  
                  <div>
                    <p className="text-md font-semibold">{item.patientName}</p>
                    <p className="text-sm text-green-600">{item.patientName}</p>
                  </div>
                </div>



               <div style={{width:'25%'}}>
                  {item?.isSubmitReport ?
                  <Button onClick={() =>handleOpenPdf(item?.patientId)} variant="contained">Check Result</Button> :
                  <Button disabled onClick={() =>handleOpenPdf(item?.patientId)} variant="contained">Pending Result</Button>

                  }
               </div>
              </div>
              
            ))}
          </div>
          <div className="flex justify-between items-center mt-5 border-t-1 border-color">
            

            <p className="text-gray-400 text-sm">{lenghtPatient} Test result Waiting Patients</p>
          </div>
        </div>
    </div>
  )
}
