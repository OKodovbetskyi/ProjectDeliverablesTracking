import React from 'react'
import Header from '../components/Header/Header'
import UserCard from '../components/UserCard'

const DeliverableAssociation = () => {
  return (
    <div>
        <Header />
        <main>
        <div>
        <h2>List of students</h2>
        <UserCard firstName="Alex" />
        </div>
        <div>
        <h2>Deliverable profiles</h2>
        </div>
        </main>
    </div>
  )
}

export default DeliverableAssociation