import React, { useEffect, useState } from "react";
import axios from "axios";
import { ecomPieChartData } from "../../data/dummy";
import { Pie } from "../../components";
export default function PieChart() {
  const [patientCount, setPatientCount] = useState([]);

  const loadChartData = async () => {
    const result = axios
      .get("http://localhost:8080/api/v1/patients")
      .then((res) => {
        setPatientCount(res.data);
      });
  };



  useEffect(() => {
    loadChartData();
  }, []);


const inPatient = patientCount.filter(
  (report) => report.patientType == "INPATIENT"
).length;

const outPatient = patientCount.filter(
  (report) => report.patientType == "OUTPATIENT"
).length;


const inPatientPresentage =
  Math.round((inPatient / (inPatient + outPatient)) * 100);

  const OutPatientPresentage = Math.round(
    (outPatient / (inPatient + outPatient)) * 100
  );


  const ecomPieChartData = [
    {
      x: "InPatients",
      y: inPatientPresentage,
      text: `${inPatientPresentage}%`,
    },
    {
      x: "OutPatients",
      y: OutPatientPresentage,
      text: `${OutPatientPresentage}%`,
    },
  ];

  return (
    <div>
      <div className="shadow border bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 ml-3 justify-center items-center gap-10">
        <p className="text-xl font-semibold">
          {" "}
          InPatient/OutPatients Overview
        </p>
        <div className="w-60 ml-12">
          <Pie
            id="pie-chart"
            data={ecomPieChartData}
            legendVisiblity={false}
            height="320px"
          />
        </div>
      </div>
    </div>
  );
}
