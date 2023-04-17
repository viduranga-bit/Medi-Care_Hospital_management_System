import React from 'react';
import { Header } from '../../../components';


import RegisterPatient from './RegisterPatient';

const RegisterPatientSection = () => {
  
  return (
    <div className="border shadow p-5 md:m-12 md:mt-4 md:p-10 bg-white rounded-3xl">
      <Header title="Register New Patient"/>
       <RegisterPatient/>
    </div>
  );
};
export default RegisterPatientSection;