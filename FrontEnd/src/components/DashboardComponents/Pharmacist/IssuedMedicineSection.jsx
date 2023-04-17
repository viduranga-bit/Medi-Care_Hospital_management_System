import React from "react";
import Header from "../../Header";

import IssuedMedicineTable from "./IssuedMedicineTable";

export default function IssuedMedicineSection() {
  return (
    <div>
      <div className="shadow-lg p-3 border md:m-12 md:mt-4 md:p-10 bg-white rounded-3xl">
        <Header title="Issued Medicine List" />
        <IssuedMedicineTable />
      </div>
    </div>
  );
}
