import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import UserCard from '../components/UserCard'
import './DeliverableAssociation.css';
import { TextField } from '@mui/material';
import useLoad from '../API/useLoad';
const DeliverableAssociation = () => {
  const [USERSDATA, ,loadingMessageUser, loadUsers] = useLoad('/users');
  const [filtered, setFiltered] = useState([]);
  const handleChange = (e) =>{
      const filteredData = matchByLetterSequence(USERSDATA, e.target.value)
      if (filteredData.length>0){
        setFiltered([...filteredData]);
      }else {
        setFiltered([...USERSDATA])
      }
  }
  const matchByLetterSequence =(searchString, inputSequence) =>{
    return searchString.filter(str => {
      let idx = 0;
      for (let i = 0; i < str.length; i++) {
        if (idx >= inputSequence.length) {
          return true;
        }
        if (str[i] === inputSequence[idx]) {
          idx++;
        }
      }
      return idx >= inputSequence.length;
    });
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
    </div>
  )
}

export default DeliverableAssociation