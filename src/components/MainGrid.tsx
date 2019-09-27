import React, { useEffect } from 'react'
import io from 'socket.io-client';

import { Grid, Box } from 'grommet';
import { useSessionContext } from '../contexts/SessionContext';
let socket: any = null;
export default function MainGrid(props: any) {
  const { session, setSocket, onConnect, removeConnect, onGetPlayers, removeGetPlayers } = useSessionContext();
  if (!socket) {
    socket = io.connect('https://dice-roller-api.herokuapp.com');
    setSocket(socket);
  }

  useEffect(() => {
    // if (session.socket) {
      onConnect(socket);
      onGetPlayers(socket);
    // }
    return () => {
      removeConnect(socket);
      removeGetPlayers(socket);
    }
  });
  return (
    <Grid
      rows={['50px', 'flex']}
      columns={['flex']}
      fill
      gap="none"
      areas={[
        { name: 'navBar', start: [0, 0], end: [0, 0] },
        { name: 'mainWrap', start: [0, 1], end: [0, 1] },
      ]}
    >
      <Box key='navBar' gridArea='navBar'>
        {props.children[0]}
      </Box>
      <Grid
        className="mainWrap"
        gridArea="mainWrap"
        rows={['flex']}
        columns={['medium', 'flex']}
        gap="small"
        margin="xsmall"
        areas={[
          { name: 'sideBar', start: [0, 0], end: [0, 0] },
          { name: 'main', start: [1, 0], end: [1, 0] },
        ]}
      >
        <Box className="mainElement"
          gridArea="sideBar"
          margin="xsmall"
          pad="small"
          round="xsmall"
        >
          {props.children[1]}
        </Box>
        <Box className="mainElement"
          gridArea="main"
          margin="xsmall"
          pad="small"
          round="xsmall"
        >
          {props.children[2]}
        </Box>
      </Grid>
    </Grid>
  )
}
