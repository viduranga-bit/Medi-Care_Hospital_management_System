import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DoctorTable from '../DoctorTable';
import DoctorForm from '../Forms/DoctorForm ';


export default function DoctorTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Doctor List" value="1" />
            <Tab label="Add Doctors" value="2" />
           
          </TabList>
        </Box>
        <TabPanel value="1">  <DoctorTable/>  </TabPanel>
        <TabPanel value="2"> <DoctorForm changeTabTo={setValue} /> </TabPanel>
        
      </TabContext>
    </Box>
  );
}
