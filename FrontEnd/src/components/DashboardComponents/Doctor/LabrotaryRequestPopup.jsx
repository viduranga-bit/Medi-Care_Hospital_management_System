import React from 'react'
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import LabReportReqForm from '../../Forms/LabReportReqForm';
import { ToastContainer , toast  } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
 

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(3),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 1, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              left: 320,
              top: 1,
              color: (theme) => theme.palette.grey[600],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
export default function LabrotaryRequestPopup(prop) {
   const pid = prop.pid;
   const {open,setOpen,setIsRequestTest} = prop;
  
  const handleClose = () => {
    setOpen(false);
    toast.error("Your request did not send to the laboratory",{position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light"});
  
  };

  return (
    <div>
      
      
    
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Send Labrotary Request
        </BootstrapDialogTitle>
        <DialogContent >
          <LabReportReqForm setIsRequestTest={setIsRequestTest} patID={pid} setOpen={setOpen} open={open} />
        </DialogContent>
        <DialogActions>
          
        </DialogActions>
      </BootstrapDialog>
   <ToastContainer/>
    
    </div>
  )
}
