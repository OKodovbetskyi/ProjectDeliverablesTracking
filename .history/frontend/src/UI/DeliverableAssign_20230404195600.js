import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header/Header';
const DeliverableAssign = () => {
 const {userID}= useParams();
 
  return (
    <div>
        <Header />
        <Link to='/admin/associatedeliverable'>Select Another Student</Link>
        <h4>KNumber {userID}</h4>
        <h4>Name: </h4>
        <h4>User Deliverables</h4>
    </div>
  )
}

export default DeliverableAssign