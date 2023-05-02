import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header/Header';
import './AdminPanel.css';
import Draggable from './Draggable';
import Footer from '../components/Footer';
const ManagerPage = () => {
  return (
    <div>
    <Header />
    <h2 className='underline'>Quick Actions</h2>
    <Link to='managedevs'>Manage Deliverables</Link>
    <Link to='profiles'>Deliverable Profiles</Link>
    <Link to='associatedeliverable'>Associate Deliverable</Link>
    <Footer />
    </div>
    
  )
}

export default ManagerPage