import React from 'react'
import { useParams } from 'react-router-dom'
const DeliverableAssign = () => {
 const {userID}= useParams();
 
  return (
    <div>
        <h4>User KNumber {userID}</h4>
    </div>
  )
}

export default DeliverableAssign