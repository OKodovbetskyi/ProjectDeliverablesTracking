import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DeliverableSpecs from '../components/Deliverable/DeliverableSpecs';
import styles from "./DeliverableManager.module.css";
import Header from "../components/Header/Header.js"
import AddDeliverableForm from '../components/Deliverable/DeliverablesForm';
import API from '../API/API';
import useLoad from '../API/useLoad';
import Panel from '../components/Panel';
import DeliverablePanel from '../components/DeliverablePanel';
import CustomAlert from '../components/CustomAlert';
import Message from '../components/CustomAlert';
const endpoint = "/deliverables"
const categoriesendpoint= "/deliverables/categories";
import { TextField } from '@mui/material';
const DeliverableManager = () => {
  const [DELIVERABLES_DATA, ,loadingMessageDev, loadDeliverables] = useLoad(endpoint);
  const [categories, ,loadingMessageCat, loadCategories] = useLoad(categoriesendpoint);
const [feedback, setFeedBack] = useState(true);
const [message, showMessage] = useState(false);
let displaysuccess = "styles.default";
const reversed = [...DELIVERABLES_DATA].reverse();
const deliverables = reversed.map((deliverable)=><Panel.Container><DeliverablePanel key={deliverable.DeliverableID} deliverable = {deliverable} categories={categories} reloadDeliverables={()=>loadDeliverables('/deliverables')}/></Panel.Container>);

const handleSubmit = async (deliverable)=>{
  console.log('Submitting new Deliverable')
  const response = await API.post("/deliverables" , deliverable);
  if (response.isSuccess){ 
    setFeedBack(true)
   };
  return response.isSuccess
  ? loadDeliverables(endpoint) && showMessage(true)
  : setFeedBack(false) ,showMessage(true) ;
}

setTimeout(()=>{
showMessage(false);
},2000)
const initialDeliverable = {

}
const handleChange = (e) =>{
  const filteredData = matchByLetterSequence(USERSDATA, e.target.value);
  console.log(filteredData)
  if (filteredData.length>0){
    setFiltered([...filteredData]);
  }else {
    setFiltered([...USERSDATA])
  }
}

  return (
    <div>
     <Header userType="admin" />
  <div className={styles.MessageHolder}>{message && <CustomAlert  feedback={feedback}/> }</div>
    <div className={styles.deliverablesManagerDiv}>
        <div className={styles.formDiv}>
            <AddDeliverableForm categories={categories} onSubmit={handleSubmit} initialDeliverable={initialDeliverable}/>
        </div>
        <div className={styles.deliverablesDiv}>
        <h2>All Deliverables</h2>
        <TextField
            id="standard-basic"
            label="Search Student"
            variant="standard"
            style={{ width: '100%' }}
            onChange={handleChange}
            />
        {DELIVERABLES_DATA.length>0 ? deliverables: loadingMessageDev}
        </div>
    </div>
    </div>
 
  )
}

export default DeliverableManager