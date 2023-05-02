import React, { useState } from 'react'
import Form from '../Form';
import './DeliverablesForm.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import useLoad from '../../API/useLoad';
const initialDeliverable = {
  DeliverableID:"",
  CategoryName:"",
  CategoryID:"",
  DeliverableTitle: "",
  DeliverableDetail: "",
  DeliverableCategoryID: "",
}
const DeliverableForm = ({categories, onSubmit, initialDeliverable}) => {
    const [CATEGORIES_DATA, , message,]= useLoad('/deliverables/categories');
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
    //console.log(errors)
    const options = CATEGORIES_DATA.map(category=>category.id===deliverable.CategoryID 
      ? <option  value={category.CategoryID} defaultValue>{ category.CategoryName
        }</option>
      :<option  value={category.CategoryID}>{category.CategoryName}</option>)
  return (
    <Form onSubmit={handleSubmit}>
<Form.Item 
  name= "Deliverable Title"
  htmlFor = "DeliverableTitle"
>
<TextField
className="TextField"
id="filled-basic" 
label="Deliverable Title" 
variant="filled"
type='text' 
name='DeliverableTitle'
size='Large'
onChange={handleChange}  
error = {errors.DeliverableTitle}
helperText = {errors.DeliverableTitle}
/>

</Form.Item>
<Form.Item 
  htmlFor = "DeliverableDetails"
>
<TextField
className="TextField"
id="filled-basic" 
label="Deliverable Details" 
variant="filled"
type='text' 
name='DeliverableDetail'
size='Large'
onChange={handleChange}  
error = {errors.DeliverableDetails}
helperText = {errors.DeliverableDetails}

/>
 
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


<Button className="Button" variant="contained"onClick={handleSubmit} color="success">Add</Button>
</Form> 
  )
}

export default DeliverableForm;
/*
*/