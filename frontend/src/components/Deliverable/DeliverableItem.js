import React from 'react'
import styles from './DeliverablesItem.module.css'
import { DeliverableSpecs } from '../Card';
export const DeliverableItem = ({type,deliverable}) => {
 console.log(deliverable, "from item");
    const feedback = deliverable.AssignmentDevFeedback !== 'none' ? deliverable.AssignmentDevFeedback: 'No feedback provided';
  return (
    <div className={styles.DeliverableItem}>
        <DeliverableSpecs deliverable={deliverable}/>
        <div className={styles.rightColumn}>
        <p className={styles.dueDate}>Due Date:{deliverable.AssignmentDevDuedate}</p>
        <div className={styles.status}>
        <label >Status: </label>
        <select name="status" id="status">
             <option value={deliverable.AssignmentDevStatus}>{deliverable.AssignmentDevStatus}</option>
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
