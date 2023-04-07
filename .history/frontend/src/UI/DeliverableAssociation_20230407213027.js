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
  const matchByLetterSequence =(stringsToSearch, searchLetters) =>{
    const matches = [];
    let bestScore = 0;
    for (let i = 0; i < stringsToSearch.length; i++) {
      const string = stringsToSearch[i].toLowerCase();
      let score = 0;
      let idx = 0;
      for (let j = 0; j < searchLetters.length; j++) {
        const letter = searchLetters[j].toLowerCase();
        const nextIdx = string.indexOf(letter, idx);
        if (nextIdx === -1) {
          score = 0;
          break;
        }
        score += nextIdx - idx + 1;
        idx = nextIdx + 1;
      }
      if (score > 0) {
        if (score > bestScore) {
          bestScore = score;
          matches.length = 0;
        }
        if (score === bestScore) {
          matches.push(stringsToSearch[i]);
        }
      }
    }
    return matches;
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