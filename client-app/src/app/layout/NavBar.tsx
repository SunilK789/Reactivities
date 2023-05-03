import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import { useStore } from '../stores/store'

const NavBar = () => {
  const {activityStore} = useStore();

  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item>
            <img src="/assests/logo.png" alt="logo" style={{marginRight: '10px'}}/>
        </Menu.Item>
        <Menu.Item name='Activities'></Menu.Item>
        <Menu.Item>
            <Button onClick={()=> activityStore.openForm()} positive content='Create Activity'></Button>
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default NavBar
