import React from 'react'
import Header from '../components/Header/Header'
import UserCard from '../components/UserCard'
import './DeliverableAssociation.css';
import Card from '../components/Card';
const DeliverableAssociation = () => {
  return (
    <div>
        <Header />
        <main className='association-container'>
        <div className='users-list'>
        <h2>List of students</h2>
        <UserCard firstName="Alex" lastName='Kodovbetskyi' email='k205232@kingston.ac.uk' />
        <UserCard firstName="Alex" lastName='Kodovbetskyi' email='k205232@kingston.ac.uk' />
        <UserCard firstName="Alex" lastName='Kodovbetskyi' email='k205232@kingston.ac.uk' />
        <UserCard firstName="Alex" lastName='Kodovbetskyi' email='k205232@kingston.ac.uk' />
        </div>
        <div>
        <h2>Deliverable profiles</h2>
        <Card id="1" />
        </div>
        </main>
    </div>
  )
}

export default DeliverableAssociation