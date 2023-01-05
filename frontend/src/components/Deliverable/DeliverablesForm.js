import React, { useState } from 'react'
import Form from '../Form';
import styles from './Deliverables.module.css';
const initialDeliverable = {
  DeliverableID:"",
  CategoryName:"a",
  CategoryID:"a",
  DeliverableTitle: "Deliverable Name",
  DeliverableDetail: "Details...",
  DeliverableCategoryID: "a",
}
const DeliverableForm = ({categories, onSubmit, initialDeliverable}) => {
  
    const validation = {
        isValid :{
        DeliverableID: (title)=> title > 0,
        CategoryName: (title)=> title.length > 0,
        DeliverableTitle: (title)=> title.length > 5,
        DeliverableDetail: (title)=> title.length > 20,
        DeliverableCategoryID: (title)=> title > 0,
        CategoryID: (title)=> title > 0,
        },
        errorMessage :{
        DeliverableTitle: 'Deliverables is too short',
        DeliverableDetail: 'Description is too short',
        DeliverableCategoryID: 'Please select Category'
  
      }

    }
  
    const conformance = ['DeliverableCategoryID'];
    const [deliverable, errors, handleChange,handleSubmit]=Form.useForm(initialDeliverable, conformance, onSubmit, validation);
    const options = categories.map(category=>category.id===deliverable.CategoryID 
      ? <option  value={category.CategoryID} defaultValue>{ category.CategoryName
        }</option>
      :<option  value={category.CategoryID}>{category.CategoryName}</option>)
  return (
    <Form onSubmit={handleSubmit}>
<Form.Item 
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
</Form.Item>
<Form.Item 
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
</Form.Item>
<Form.Item
  name="Deliverable Category"
  label="Category"
  htmlFor="Category"
  value={deliverable.CategoryName}
  advice={errors.CategoryName}
  >
<select name='DeliverableCategoryID' onChange={handleChange}>
    {options}
  </select>
</Form.Item>
<button onClick={handleSubmit}>Add</button>

</Form> 
  )
}

export default DeliverableForm;
/*
*/