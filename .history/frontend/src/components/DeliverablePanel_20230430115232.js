import React, { useState } from 'react'
import { ActionAdd,ActionTray } from './Actions'
import ToolTipDecorator from './ToolTipDecorator'
import Panel from './Panel'
import DeliverableForm from './Deliverable/DeliverablesForm'
import API from '../API/API'

const DeliverablePanel = ({deliverable ,categories,reloadDeliverables, assign, handleAssign}) => {
    const [selectedForm, setSelectedForm] = useState(0);
    const handleModify = (id) =>{setSelectedForm(id === selectedForm ? 0 : id)}
    const handleDelete = async (id) =>{
    const response = await API.delete(`/deliverables/${id}` , null);
        if (response.isSuccess){
            reloadDeliverables("/deliverables")
            setSelectedForm(0);
                }else{
                   return false;
                }
      }
    const handleSubmit = async (deliverable)=>{
        const response = await API.put(`/deliverables/${deliverable.DeliverableID}` , deliverable);
        if (response.isSuccess){
            reloadDeliverables("/deliverables")
            setSelectedForm(0);
                }else{
                   return false;
                }
    
      }
 
  return (
  <Panel 
key={deliverable.DeliverableID}
title={`Title: ${deliverable.DeliverableTitle}`}
level={5}
>
  <h4>{deliverable.DeliverableDetails}</h4>
  <ActionTray>
<ToolTipDecorator message='Modify deliverable'>
  <ActionAdd showText onClick={()=>handleModify(deliverable.DeliverableID)} buttonText="Modify" />
</ToolTipDecorator>
<ToolTipDecorator message='Delete deliverable'>
  <ActionAdd showText onClick={()=>handleDelete(deliverable.DeliverableID)} buttonText="Delete" />
</ToolTipDecorator>
{
assign && 
<ToolTipDecorator message='Assign deliverable to profile'>
<ActionAdd showText onClick={()=>handleAssign(deliverable.DeliverableID)} buttonText="Assign" />
</ToolTipDecorator>
}
</ActionTray>

  {
    (selectedForm === deliverable.DeliverableID) &&
    <DeliverableForm 
    key={deliverable.DeliverableID}
    categories={categories} 
    onSubmit={handleSubmit} 
    initialDeliverable={deliverable}/>
  }
 
</Panel> 
  )
}

export default DeliverablePanel