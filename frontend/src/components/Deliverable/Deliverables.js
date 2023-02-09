import React from 'react'
import DeliverableItem from './DeliverableItem'
import styles from './Deliverables.module.css';
import useLoad from '../../API/useLoad';
export const Deliverables = () => {
const [DELIVERABLES_DATA, , message,]= useLoad('/deliverables/student/11');


const deliverableitems = DELIVERABLES_DATA.map((item) => {
  console.log(item, "from devitem")
  return(
    
    <DeliverableItem deliverable={item} key={item.AssignmentID} title={item.DeliverableTitle} details={item.DeliverableDetail} dueDate={item.AssignmentDevDuedate} feedback={item.AssignmentDevFeedback} status={item.AssignmentDevStatus} category={item.CategoryName}/>
   
  )
 }) 
  return (
    <div className={styles.Deliverables}>
      {deliverableitems.length>0? deliverableitems : message}
    </div>
 
  )
}
