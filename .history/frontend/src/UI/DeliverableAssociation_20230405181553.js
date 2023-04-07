import React from 'react'
import Header from '../components/Header/Header'
import UserCard from '../components/UserCard'
import './DeliverableAssociation.css';
import { TextField } from '@mui/material';
import useLoad from '../API/useLoad';
const DeliverableAssociation = () => {
  const [USERSDATA, ,loadingMessageUser, loadUsers] = useLoad('/users');
  console.log(loadingMessageUser);
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
        {
          
        }
        </div>
      
        </main>
    </div>
  )
}

export default DeliverableAssociation