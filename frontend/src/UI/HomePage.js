import React from 'react'
import { Deliverables } from '../components/Deliverable/Deliverables'
import Logout from '../components/Header/Header'
import styles from './HomePage.module.css'
import Footer from '../components/Footer'
function HomePage() {
  return (<>
    <div className={styles.HomePage}>
        <Logout />
        <h2>Upcoming Deliverables</h2>
        <Deliverables />
    </div>
           <Footer />
           </>
  )
}

export default HomePage