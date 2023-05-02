import React, { useEffect,useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header/Header';
import './DeliverableAssociation.css'
import useLoad from '../API/useLoad';
import Panel from '../components/Panel';
import DeliverablePanel from '../components/DeliverablePanel';
import Card from '../components/Card';
import API from '../API/API';
import Dropdown from '../components/Dropdown';
import { TextField } from '@mui/material';
import { matchByLetterSequence } from '../utils/matchByLetterSequence';
const DeliverableAssign = () => {
 const {userID}= useParams();
 const [profID, setProfID]= useState();
 const [DeliverableProfiles, ,loadingDeliverableProfiles, loadDeliverableProfiles] = useLoad(`/profiles`);
    const [ProfileDevs,setProfDevs ,loadingProfileDevs, loadProfDevs] = useLoad(`/profiles/deliverables/`);
   const [USERSDATA, ,loadingMessageUser, loadUsers] = useLoad(`/users/${userID}`);
   const [USERSDELIVERABLES, ,loadingMessageUserDecs, loadUsersDevs] = useLoad(`/deliverables/student/${userID}`);
   const [DELIVERABLES, ,loadingMessagedEVS, loadDevs] = useLoad(`/deliverables`);
   const [filteredDevs, setFilteredDevs] = useState([]);
   useEffect(() => {
     const deliverablesInProfile = ProfileDevs.map(devIds => devIds.DeliverableID);
     console.log(deliverablesInProfile);
     if (deliverablesInProfile.length > 0) {
       const filteredDevs = DELIVERABLES.filter(item => deliverablesInProfile.includes(item.DeliverableID));
       setFilteredDevs(filteredDevs.reverse());
     } else if (profID === 0){
      setFilteredDevs(DELIVERABLES.reverse());
     }
     else {
      setFilteredDevs([]);
     }
   }, [ProfileDevs]);
 
   const handleAssign = async (ID)=>{
    const object = {
      AssignmentDevDevID: ID,
      AssignmentDevUserID: userID
    }
    const response = await API.post(`/deliverables/student/` , object);
    console.log(response);
      if (response.isSuccess){
        loadUsersDevs(`/deliverables/student/${userID}`);
              }else{
                 return false;
              }
  }
const updateDeliverablesList = (id) =>{
  setProfDevs([]);
  setProfID(id);
  loadProfDevs(`/profiles/deliverables/${id}`)
}
const handleChange = (e) =>{
  const filteredData = matchByLetterSequence(DELIVERABLES, e.target.value, 'devs');
  console.log(filteredData)
  if (filteredData.length>0){
    setFilteredDevs([...filteredData]);
  }else {
    setFilteredDevs([...DELIVERABLES_DATA])
  }
}

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
        <Dropdown newItems={DeliverableProfiles} listSelect={updateDeliverablesList}/>
        <TextField
            id="standard-basic"
            label="Search Deliverables"
            variant="standard"
            style={{ width: '100%' }}
            onChange={handleChange}
            />
        {
           filteredDevs.length > 0 ? filteredDevs.map((deliverable)=><Panel.Container>
              <DeliverablePanel key={deliverable.DeliverableID}
               deliverable = {deliverable} assign handleAssign={handleAssign}/></Panel.Container>) : <p>No records found</p>}
        </div>
        </div>
    </div>
  )
}
export default DeliverableAssign;