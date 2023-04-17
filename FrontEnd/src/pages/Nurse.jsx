import React from 'react';

import { Header } from '../components';
import NurseTabs from '../components/Tabs/NurseTabs';

const Nurse = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header  title="Manage Nurse"/>
       <NurseTabs/>
    </div>
  );
};
export default Nurse;
