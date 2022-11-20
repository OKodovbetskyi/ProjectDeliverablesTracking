import React, { useEffect, useState } from 'react'

import FormItem from '../FormItem';

import styles from './AddDeliverables.module.css';
const emptyDeliverable = {
  DeliverableTitle: "Deliverable Name",
  DeliverableDetail: "Details...",
  DeliverableCategoryID: "",
}
const AddDeliverableForm = ({categories, onSubmit}) => {

    const [deliverable, setDeliverable] = useState(emptyDeliverable);
    const isValid ={
      DeliverableTitle: (title)=> title.length > 10,
      DeliverableDetail: (title)=> title.length > 20,
      DeliverableCategoryID: (title)=> title > 0,
    }
    const errorMessage = {
      DeliverableTitle: 'Deliverables is too short',
      DeliverableDetail: 'Description is too short',
      DeliverableCategoryID: 'Please select Category'

    }
    const [errors, setErrors] = useState(
      Object.keys(emptyDeliverable).reduce((accum, key)=>({...accum, [key]: null}),{})
    );

    const handleChange = (e) =>{
      const {name , value} = e.target;
      const newValue = (name === 'CategoryName') ? parseInt(value) : value;
      setDeliverable({
        ...deliverable, [name]: newValue}
      )
      setErrors({
        ...errors, [name]: isValid[name](newValue) ? null : errorMessage[name]
      })
    }
    const isValidDeliverable = (deliverable) =>{
      let isDeliverableValid  =true;
      Object.keys(deliverable).forEach((key)=>{
        if (isValid[key](deliverable[key])){
          errors[key] = null;
        } else {
          errors[key] = errorMessage[key];
          isDeliverableValid = false;
        }
      })
      return isDeliverableValid;
    }

   const handleSubmit = (e) =>{
      e.preventDefault();
      isValidDeliverable(deliverable) && onSubmit(deliverable)
      setErrors({...errors})
   }
    const options = categories.map(category=><option  value={category.CategoryID}>{category.CategoryName}</option>)
  return (
    <form>
<FormItem 
  name= "Deliverable Title"
  label="Deliverable Title"
  htmlFor = "DeliverableTitle"
  advice = {errors.DeliverableTitle}
>
<input 
name="DeliverableTitle" 
value={deliverable.DeliverableTitle}
type='text' 
onChange={handleChange}/>
</FormItem>
<FormItem 
  name= "Deliverable Details"
  label="Deliverable Details"
  htmlFor = "DeliverableDetails"
  advice = {errors.DeliverableDetail}
>
<input
 type='text' 
 name='DeliverableDetail'
 value={deliverable.DeliverableDetail}
 onChange={handleChange}/> 
</FormItem>
<FormItem
  name="Deliverable Category"
  label="Category"
  htmlFor="Category"
  advice={errors.CategoryName}
  >
<select name='DeliverableCategoryID' onChange={handleChange}>
    {options}
  </select>
</FormItem>
<button onClick={handleSubmit}> Add</button>

</form> 

  )
}

export default AddDeliverableForm;
/*
*/