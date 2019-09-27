import React from 'react'
import { Navbar, Alignment, Button, Menu, Position, Popover } from '@blueprintjs/core';
import { Box } from 'grommet';

import { useThemeContext } from '../contexts/ThemeContext';
import { useSessionContext } from '../contexts/SessionContext';

import d20 from '../images/d20.png';

export default function NavBar(props: any) {
  const { theme, setTheme } = useThemeContext();
  const { session, logout } = useSessionContext();
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Box margin={{"right": "10px"}}><img src={d20} alt="d20" style={{height: '35px', width:'35px'}}/></Box>
        <Navbar.Heading>Dice Roller</Navbar.Heading>
        <Navbar.Divider />
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        {`Welcome, ${session.me.name}! `}
        <Navbar.Divider />
        <Popover minimal content={
          <Menu>
            <Menu.Item 
              icon={theme === 'light' ? 'moon' : 'flash'}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              text={theme === 'light' ? 'Dark Theme' : 'Light Theme'}/>
            <Menu.Divider />
            <Menu.Item icon="log-out" intent="danger" text="Logout" onClick={logout}/>
          </Menu>
        } position={Position.BOTTOM_RIGHT}>
          <Button icon="chevron-down" large minimal />
        </Popover>
      </Navbar.Group>
    </Navbar>
  )
}
