import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import UserCard from '../components/UserCard'
import './DeliverableAssociation.css';
import { TextField } from '@mui/material';
import useLoad from '../API/useLoad';
const DeliverableAssociation = () => {
  const [USERSDATA, ,loadingMessageUser, loadUsers] = useLoad('/users');
  const [filtered, setFiltered] = useState([]);
  const handleChange = (input) =>{

  }
  useEffect(()=>{USERDATA.length>0 && setFiltered([...USERSDATA])})
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
        {filtered.length>0 ? 
        filtered.map((user)=><UserCard user={user} />)
        : loadingMessageUser
        }
        </div>
      
        </main>
    </div>
  )
}

export default DeliverableAssociation