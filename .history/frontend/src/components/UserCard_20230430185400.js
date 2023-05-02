import React, {useState} from 'react'
import './UserCard.css';
import { Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
const UserCard = ({user}) => {
    const [selected, setSelected] = useState(false);
    const handleSelect = () =>{setSelected(prev=>!prev)};
  return (
    <div className="card">
      <div className="card-content">
        <div className="user-icon">
          <AccountCircleIcon fontSize="large"/>
        </div>
        <div className="user-details">
          <h2>{user.UserName} {user.UserSurname}</h2>
          <p>{user.UserKNumber}</p>
        </div>
        <div>
        <Link className="actions-link" to={`choosedeliverables/${user.UserID}`} style={{marginTop:'10px'}} variant="contained" >
        Assign Deliverables
        </Link>
      
        </div>
      </div>
    </div>
  )
}

export default UserCard