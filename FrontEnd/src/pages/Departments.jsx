import React from 'react';

import { Header } from '../components';
import Tabs from '../components/Tabs/Tabs'

const Departments = () => {
  const toolbarOptions = ['Search'];

  const editing = { allowDeleting: true, allowEditing: true };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header  title="Manage Departments" />
       <Tabs/>
    </div>
  );
};
export default Departments;
