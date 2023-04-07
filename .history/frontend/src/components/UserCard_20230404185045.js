import React from 'react'
import './UserCard.css';
import PersonIcon from '@mui/icons-material/Person';
const UserCard = ({ firstName, lastName, email, icon }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="user-icon">
          <img src={PersonIcon} alt="user icon" />
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