import React, {useState} from 'react'
import './UserCard.css';
import { Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
const UserCard = ({ firstName, lastName, email }) => {
    const [selected, setSelected] = useState(false);
    const handleSelect = () =>{setSelected(prev=>!prev)};
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
        <Link to={`choosedeliverables/${2}`} style={{marginTop:'10px'}} variant="contained" endIcon={<BorderColorIcon />}>
        Assign Deliverables
        </Link>
      
        </div>
      </div>
    </div>
  )
}

export default UserCard