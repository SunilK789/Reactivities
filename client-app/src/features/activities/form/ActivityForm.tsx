import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const ActivityForm = () => {
  return (
    <>
      <Form>
        <Form.Input placeholder='Title' />
        <Form.TextArea placeholder='Description' />
        <Form.Input placeholder='Category' />
        <Form.Input placeholder='Date' />
        <Form.Input placeholder='City' />
        <Form.Input placeholder='Venue' />

        <Button floated='right' positive type='submit' content='Submit' />
        <Button floated='right' basic type='submit' content='Cancel' />
      </Form>
    </>
  )
}

export default ActivityForm
