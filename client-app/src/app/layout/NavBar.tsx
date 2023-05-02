import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
interface Props{
  formOpen:()=>void;
}
const NavBar = ({formOpen}: Props) => {
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item>
            <img src="/assests/logo.png" alt="logo" style={{marginRight: '10px'}}/>
        </Menu.Item>
        <Menu.Item name='Activities'></Menu.Item>
        <Menu.Item>
            <Button onClick={formOpen} positive content='Create Activity'></Button>
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default NavBar
