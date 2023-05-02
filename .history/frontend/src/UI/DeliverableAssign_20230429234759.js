import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header/Header';
import './DeliverableAssociation.css'
import useLoad from '../API/useLoad';
import Panel from '../components/Panel';
import DeliverablePanel from '../components/DeliverablePanel';
import Card from '../components/Card';
import API from '../API/API';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { Box } from '@mui/material';
import { SxProps } from '@mui/system';
import Dropdown from '../components/Dropdown';

const DeliverableAssign = () => {
 const {userID}= useParams();
  const [ProfileDevs, ,loadingMessageProfDevs, loadProfDevs] = useLoad(`/profiles/deliverables/`);
   const [USERSDATA, ,loadingMessageUser, loadUsers] = useLoad(`/users/${userID}`);
   const [DeliverableProfiles, ,loadingDeliverableProfile, loadDeliverableProfile] = useLoad(`/profiles`);
   const [USERSDELIVERABLES, ,loadingMessageUserDecs, loadUsersDevs] = useLoad(`/deliverables/student/${userID}`);
   const [DELIVERABLES, ,loadingMessagedEVS, loadDevs] = useLoad(`/deliverables`);
   const handleAssign = async (ID)=>{
    const object = {
      AssignmentDevDevID: ID,
      AssignmentDevUserID: userID
    }
 
  }
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
   setOpen((prev) => !prev);
 };

  const handleClickAway = () => {
   setOpen(false);
 };
 const styles: SxProps = {
  position: 'absolute',
  top: 28,
  right: 0,
  left: 0,
  zIndex: 1,
  border: '1px solid',
  p: 1,
  bgcolor: 'background.paper',
};
const updateDeliverablesList = (id) =>{
  loadProfDevs(`/profiles/deliverables/${id}`)
  
} 
console.log(ProfileDevs);
  return (
    <div>
        <Header userType='admin'/>
        <div className='deliverables-selection-container'>
        <div className='user-information'>
        <Link to='/admin/associatedeliverable'>Select Another Student</Link>
        {USERSDATA.length>0?<>
         <h4>KNumber {USERSDATA[0].UserKNumber}</h4>
         <h4>Name: {USERSDATA[0].UserName} {USERSDATA[0].UserSurname}</h4>
         <h4>User Deliverables</h4>
         {
              USERSDELIVERABLES.length>0 ?

             USERSDELIVERABLES.map((deliverable)=><Card.DeliverableCard deliverable={deliverable} assigned={true}/>)
              : loadingMessageUserDecs
            }
         </>
         : loadingMessageUser
        }
       
        </div>
        <div className='profiles-information'>
        <h2>Deliverables</h2>
        <Dropdown newItems={DeliverableProfiles}/>{
            DELIVERABLES.filter((item)=>{return ProfileDevs.map(devIds=>devIds.DeliverableID).includes(item.DeliverableID)}).map((deliverable)=><Panel.Container>
              <DeliverablePanel key={deliverable.DeliverableID} deliverable = {deliverable} assign handleAssign={handleAssign}/></Panel.Container>)}
        </div>
        </div>
    </div>
  )
}

export default DeliverableAssign