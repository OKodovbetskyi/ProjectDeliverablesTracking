import React, { useEffect } from 'react'
import "./ProfilesBuilder.css"
import useLoad from '../API/useLoad';
import Card from '../components/Card';
import { Button } from '@mui/material';
import Header from '../components/Header/Header';
import { useLocation } from 'react-router-dom';
import Form from '../components/Form';
import { TextField} from '@mui/material'
import RenderCount from './RenderCount';
import API from '../API/API';
const initialProfileDetails = {
  ProfileName: "",
  ProfileDetails: "",
}
const ProfilesBuilder = () => {
  const {state} = useLocation();
  const [Profile, ,loadingMessageProf, loadProfile] = useLoad(`/profiles/${state.id}`);

  const endpoint = "/deliverables";
  const profilesEndpoint = `/profiles/deliverables/${state.id}`;
  
  const [DELIVERABLES_DATA, ,loadingMessageDev, loadDeliverables] = useLoad(endpoint);
  const [PROFILE_DATA, ,loadingMessageProfDev, loadProfileDeliverables] = useLoad(profilesEndpoint);
  

  const allowDrop =  (e) => e.preventDefault();
  const clickHandler= async (devID) =>{
    const assingDeliverableToProfileObject = {AssProfDevDevID: devID, AssProfDevProfID: state.id}
    const response = await API.post("/profiles" , assingDeliverableToProfileObject);
    return response.isSuccess
    ? loadProfileDeliverables(profilesEndpoint)
    : console.log("failed submitting deliverable");
  }
  return (
    <div ><Header userType="admin"/>
    <RenderCount />
    <div className='Builder-container'>

      
        <h1>Profiles Builder v1.0</h1>
        <div className='Builder-editor-container'>
        <div className='ProfileDeliverables'>
         <h3>Profile</h3>
       
        {Profile.length >0 
         ? <p>{Profile[0].ProfileDetails}</p> 
       : loadingMessageProf
      }
       <Form className="modifyForm">
            <Form.Item 
              name= "Profile Name"
              htmlFor = "ProfileName"
            >
            <TextField
            className="TextField"
            id="filled-basic" 
            label="Profile Name" 
            variant="filled"
            type='text' 
            name='ProfileName'
            size='small'
            value={Profile.length >0 
              ? Profile[0].ProfileName
            : loadingMessageProf
           }
            />
            </Form.Item>
            <Form.Item 
              htmlFor = "DeliverableDetails"
            >
            <textarea
            className="textFieldDetails"
            id="filled-basic" 
            label="Profile Details" 
            variant="filled"
            type='text' 
            name='ProfileDetail'
            value={Profile.length >0 
              ? Profile[0].ProfileDetails
            : loadingMessageProf
           }>

           </textarea>
          
        </Form.Item>
        </Form>
     
        <div 
         onDragOver={allowDrop}
        className='ProfileDeliverables-deliverables'>
            {PROFILE_DATA.map(dev=>
            <Card.DeliverableCard key={dev.DeliverableID} deliverable={dev} clickHandler={clickHandler}/>)
            }
        </div>
        <Button className='Button-Card' color="success" variant="contained">
            Save
        </Button>
        </div>
        <div className='MyDeliverables'>
            <h3>Deliverables</h3>
            {
              DELIVERABLES_DATA.length > 0 
                ? DELIVERABLES_DATA.filter(item => 
                    !PROFILE_DATA.map((profdevs)=>profdevs.DeliverableID).includes(item.DeliverableID)).map(dev => 
                      <Card.DeliverableCard 
                        key={dev.DeliverableID} 
                        deliverable={dev} 
                        clickHandler={()=>clickHandler(dev.DeliverableID)}
                      />
                  )
                : loadingMessageProfDev 
            }
        </div>
        </div>
    </div>
 
    </div>
   
  )
}

export default ProfilesBuilder

