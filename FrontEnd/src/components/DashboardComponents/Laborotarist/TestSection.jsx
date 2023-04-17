import React from 'react'
import Header from '../../Header'

import NewTestTable from './NewTestTable'

export default function TestSection() {
  return (
    <div>
      <div className="shadow border bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-8 rounded-2xl w-800">
        <Header title="New Test Requests" />
        <NewTestTable />
      </div>
    </div>
  );
}
