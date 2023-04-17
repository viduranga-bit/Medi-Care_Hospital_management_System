import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import UsersCounts from '../components/DashboardComponents/UsersCounts';
import PieChart from '../components/DashboardComponents/PieChart';
import Data1 from '../components/DashboardComponents/Data1';
import Overview from '../components/DashboardComponents/Overview';
import LastComponent from "../components/DashboardComponents/LastComponent";
import Appointment from "../components/DashboardComponents/Doctor/Appointment";
import TreatedPatient from "../components/DashboardComponents/Doctor/TreatedPatient";
import TestSection from "../components/DashboardComponents/Laborotarist/TestSection";
import { HashLoader } from "react-spinners";
import ReportSubmissionOverview from "../components/DashboardComponents/Laborotarist/ReportSubmissionOverview";
import PharmacistListSection from "../components/DashboardComponents/Pharmacist/PharmacistListSection"
import MedicineIssueOverview from "../components/DashboardComponents/Pharmacist/MedicineIssueOverview";
import PatientRegistrationChart from "../components/DashboardComponents/Admin/PatientRegistrationChart";


const Dashboard = () => {
  const { currentColor, currentMode } = useStateContext();
 


  const [roleName, setRoleName] = useState();
  const getRole = JSON.parse(localStorage.getItem('user'));



  useEffect(()=>{
    setRoleName(getRole);
   
  },[])

  


  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {roleName?.role ? (
        <div className="mt-13">
          <UsersCounts />

          <div>
            {roleName?.role == "ADMIN" ? (
              <div className="flex gap-1 m-2 flex-wrap justify-center">
                {" "}
                <PatientRegistrationChart />
                <PieChart />
              </div>
            ) : (
              ""
            )}

            {/* {roleName?.role == "ADMIN" ? <EarningChart /> : ""} */}
          </div>

          {roleName?.role == "DOCTOR" ? (
            <div className="flex gap-10 m-4 flex-wrap justify-center">
              {" "}
              <Appointment /> <Data1 />
            </div>
          ) : (
            ""
          )}

          {roleName?.role == "DOCTOR" ? (
            <div className="flex gap-10 m-4 flex-wrap justify-center">
              <TreatedPatient />
              <Overview />
            </div>
          ) : (
            ""
          )}

          {roleName?.role == "LABORARIST" ? (
            <div className="flex  m-4 flex-wrap justify-center">
              <TestSection />
              <ReportSubmissionOverview />
            </div>
          ) : (
            ""
          )}

          {roleName?.role == "RECIEPTIONIST" ? (
            <div className="flex m-3 flex-wrap justify-center">
              <Overview />
              <LastComponent />
            </div>
          ) : (
            ""
          )}

          {roleName?.role == "PHARMACIST" ? (
            <div className="flex m-3 flex-wrap justify-center">
              <PharmacistListSection />
              <MedicineIssueOverview />
            </div>
          ) : (
            ""
          )}

        
        </div>
      ) : (
        <p className="flex gap-10 m-4 flex-wrap justify-center">
          <HashLoader color={currentColor} />
        </p>
      )}
    </>
  );
};

export default Dashboard;
