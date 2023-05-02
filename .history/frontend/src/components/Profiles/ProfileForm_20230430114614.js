import React from 'react'
import Form from '../Form'
import { TextField,Button } from '@mui/material'
import "./ProfilesForm.css";
const initialProfile = {
  ProfileName: "",
  ProfileDetails: "",

}
const ProfileForm = ({onSubmit}) => {
    const validation = {
        isValid :{
        ProfileName: (title)=> title.length > 2,
        ProfileDetails:  (title)=> title.length > 2,
        
        },
        errorMessage :{
        ProfileName: "Profile name is too short",
        ProfileDetails: "Profile details is too short",
  
      }

    }
    const conformance = "";
    const [profile, errors, handleChange,handleSubmit]=Form.useForm(initialProfile,conformance, onSubmit, validation);
    return (
        <div className="newProfileForm">
            <Form onSubmit={handleSubmit}>
<Form.Item 
  name= "Profile Name"
  htmlFor = "ProfileName"
  className = 'profile-form-item'
>
<TextField
className="TextField"
id="filled-basic" 
label="Profile Name" 
variant="filled"
type='text' 
name='ProfileName'
size='small' 
onChange={handleChange}  
error={errors.ProfileName}
helperText = {errors.ProfileName}
/>

</Form.Item>
<Form.Item 
  htmlFor = "DeliverableDetails"
>
<TextField

className="TextField"
id="filled-basic" 
label="Profile Details" 
variant="filled"
type='text' 
name='ProfileDetails'
size='small'
onChange={handleChange}  
error={errors.ProfileDetails}
helperText = {errors.ProfileDetails}
/>
</Form.Item>



<Button className="Button" onClick={handleSubmit} variant="contained" color="success">Add</Button>
</Form> 
    
</div>
  )
}

export default ProfileForm