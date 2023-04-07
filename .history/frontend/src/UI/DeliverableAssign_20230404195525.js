import React from 'react'
import { Link, useParams } from 'react-router-dom'
const DeliverableAssign = () => {
 const {userID}= useParams();
 
  return (
    <div>
        <Link to='/admin/'
        <h4>KNumber {userID}</h4>
        <h4>Name: </h4>
        <h4>User Deliverables</h4>
    </div>
  )
}

export default DeliverableAssign