import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import  CircularProgress  from "../ExtraComponents/CircularProgress";




export default function LastComponent() {
  const { currentColor, currentMode } = useStateContext();
  const [patientCount, setPatientCount] = useState([]);
  const [resID, setresID] = useState();

  useEffect(() => {
    if ("user" in localStorage) {
      setresID(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  const recepID = resID?.userId;
  // console.log(recepID);

  const loadChartData = async () => {
    const result = axios
      .get("http://localhost:8080/api/v1/patients/count-by-receptionist")
      .then((res) => {
        setPatientCount(res.data);
      });
  };

  useEffect(() => {
    loadChartData();
  
  }, []);


  const formattedData = patientCount.map(([res_id, count]) => ({
    res_id: res_id,
    count: count,
  }));

  const TodayDatabyRec = formattedData.filter(
    (TodayDatabyRec) => TodayDatabyRec.res_id == recepID
  );

  const TodayDatabyRecVal = TodayDatabyRec[TodayDatabyRec.length - 1];
 
  console.log(TodayDatabyRecVal?.count);
  return (
    <div>
      <div className="border shadow w-400 bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl p-6  ml-6">
        <div className="flex justify-between">
          <p className="text-xl font-semibold">Today's Registration</p>
        </div>
        <div className="mt-10">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress
              color="#14fc65"
              size={200}
              progress={TodayDatabyRecVal?.count}
              value1="Patients"
              value2="Registered"
              value3="Upto now"
            />
          </div>
          <div>
            <p style={{ display: "flex", justifyContent: "center" }}>
              <lottie-player
                src="https://assets1.lottiefiles.com/packages/lf20_laGIqKVpcD.json"
                background="transparent"
                speed="1"
                style={{ width: "160px", height: "160px" }}
                loop
                autoplay
              ></lottie-player>
            </p>
            <p
              style={{ display: "flex", justifyContent: "center" }}
              className="mt-1 font-semibold text-lg"
            >
              Congratulations !!
            </p>
            <p style={{ display: "flex", justifyContent: "center" }}>
              You have Registered {TodayDatabyRecVal?.count} Patients Upto Now.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
