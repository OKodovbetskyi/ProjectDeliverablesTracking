import React from 'react'
import { useParams } from 'react-router-dom'
const DeliverableAssign = () => {
 const {userId}= useParams();
 
  return (
    <div>{userId}</div>
  )
}

export default DeliverableAssign