import React from 'react'
import styles from './DeliverableSpecs.module.css'
const DeliverableSpecs = (props) => {
  
const displayRemove = ()=>{
    if (props.removeId !== undefined){
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
    <h3 className={styles.title}>Title: {props.title}</h3>  <div className={styles.category}>{props.category}</div>
  </div>
  <p className={styles.details}>Details:{props.details}</p>
  {displayRemove()}
  </div>
  )
}

export default DeliverableSpecs