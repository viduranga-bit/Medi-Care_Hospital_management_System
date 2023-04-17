import React from "react";
import "./CircularProgress.css";

const CircularProgress = ({ color, size, progress,value1,value2,value3}) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg className="circular-progress" width={size} height={size}>
      <circle
        className="background"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
      />
      <circle
        className="progress"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        stroke={color}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
      />
      <text className="percentage" x="50%" y="30%">
        {progress}
      </text>

      <text className="textVal" x="50%" y="50%">
        {value1}
      </text>

      <text className="textVal" x="50%" y="60%">
        {value2}
      </text>
      <text className="textVal" x="50%" y="70%">
        {value3}
      </text>
    </svg>
  );
};

export default CircularProgress;
