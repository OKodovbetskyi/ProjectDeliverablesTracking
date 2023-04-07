import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button } from '@mui/material'
import "./Card.css"
import { Navigate, useNavigate } from 'react-router-dom';
import DeliverableItem from './Deliverable/DeliverableItem';
const Card = ({id, name, description}) => {
const navigate = useNavigate();
  const routeChange = (url, id) =>{
   
  }
  return (
    <div className='Card-Wrapper'>
    <p>{name}</p>
    <p>{description}</p>
    <div className='ButtonsHolder'>
    <Button onClick={()=> navigate("/admin/profilesbuilder", {state:{id: id}})} className='Button-Card' color="success" variant="outlined" endIcon={<EditIcon />}>
    Edit
    </Button>
    </div>
   </div>
  )
}



const DeliverableCard = ({deliverable,clickHandler, assigned}) => {
 
  return (
    <div className="deliverableCard-container" draggable="true" onClick={()=>clickHandler(deliverable)}>
      <p>{deliverable.DeliverableTitle}</p>
      <p>{deliverable.CategoryName}</p>
      {
        assigned && <B
      }
    </div>
  )
}


export default Card
Card.DeliverableCard = DeliverableCard;