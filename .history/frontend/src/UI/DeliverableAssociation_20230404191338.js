import React from 'react'
import Header from '../components/Header/Header'
import UserCard from '../components/UserCard'
import './DeliverableAssociation.css';
import { TextField } from '@mui/material';
const DeliverableAssociation = () => {
  return (
    <div>
        <Header />
        <main className='association-container'>
        <div className='users-list'>
        <h2>List of students</h2>
        <TextField
      id="standard-basic"
      label="Standard"
      variant="standard"
      className={classes.root}
    />
        <UserCard firstName="Alex" lastName='Kodovbetskyi' email='k205232@kingston.ac.uk' />
        <UserCard firstName="Alex" lastName='Kodovbetskyi' email='k205232@kingston.ac.uk' />
        <UserCard firstName="Alex" lastName='Kodovbetskyi' email='k205232@kingston.ac.uk' />
        <UserCard firstName="Alex" lastName='Kodovbetskyi' email='k205232@kingston.ac.uk' />
        </div>
       
        </main>
    </div>
  )
}

export default DeliverableAssociation