import React from 'react'
import DeliverableItem from './DeliverableItem'
import styles from './Deliverables.module.css';

export const Deliverables = () => {
 const DUMMY_DATA = [
    {
        id: 1,
        title: 'Identify topic for research',
        details: 'Choose topic for reseach and upload here your topic name. For Example: Microservices',
        dueDate: '14/10/2022',
        status: 'not completed',
        feedback: 'none'
    },
    {
        id: 2,
        title: 'Identify topic for research',
        details: 'Choose topic for reseach and upload here your topic name. For Example: Microservices',
        dueDate: '14/10/2022',
        status: 'not completed',
        feedback: 'none'
    },
    {
        id: 3,
        title: 'Identify topic for research',
        details: 'Choose topic for reseach and upload here your topic name. For Example: Microservices',
        dueDate: '14/10/2022',
        status: 'not completed',
        feedback: 'none'
    },
    {
        id: 4,
        title: 'Identify topic for research',
        details: 'Choose topic for reseach and upload here your topic name. For Example: Microservices',
        dueDate: '14/10/2022',
        status: 'not completed',
        feedback: 'none'
    }, {
        id: 5,
        title: 'Identify topic for research',
        details: 'Choose topic for reseach and upload here your topic name. For Example: Microservices',
        dueDate: '14/10/2022',
        status: 'not completed',
        feedback: 'none'
    },
    {
        id: 6,
        title: 'Identify topic for research',
        details: 'Choose topic for reseach and upload here your topic name. For Example: Microservices',
        dueDate: '14/10/2022',
        status: 'not completed',
        feedback: 'none'
    },
    {
        id: 7,
        title: 'Identify topic for research',
        details: 'Choose topic for reseach and upload here your topic name. For Example: Microservices',
        dueDate: '14/10/2022',
        status: 'not completed',
        feedback: 'none'
    },
    {
        id: 8,
        title: 'Identify topic for research',
        details: 'Choose topic for reseach and upload here your topic name. For Example: Microservices',
        dueDate: '14/10/2022',
        status: 'not completed',
        feedback: 'none'
    },
    {
        id: 9,
        title: 'Identify topic for research',
        details: 'Choose topic for reseach and upload here your topic name. For Example: Microservices',
        dueDate: '14/10/2022',
        status: 'not completed',
        feedback: 'Well done , you created a good piece of work'
    },
    {
        id: 10,
        title: 'Identify topic for research',
        details: 'Choose topic for reseach and upload here your topic name. For Example: Microservices',
        dueDate: '14/10/2022',
        status: 'not completed',
        feedback: 'none'
    },
    {
        id: 11,
        title: 'Identify topic for research',
        details: 'Choose topic for reseach and upload here your topic name. For Example: Microservices',
        dueDate: '14/10/2022',
        status: 'not completed',
        feedback: 'none'
    },
    {
        id: 12,
        title: 'Identify topic for research',
        details: 'Choose topic for reseach and upload here your topic name. For Example: Microservices',
        dueDate: '14/10/2022',
        status: 'not completed',
        feedback: 'none'
    }
]
 const deliverableitems = DUMMY_DATA.map((item) => {
    return(
    <DeliverableItem key={item.id} title={item.title} details={item.details} dueDate={item.dueDate} status={item.status} feedback={item.feedback}/>
    )
 }) 
  return (
    <div className={styles.Deliverables}>
          {deliverableitems}
    </div>
 
  )
}
