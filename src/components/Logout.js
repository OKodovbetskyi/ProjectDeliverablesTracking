import React from 'react'
import styles from './Logout.modules.css';
export const Logout = () => {
  return (
    <div className={styles.logout}>
    <p>Welcome, user user_id</p>
    <a href='/'> Log Out</a>
    </div>
  )
}
export default Logout;
