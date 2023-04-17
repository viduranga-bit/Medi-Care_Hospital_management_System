import React from 'react';
import { Header } from '../../../components';
import NewAppointmentTable from './NewAppointmentTable';

const AppointmentSection = () => {
  
  return (
    <div className="shadow-lg p-3 border md:m-12 md:mt-4 md:p-10 bg-white rounded-3xl">
      <Header title="All Appointments" />
      <NewAppointmentTable />
    </div>
  );
};
export default AppointmentSection;