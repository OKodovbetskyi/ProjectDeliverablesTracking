import React from 'react'
import styles from './DeliverablesItem.module.css'
export const DeliverableItem = (props) => {
    const feedback = props.feedback !== 'none' ? props.feedback: 'No feedback provided';
  return (
    <div className={styles.DeliverableItem}>
        <div className={styles.leftColumn}>
          <div>
          <h3 className={styles.title}>Title: {props.title}</h3>  <div className={styles.category}>{props.category}</div>
        </div>
        <p className={styles.details}>Details:{props.details}</p>
        </div>
        <div className={styles.rightColumn}>
        <p className={styles.dueDate}>Due Date:{props.dueDate}</p>
        <div className={styles.status}>
        <label >Status: </label>
        <select name="status" id="status" form="carform">
             <option value={props.status}>{props.status}</option>
             <option value="In progress">In progress</option>
             <option value="stuck">Stuck</option>
            </select>
        </div>
        </div>
       <div className={styles.feedback}>
       <p>Feedback:  {feedback}</p>
       <button>Submit</button>
       </div>
        
       
    </div>
  )
}
export default DeliverableItem;
