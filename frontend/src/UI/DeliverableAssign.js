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
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '@mui/material/Button';

const object = {
  AssignmentDevDevID: 0,
  AssignmentDevUserID: 0,
  AssignmentDevDuedate: '',
  AssignmentDevStatus: 'Not Completed'
}

const DeliverableAssign = () => {
  //Hooks
  const [record, SetRecord] = useState(object)
  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = useState()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {userID}= useParams();
  const [profID, setProfID]= useState();
  const state = useSelector(state =>state.DevOptions)
  console.log(state)
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
    SetRecord({...record, AssignmentDevDevID: ID, AssignmentDevUserID: userID})
    if (record.AssignmentDevDuedate===""){
      handleOpen();
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
    setFilteredDevs([...DELIVERABLES])
  }
}

const handleModalSelect = async() =>{
 SetRecord({...record, AssignmentDevDuedate: selectedDate});
  const response = await API.post(`/deliverables/student/` , record);
  console.log(response);
    if (response.isSuccess){
      loadUsersDevs(`/deliverables/student/${userID}`);
      SetRecord({  AssignmentDevDevID: 0,
        AssignmentDevUserID: 0,
        AssignmentDevDuedate: '',
        AssignmentDevStatus: 'Not Completed'})
            }else{
               return false;
}
  handleClose();
}
console.log(record)
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
        <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description">
        <div className='model-container'>
        <h3>Please provide additional information</h3>
        <p>Please select the <b>deadline</b> for this deliverable</p>
        <DateTimePicker   
        className='DatePicker'
        onChange={(newValue) => SetRecord({...record, AssignmentDevDuedate:new Date(newValue).toISOString().slice(0, 19).replace('T', ' ')})}
        defaultValue={dayjs('2022-04-17')} />
        <div className='status-container'>
        <label className='status-label'>Status: </label>
        <select name="status" id="status">
            <option value='Not Completed'>Not Completed</option>
             <option value="In progress">In progress</option>
             <option value="stuck">Stuck</option>
            </select>
        </div>
          <div>
          <Button onClick={handleModalSelect} variant="contained" color='success'>
            Select
          </Button>
          </div>
        </div>
        
      </Modal>
        <Footer />
    </div>
  )
}
export default DeliverableAssign;