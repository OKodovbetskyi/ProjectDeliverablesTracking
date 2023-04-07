import React from 'react'
import Header from '../components/Header/Header'
import UserCard from '../components/UserCard'
import './DeliverableAssociation.css';
const DeliverableAssociation = () => {
  return (
    <div>
        <Header />
        <main>
        <div className='users-list'>
        <h2>List of students</h2>
        <UserCard firstName="Alex" lastName='Kodovbetskyi' email='k205232@kingston.ac.uk' />
        <UserCard firstName="Alex" lastName='Kodovbetskyi' email='k205232@kingston.ac.uk' />
        <UserCard firstName="Alex" lastName='Kodovbetskyi' email='k205232@kingston.ac.uk' />
        <UserCard firstName="Alex" lastName='Kodovbetskyi' email='k205232@kingston.ac.uk' />
        </div>
        <div>
        <h2>Deliverable profiles</h2>
        </div>
        </main>
    </div>
  )
}

export default DeliverableAssociation