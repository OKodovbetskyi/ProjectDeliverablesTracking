import React from 'react'
import { Link } from 'react-router-dom'
import DeliverableSpecs from '../components/Deliverable/DeliverableSpecs';
import styles from "./DeliverableManager.module.css";
import Header from "../components/Header/Header.js"
import AddDeliverableForm from '../components/Deliverable/DeliverablesForm';
import API from '../API/API';
import useLoad from '../API/useLoad';
import Panel from '../components/Panel';
import DeliverablePanel from '../components/DeliverablePanel';
const endpoint = "/deliverables"
const categoriesendpoint= "/deliverables/categories";
const DeliverableManager = () => {
  const [DELIVERABLES_DATA, ,loadingMessageDev, loadDeliverables] = useLoad(endpoint);
  const [categories, ,loadingMessageCat, loadCategories] = useLoad(categoriesendpoint);
  let displaysuccess = "styles.default";
const deliverables = DELIVERABLES_DATA.map((deliverable)=><Panel.Container><DeliverablePanel key={deliverable.DeliverableID} deliverable = {deliverable} categories={categories} reloadDeliverables={()=>loadDeliverables('/deliverables')}/></Panel.Container>);
const handleSubmit = async (deliverable)=>{
  const response = await API.post("/deliverables" , deliverable);
  if (response.isSuccess){ displaysuccess = "styles.success" };
  return response.isSuccess
  ? loadDeliverables(endpoint) || true 
  : false;
}
const initialDeliverable = {
  DeliverableTitle:"Please enter title",
  DeliverableDetail:"Please enter details ",
  DeliverableCategoryID:2
}

  return (
    <div>
     <Header />
     <Link to='/admin'>Admin Panel</Link>
  
    <div className={styles.deliverablesManagerDiv}>
 

        <div className={styles.formDiv}>
            <AddDeliverableForm categories={categories} onSubmit={handleSubmit} initialDeliverable={initialDeliverable}/>
        </div>
        <div className={styles.deliverablesDiv}>
        <h2>All Deliverables</h2>
        {DELIVERABLES_DATA.length>0 ? deliverables: loadingMessageDev}
        </div>
    </div>
    </div>
  )
}

export default DeliverableManager