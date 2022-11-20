import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header/Header';
const ManagerPage = () => {
  return (
    <div>ManagerPage
    <Header />
    <Link to='/admin/managedeliverables'>Manage Deliverables</Link>
    </div>
    
  )
}

export default ManagerPage