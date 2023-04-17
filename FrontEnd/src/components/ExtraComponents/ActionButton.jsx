import * as React from 'react';
import Chip from '@mui/material/Chip';


 function ActionButton(props) {

    
  return (

      

    <Chip label={props.data.name} color={props.data.color} />
    
    
    
      
  );

}
export default ActionButton;