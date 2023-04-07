import React from 'react'
import Header from '../components/Header/Header'
import UserCard from '../components/UserCard'
import './DeliverableAssociation.css';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/material';
import { Button } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Link, useNavigate } from 'react-router-dom';

const DeliverableAssociation = () => {
  const [DELIVERABLES_DATA, ,loadingMessageDev, loadDeliverables] = useLoad(endpoint);
    const navigation = useNavigate();
  return (
    <div>
          <Header userType='admin'/>
        <main className='association-container'>
        <div className='users-list'>
        <h2>List of students</h2>
        <TextField
            id="standard-basic"
            label="Search Student"
            variant="standard"
            style={{ width: '100%' }}
            />
        {}
        </div>
      
        </main>
    </div>
  )
}

export default DeliverableAssociation