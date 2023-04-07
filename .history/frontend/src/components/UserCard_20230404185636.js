import React from 'react'
import './UserCard.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const UserCard = ({ firstName, lastName, email }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="user-icon">
          <AccountCircleIcon fontSize='24'/>
        </div>
        <div className="user-details">
          <h2>{firstName} {lastName}</h2>
          <p>{email}</p>
        </div>
      </div>
    </div>
  )
}

export default UserCard