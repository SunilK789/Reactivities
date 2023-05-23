import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Segment, Image, Button, Divider } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';
import FacebookLogin from '@greatsumini/react-facebook-login';

const HomePage = () => {
  const {userStore, modalStore} = useStore();

  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image size='massive' src='/assets/logo.png' alt='logo' />
          Reactivities
        </Header>
        {userStore.isLoggedIn ? (
          <>
            <Header as='h2' inverted content='Welcome to Reactivities' />
            <Button as={Link} to='/activities' size='huge' inverted>
              Go to Activities
              </Button>
          </>
        ):(
          <>
           <Button onClick={()=> modalStore.openModal(<LoginForm />)} size='huge' inverted>
            Login
           </Button>
             <Button onClick={()=> modalStore.openModal(<RegisterForm />)} size='huge' inverted>
            Register
           </Button>
           <Divider horizontal inverted>OR</Divider>
           <Button
              as={FacebookLogin}
              appId='196106643373090'
              size='huge'
              inverted
              color='facebook'
              content='Login with Facebook' 
              onSuccess={(response: any) =>{
                console.log('Login success', response)
              }}

              onFail={(error: any)=>{ console.log("Login failed", error)}}
            />
           </>
        )
        }
      </Container>
    </Segment>
  )
}

export default observer(HomePage)
