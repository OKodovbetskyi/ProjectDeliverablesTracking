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
      const filteredData = matchByLetterSequence(USERSDATA, e.target.value);
      console.log(filteredData)
      if (filteredData.length>0){
        setFiltered([...filteredData]);
      }else {
        setFiltered([...USERSDATA])
      }
  }
  const matchByLetterSequence =(users, searchLetters)=> {
    const matches = [];
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const nameScore = matchScore(user.UserName, searchLetters);
      const surnameScore = matchScore(user.UserSurname, searchLetters);
      const emailScore = matchScore(user.UserKNumber, searchLetters);
      const score = Math.max(nameScore, surnameScore, emailScore);
      if (score > 0) {
        matches.push(user);
      }
    }
    return matches;
  }
  
  function matchScore(string, searchLetters) {
    let score = 0;
    let idx = 0;
    for (let i = 0; i < searchLetters.length; i++) {
      const letter = searchLetters[i].toLowerCase();
      const nextIdx = string.toLowerCase().indexOf(letter, idx);
      if (nextIdx === -1) {
        score = 0;
        break;
      }
      score += nextIdx - idx + 1;
      idx = nextIdx + 1;
    }
    return score;
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