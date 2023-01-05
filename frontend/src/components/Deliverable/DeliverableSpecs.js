import React from 'react'
import Panel from '../Panel'
import ToolTipDecorator from '../ToolTipDecorator'
import { ActionTray, ActionAdd } from '../Actions.js'
import AddDeliverableForm from './DeliverablesForm'
import styles from './DeliverableSpecs.module.css'
import useLoad from '../../API/useLoad'
const initstate ={ DeliverableTitle: "Deliveasdas",
DeliverableDetail: "aaas",
DeliverableCategoryID: "",}
const DeliverableSpecs = ({deliverable}) => {
const displayRemove = ()=>{
    if (deliverable.DeliverableID !== undefined){
        return (
            <button> Remove </button>
        )
    } else{
       
        return("");
    }
}
  return (
   <div className={styles.leftColumn}>
<div>
<h3 className={styles.title}>Title: {deliverable.DeliverableTitle}</h3>  
<div className={styles.category}>{deliverable.CategoryName}</div>
</div>
<p className={styles.details}>Details:{deliverable.DeliverableDetail}</p>
{displayRemove()}
</div>  
   
  )
}

export default DeliverableSpecs



