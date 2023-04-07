import React from 'react'
import { Link } from 'react-router-dom';
import styles from './LoginForm.module.css';
import Header from '../Header/Header';

const LoginForm = (props) => {
  return (
    <div>
    <Header userType={null}/>
    <form className={styles.LoginForm}>
        <label htmlFor='username'>Username</label>
        <input type='text' placeholder='Please enter your k-number' />
        <label htmlFor='password'>password</label>
        <input type='password' placeholder='Please enter your password' />
        <a href='#'>Forgotten password?</a>
        <Link to='/home' className={styles.btnSubmit}> Log in </Link>
    </form>
    </div>
  )
}

export default LoginForm;