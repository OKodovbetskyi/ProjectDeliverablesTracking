import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header/Header';
import './DeliverableAssociation.css'
const DeliverableAssign = () => {
 const {userID}= useParams();
 
  return (
    <div>
        <Header userType='admin'/>
        <div className='deliverables-selection-container'>
        <div className='user-information'>
        <Link to='/admin/associatedeliverable'>Select Another Student</Link>
        <h4>KNumber {userID}</h4>
        <h4>Name: </h4>
        <h4>User Deliverables</h4>
        </div>
        <div className='profiles-information'>
            <h2>Deliverable Profiles</h2>
        </div>
        </div>
    </div>
  )
}

export default DeliverableAssign