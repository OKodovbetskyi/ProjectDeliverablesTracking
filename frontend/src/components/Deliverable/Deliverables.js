import React, { useEffect, useState } from 'react'
import DeliverableItem from './DeliverableItem'
import styles from './Deliverables.module.css';
import request from '../../utils/Request';

export const Deliverables = () => {
   const [data, setData] = useState([]);
    useEffect(()=>{
        request(setData , 11)
    }, [])
    console.log(data)
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
