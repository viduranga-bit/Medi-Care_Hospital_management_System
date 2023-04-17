import React,{useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
 
  Doctor,
  Departments,


} from "./pages";
import "./App.css";
import { useStateContext } from "./contexts/ContextProvider";
import Nurse from "./pages/Nurse";
import Pharmacist from "./pages/Pharmacist";
import Laborotaries from "./pages/Laborotaries";
import Recieptionist from "./pages/Recieptionist";
import Login from "./pages/Login/Login";
import Main from "./Main";
import Dashboard  from "./pages/Dashboard";
import RegisterPatientSection from "./components/DashboardComponents/Recieptionist/RegisterPatientSection";
import PrintAdmissionCard from "./components/DashboardComponents/Recieptionist/PrintAdmissionCard";
import Medicine from "./pages/Medicine";
import TreatPatient from "./components/DashboardComponents/Doctor/TreatPatient";
import AppointmentSection from "./components/DashboardComponents/Doctor/ApointmentSection";
import SubmitReport from "./components/DashboardComponents/Laborotarist/SubmitReport";
import IssuedReports from "./components/DashboardComponents/Laborotarist/IssuedLabreportSection";
import IssueMedicine from "./components/DashboardComponents/Pharmacist/IssueMedicine";
import IssuedMedicineSection from "./components/DashboardComponents/Pharmacist/IssuedMedicineSection";
const App = () => {
  const {
    currentMode
  } = useStateContext();

  useEffect(() => {
    console.log("Check loggin******************");
    if ("token" in localStorage) {
      const token = localStorage.getItem("token");
      //token validation
     
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <Routes>
          {/* dashboard  */}
          <Route path="/login" element={<Login />} />
          <Route element={<Main />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/department" element={<Departments />} />
            <Route path="/nurse" element={<Nurse />} />
            <Route path="/pharmacist" element={<Pharmacist />} />
            <Route path="/laboratorist" element={<Laborotaries />} />
            <Route path="/recieptionist" element={<Recieptionist />} />
            <Route path="/medicine" element={<Medicine />} />
            {/*Recieptionist routs*/}
            <Route
              path="/registerPatient"
              element={<RegisterPatientSection />}
            />
            <Route
              path="/printPatientDetails"
              element={<PrintAdmissionCard />}
            />
            {/*Doctor routs*/}
            <Route path="/appointments" element={<AppointmentSection />} />
            <Route path="/treatPatient" element={<TreatPatient />} />
            {/*Laborotarist routs*/}
            <Route path="/submitReport" element={<SubmitReport />} />
            <Route path="/issuedReports" element={<IssuedReports />} />
            {/*Pharmacist routs*/}
            <Route path="/issuedMedicine" element={<IssuedMedicineSection />} />
            <Route path="/issueMedicine" element={<IssueMedicine />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
