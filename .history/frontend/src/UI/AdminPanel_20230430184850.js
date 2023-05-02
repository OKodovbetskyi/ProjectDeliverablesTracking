import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header/Header';
import './AdminPanel.css';
import Draggable from './Draggable';
import Footer from '../components/Footer';
import { FiAirplay, FiPenTool, FiFolder } from "react-icons/fi";
const ManagerPage = () => {
  return (
    <div>
    <Header />
    <h2 className='underline'>Quick Actions</h2>
    <Link className='actions-link' to='managedevs'>Manage Deliverables <FiAirplay /></Link>
    <Link className='actions-link' to='profiles'>Deliverable Profiles <FiFolder /></Link>
    <Link className='actions-link' to='associatedeliverable'>Associate Deliverable <FiPenTool /></Link>
    <Footer />
    </div>
    
  )
}

export default ManagerPage