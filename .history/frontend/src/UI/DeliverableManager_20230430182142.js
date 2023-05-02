import React, { useEffect, useState } from 'react'
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
import { matchByLetterSequence } from '../utils/matchByLetterSequence';
import { TextField } from '@mui/material';
import Footer from '../components/Footer';
const endpoint = "/deliverables"
const categoriesendpoint= "/deliverables/categories";

const DeliverableManager = () => {
  const [filtered, setFiltered] = useState([]);
  const [DELIVERABLES_DATA, ,loadingMessageDev, loadDeliverables] = useLoad(endpoint);
  const [categories, ,loadingMessageCat, loadCategories] = useLoad(categoriesendpoint);
const [feedback, setFeedBack] = useState(true);
const [message, showMessage] = useState(false);
let displaysuccess = "styles.default";
useEffect(()=>{setFiltered([...DELIVERABLES_DATA])},[DELIVERABLES_DATA])
const reversed = [...filtered].reverse();
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
  const filteredData = matchByLetterSequence(DELIVERABLES_DATA, e.target.value, 'devs');
  console.log(filteredData)
  if (filteredData.length>0){
    setFiltered([...filteredData]);
  }else {
    setFiltered([...DELIVERABLES_DATA])
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
            label="Search Deliverables"
            variant="standard"
            style={{ width: '100%' }}
            onChange={handleChange}
            />
         {filtered.length>0 ? deliverables: loadingMessageDev}
        </div>
    </div>
    <Footer />
    </div>
 
  )
}

export default DeliverableManager