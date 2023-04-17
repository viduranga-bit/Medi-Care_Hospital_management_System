import React from 'react';

import { Header } from '../components';
import RecieptionistTabs from '../components/Tabs/RecieptionistTabs';

const Recieptionist = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header  title="Manage Recieptionist"/>
       <RecieptionistTabs/>
    </div>
  );
};
export default Recieptionist;