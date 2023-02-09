
import React from 'react'
import Card from '../Card'
import './ExistingProfiles.css'

const ExistingProfiles = ({PROFILES_DATA}) => {
  
  return (
    <div className='ExistingProfiles'>
        <h3>My Profiles</h3> 
        <div className='Profiles-Container'>
        {PROFILES_DATA.map((profile)=><Card id={profile.ProfileID} name={profile.ProfileName} description={profile.ProfileDetails} />)}
        </div>
       
      
    </div>
  )
}

export default ExistingProfiles