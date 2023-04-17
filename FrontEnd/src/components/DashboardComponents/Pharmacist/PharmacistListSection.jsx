import React from "react";
import Header from "../../Header";  
import NewRequirementsTable from "./NewRequirementsTable";

export default function TestSection() {
  return (
    <div>
      <div className="shadow border bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-8 rounded-2xl w-800">
        <Header title="New Patients" />
        <NewRequirementsTable />
      </div>
    </div>
  );
}
