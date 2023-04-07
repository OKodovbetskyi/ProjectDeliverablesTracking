import React from 'react'
import './Header.css';
import { Link } from 'react-router-dom';
import headerLogo from '../../assets/logo-no-background.png';
export const Header = ({userType}) => {
  const urls=["/admin", "/admin/profiles"]
  return (
    <div className="headerWrapper">
      <div className="logo" >
      <img className="logo-img" src={headerLogo} alt="logo" />
      </div>
      <div className="navigation">
     
      {userType==="admin" &&  
      <Link to={urls[0]}>Admin Panel</Link>}
      {userType==="admin" &&  
      <Link to={urls[1]}>Profiles</Link>}
       {userType===null && <> 
      <Link to={urls[1]}>Register</Link>
      <Link to={urls[1]}>Login</Link>}</>}

      <Link to='/'> Log Out</Link>
      </div>
    
    </div>
  )
}
export default Header;
