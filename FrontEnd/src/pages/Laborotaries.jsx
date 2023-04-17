import React from 'react';
import { Header } from '../components';
import LaborotariesTab from '../components/Tabs/LaborotariesTab';


const Laborotaries = () => {
  const toolbarOptions = ['Search'];

  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header  title="Manage Laboratorists  " />
       <LaborotariesTab/>
    </div>
  );
};
export default Laborotaries;
