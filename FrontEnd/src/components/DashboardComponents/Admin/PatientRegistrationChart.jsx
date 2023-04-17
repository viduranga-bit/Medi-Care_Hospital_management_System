import React, { useEffect, useState } from "react";
import axios from "axios";
import { dropdownData } from "../../../data/dummy";
import { useStateContext } from "../../../contexts/ContextProvider";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";


export default function PatientRegistrationChart() {
  const [patientCount, setPatientCount] = useState([]);

  const loadChartData = async () => {
    const result = axios
      .get("http://localhost:8080/api/v1/patients/count-by-registration-date")
      .then((res) => {
        setPatientCount(res.data);
      });
  };

  const { currentColor, currentMode } = useStateContext();

  useEffect(() => {
    loadChartData();
  }, []);

  console.log(patientCount);

  const formattedData = patientCount.map(([date, count]) => ({
    date: date
      ? new Date(date)
          .toLocaleDateString("en-US", { month: "numeric", day: "numeric" })
          .split("/")
          .join("/")
      : "",
    count: count,
  }));
  const lastWeekData = formattedData.slice(
    formattedData.length - 7,
    formattedData.length
  );
  console.log(lastWeekData);
  return (
    <div>
      <div className=" shadow p-5 border bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl w-96 md:w-800">
        <div className="flex justify-between items-center gap-2 mb-10">
          <p className="text-xl font-semibold">
            {" "}
            Patient's Registration Overview
          </p>
        
        </div>
        <div className="md:w-full overflow-auto">
          <BarChart
            width={710}
            height={300}
            data={lastWeekData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <defs>
              <linearGradient
                id="colorUv"
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                spreadMethod="reflect"
              >
                <stop offset="0" stopColor="#36EC63" />
                <stop offset="1" stopColor={currentColor} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis
              dataKey="date"
              label={{
                value: "Date",
                position: "insideBottomRight",
                offset: -20,
              }}
            />
            <YAxis
              dataKey="count"
              label={{
                value: "Number Of Patients",
                angle: -90,
                position: "insideLeft",
                offset: 10,
              }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" barSize={55} fill="url(#colorUv)" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
