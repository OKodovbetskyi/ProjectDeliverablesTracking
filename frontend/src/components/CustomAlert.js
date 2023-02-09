import React, { useState } from 'react';
import "./Message.css";
import { Alert } from '@mui/material';
const CustomAlert = ({feedback=true}) => {

  return (
    feedback === true 
    ?  <Alert severity='success'>The deliverable has been added to the list.</Alert> 
    :<Alert severity='error'>The deliverable has been added to the list.</Alert>
  )

};

export default CustomAlert;