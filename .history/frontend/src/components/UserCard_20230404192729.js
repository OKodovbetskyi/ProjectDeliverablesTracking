import React from 'react'
import './UserCard.css';
import { Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
const UserCard = ({ firstName, lastName, email }) => {
    const [selected, setSelected] = useState(false);
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
            {
                selected ? 
                <Button variant="contained" color='success' endIcon={<DoneIcon />}>
                Selected
                </Button>
                :     
                <Button variant="contained" endIcon={<AddIcon />}>
                Select
                </Button>
            }
      
        </div>
      </div>
    </div>
  )
}

export default UserCard