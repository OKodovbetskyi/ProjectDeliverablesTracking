import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header/Header';
import './AdminPanel.css';
import Draggable from './Draggable';
import Footer from '../components/Footer';
import { FiAirplay, FiPenTool } from "react-icons/fi";
const ManagerPage = () => {
  return (
    <div>
    <Header />
    <h2 className='underline'>Quick Actions</h2>
    <Link to='managedevs'>Manage Deliverables <FiAirplay /></Link>
    <Link to='profiles'>Deliverable Profiles</Link>
    <Link to='associatedeliverable'>Associate Deliverable <FiPenTool /></Link>
    <Footer />
    </div>
    
  )
}

export default ManagerPage