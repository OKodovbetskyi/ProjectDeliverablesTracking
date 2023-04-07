import React from 'react'
import Header from '../components/Header/Header'
import UserCard from '../components/UserCard'
import './DeliverableAssociation.css';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/material';
import { Button } from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useNavigate } from 'react-router-dom';

const DeliverableAssociation = () => {
    const navigation = useNavigate();
  return (
    <div>
        <Header />
        <main className='association-container'>
        <div className='users-list'>
        <h2>List of students</h2>
        <TextField
            id="standard-basic"
            label="Search Student"
            variant="standard"
            style={{ width: '100%' }}
            />
        <UserCard firstName="Alex" lastName='Kodovbetskyi' email='k205232@kingston.ac.uk' />
        <UserCard firstName="Alex" lastName='Kodovbetskyi' email='k205232@kingston.ac.uk' />
        <UserCard firstName="Alex" lastName='Kodovbetskyi' email='k205232@kingston.ac.uk' />
        <UserCard firstName="Alex" lastName='Kodovbetskyi' email='k205232@kingston.ac.uk' />
        </div>
        <Button onClick={()=>navigation.navigate('assigndeliverablestouser')} style={{marginTop:'10px'}} variant="contained" endIcon={<BorderColorIcon />}>
        Assign Deliverables
        </Button>
        </main>
    </div>
  )
}

export default DeliverableAssociation