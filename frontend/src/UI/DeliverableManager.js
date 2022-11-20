import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DeliverableSpecs from '../components/Deliverable/DeliverableSpecs';
import styles from "./DeliverableManager.module.css";
import fetch from "../utils/fetch";
import Header from "../components/Header/Header.js"
import AddDeliverableForm from '../components/Deliverable/AddDeliverableForm';
import API from '../API/API';
const DeliverableManager = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingMessage, setLoadingMessage] = useState("Loading ...");
  let displaysuccess = "styles.default";
  
  const apiCall = async (endpoint) =>{
    const response = await API.get("/deliverables");
    response.isSuccess
      ? setData(response.result)
      : setLoadingMessage(response.message)
  }
  const getCategories = async (endpoint) =>{
    const response = await API.get("/deliverables/categories");
    response.isSuccess
      ? setCategories(response.result)
      : setLoadingMessage(response.message)
  }

  
useEffect(()=>{
  apiCall() 
  getCategories()
}, [])
const deliverables = data.map((deliverable)=><DeliverableSpecs key={deliverable.DeliverableID} removeId="1" title={deliverable.DeliverableTitle} details={deliverable.DeliverableDetail} category={deliverable.CategoryName} />);
const handleSubmit = async (deliverable)=>{
  const response = await API.post("/deliverables" , deliverable);
  if (response.isSuccess){ displaysuccess = "styles.success" };
  return response.isSuccess
  ? apiCall() || true 
  : false;
}
  return (
    <div>
     <Header />
     <Link to='/admin'>Admin Panel</Link>
  
    <div className={styles.deliverablesManagerDiv}>
 

        <div className={styles.formDiv}>
            <AddDeliverableForm categories={categories} onSubmit={handleSubmit}/>
        </div>
        <div className={styles.deliverablesDiv}>
        <h2>All Deliverables</h2>
        {data.length>0? deliverables: loadingMessage}
        </div>
    </div>
    </div>
  )
}

export default DeliverableManager