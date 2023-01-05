import React, {useState} from 'react'
import styles from "./FormItem.module.css";
export default function Form({children, onSubmit}){
  const handleSubmit = () => onSubmit();
  return(
    <form>
      <div className='FormTray'>
    {children}
      </div>
    </form>
  )
}
const Item = ({children, label, htmlFor, advice, error}) => {

  return (<div>
    <label htmlFor={htmlFor}>{label}</label>
    {advice && <p className={styles.error}>{advice}</p>}
    {children}
    {error && <p>{error}</p>}
    </div>
  )
}
function useForm(initialRecord, conformance, onSubmit, {isValid, errorMessage}) {
  const [record, setRecord] = useState(initialRecord);
  const [errors, setErrors] = useState(
  Object.keys(initialRecord).reduce((accum, key)=>({...accum, [key]: null}),{})
);
////////////////////////////////////////////
const isValidRecord = (deliverable) =>{
  let isRecordValid  =true;
  Object.keys(record).forEach((key)=>{
    if (isValid[key](record[key])){
      errors[key] = null;
    } else {
      errors[key] = errorMessage[key];
      console.log(record)
      isRecordValid = false;
    }
  })
  return isRecordValid;
}
//////////////////////////////////////////////
const handleSubmit = (e) =>{
 
  e.preventDefault();
  isValidRecord(record) && onSubmit(record)
  console.log(isValidRecord(record))
  setErrors({...errors})
}
///////////////////////////////////////////////
const handleChange = (e) =>{
  const {name , value} = e.target;
  const newValue = conformance.includes(name) ? parseInt(value) : value;
  setRecord({
    ...record, [name]: newValue}
  )
  setErrors({
    ...errors, [name]: isValid[name](newValue) ? null : errorMessage[name]
  })
}
//////////////////////////////////////////////
  return[record, errors, handleChange,handleSubmit]
}

Form.Item = Item;
Form.useForm = useForm;


