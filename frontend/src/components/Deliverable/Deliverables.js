import React, { useEffect, useState } from 'react'
import DeliverableItem from './DeliverableItem'
import styles from './Deliverables.module.css';
import request from '../../utils/fetch';

export const Deliverables = () => {
   const [data, setData] = useState([]);
    useEffect(()=>{
        request(setData ,`http://localhost:3000/api/student/deliverables/11`);
    }, [])

 const deliverableitems = data.map((item) => {
    return(
    <DeliverableItem key={item.AssignmentID} title={item.DeliverableTitle} details={item.DeliverableDetail} dueDate={item.AssignmentDevDuedate} feedback={item.AssignmentDevFeedback} status={item.AssignmentDevStatus} category={item.CategoryName}/>
    )
 }) 
  return (
    <div className={styles.Deliverables}>
      {deliverableitems}
    </div>
 
  )
}
