import React from 'react'
import './UserCard.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const UserCard = ({ firstName, lastName, email, icon }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="user-icon">
          <img src={AccountCircleIcon} alt="user icon" />
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