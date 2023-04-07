import React from 'react'
import './UserCard.css';
import { Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
const UserCard = ({ firstName, lastName, email }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="user-icon">
          <AccountCircleIcon fontSize="large"/>
        </div>
        <div className="user-details">
          <h2>{firstName} {lastName}</h2>
          <p>{email}</p>
        </div>
        <div>
        <Button variant="contained" endIcon={<AddIcon />}>
        Send
        </Button>
        </div>
      </div>
    </div>
  )
}

export default UserCard