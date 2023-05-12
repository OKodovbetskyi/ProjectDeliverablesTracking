import React,{useState} from 'react'
import EditIcon from '@mui/icons-material/Edit';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button } from '@mui/material'
import "./Card.css"
import { Navigate, useNavigate } from 'react-router-dom';
import DeliverableItem from './Deliverable/DeliverableItem';
import styles from './Deliverable/DeliverablesItem.module.css'
const Card = ({id, name, description, type}) => {
const navigate = useNavigate();
  const routeChange = (url, id) =>{
   
  }
  
  return (
    <div className='Card-Wrapper'>
    <p>{name}</p>
    <p>{description}</p>
    <div className='ButtonsHolder'>
    <Button onClick={()=> navigate("/admin/profilesbuilder", {state:{id: id}})} className='Button-Card' color="warning" variant="outlined" endIcon={<EditIcon />}>
    Edit
    </Button>
    </div>
   </div>
  )
}



const DeliverableCard = ({type, deliverable,clickHandler= ()=>{console.log('please assign click handler to card')}, assigned}) => {
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const toggleFeedback = () =>{
    setFeedbackVisible(prevState=> !prevState)
  }
  const deadlineDate = new Date(deliverable.AssignmentDevDuedate);
  const year = deadlineDate.getFullYear();
  const month = (deadlineDate.getMonth() + 1).toString().padStart(2, '0');
  const day = deadlineDate.getDate().toString().padStart(2, '0');
  
  const hours = deadlineDate.getHours().toString().padStart(2, '0');
  const minutes = deadlineDate.getMinutes().toString().padStart(2, '0');
  const seconds = deadlineDate.getSeconds().toString().padStart(2, '0');
  
  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = `${hours}:${minutes}`;
  

  return (
    <div className={styles.DeliverableItem}>
    <DeliverableSpecs deliverable={deliverable}/>
    <div className={styles.rightColumn}>
    <p className={styles.dueDate}><b>Due Date:</b> {formattedDate} <b>Time: </b> {formattedTime}</p>
    <div className={styles.status}>
    <label >Status: </label>
    <select name="status" id="status">
         <option value={deliverable.AssignmentDevStatus}>{deliverable.AssignmentDevStatus}</option>
         <option value="In progress">In progress</option>
         <option value="stuck">Stuck</option>
        </select>
    </div>
    </div>
   {
    type ==="student"
    && <>
      {feedbackVisible ?
      <>
      <p className="FeedBackToggle" onClick={toggleFeedback}><u>Hide Feedback</u></p>
      <div className={styles.feedback}>
      <p className='FeedBackContent'>Feedback: {deliverable.AssignmentDevFeedback !==null ? deliverable.AssignmentDevFeedback : "The supervisor have not provided feedback yet."}</p>
      </div>
      </> 
      :
      <p className="FeedBackToggle" onClick={toggleFeedback}><u>Show Feedback </u></p>}
       <button>Submit</button> 
       </>
   }
</div>
  )
}

export const DeliverableSpecs = ({deliverable}) => {
 /* const displayRemove = ()=>{
      if (deliverable.DeliverableID !== undefined){
          return (
              <button> Remove </button>
          )
      } else{
          return("");
      }
  }*/
    return (
     <div className={styles.leftColumn}>
  <div>
  <h3 className={styles.title}>{deliverable.DeliverableTitle}</h3>  
  <div className={styles.category}>{deliverable.CategoryName}</div>
  </div>
  <p className={styles.details}>Details:{deliverable.DeliverableDetail}</p>
  {/*displayRemove()*/}
  </div>  
    )
  }
  


Card.DeliverableCard = DeliverableCard;
Card.DeliverableSpecs = DeliverableSpecs;
export default Card