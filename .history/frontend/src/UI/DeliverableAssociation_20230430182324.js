import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import UserCard from '../components/UserCard'
import './DeliverableAssociation.css';
import { TextField } from '@mui/material';
import useLoad from '../API/useLoad';
import { matchByLetterSequence } from '../utils/matchByLetterSequence';
import Footer from '../components/Footer';
const DeliverableAssociation = () => {
  const [USERSDATA, ,loadingMessageUser, loadUsers] = useLoad('/users');
  const [filtered, setFiltered] = useState([]);
  const handleChange = (e) =>{
      const filteredData = matchByLetterSequence(USERSDATA, e.target.value);
      console.log(filteredData)
      if (filteredData.length>0){
        setFiltered([...filteredData]);
      }else {
        setFiltered([...USERSDATA])
      }
  }

  useEffect(()=>{USERSDATA.length>0 && setFiltered([...USERSDATA])},[USERSDATA])
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
            onChange={handleChange}
            />
        {filtered.length>0 ? 
        filtered.map((user)=><UserCard user={user} />)
        : loadingMessageUser
        }
        </div>
      
        </main>
        <Footer />
    </div>
  )
}

export default DeliverableAssociation