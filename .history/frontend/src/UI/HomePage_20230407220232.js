import React from 'react'
import { Deliverables } from '../components/Deliverable/Deliverables'
import Logout from '../components/Header/Header'
import styles from './HomePage.module.css'
function HomePage() {
  return (
    <div className={styles.HomePage}>
        <Logout />
        <Deliverables />
    </div>
  )
}

export default HomePage