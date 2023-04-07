import React from 'react'
import { useParams } from 'react-router-dom'
const DeliverableAssign = () => {
 const {userID}= useParams();
 
  return (
    <div>{userID}</div>
  )
}

export default DeliverableAssign