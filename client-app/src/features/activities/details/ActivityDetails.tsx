import React from 'react'
import { Card,Image,Button } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props{
    activity: Activity;
    cancelActivity:()=>void;
}

const ActivityDetails = ({activity,cancelActivity}: Props) => {
  return (
    <Card fluid>
    <Image src={`/assests/categoryImages/${activity.category}.jpg`} />
    <Card.Content>
      <Card.Header>{activity.title}</Card.Header>
      <Card.Meta>
        <span className='date'>{activity.date}</span>
      </Card.Meta>
      <Card.Description>
       {activity.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
     <Button.Group widths='2'>
        <Button basic color='blue' content='Edit' />
        <Button onClick={cancelActivity} basic color='blue' content='Cancel' />        
     </Button.Group>
    </Card.Content>
  </Card>
  )
}

export default ActivityDetails
