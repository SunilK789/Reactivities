import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react'

const HomePage = () => {
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image size='massive' src='/assets/logo.png' alt='logo' />
          Reactivities
        </Header>
        <Header as='h2' inverted content='Welcome to Reactivities'></Header>
        <Button as={Link} to='/activities' size='huge' inverted>
          Take me to Reactivities
        </Button>
      </Container>
    </Segment>

    // <Container style={{marginTop: '7em'}}>
    //   <h1>Home Page</h1>
    //   <h3>Go to <Link to='/activities'>Activities</Link></h3>
    // </Container>
  )
}

export default HomePage
