import React from 'react'
import styles from "./FormItem.module.css";
const FormItem = ({children, label, htmlFor, advice, error}) => {
  return (<div>
    <label htmlFor={htmlFor}>{label}</label>
    {advice && <p className={styles.error}>{advice}</p>}
    {children}
    {error && <p>{error}</p>}
    </div>
  )
}

export default FormItem