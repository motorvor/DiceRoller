import React, { useContext, useEffect, useState } from 'react'
import { Box } from 'grommet';

import { useSessionContext } from '../contexts/SessionContext';
import PlayerCard from './PlayerCard';
import { User } from '../interfaces/User';
// import PlayerCard from './PlayerCard';
// import { Scrollbars } from 'react-custom-scrollbars';


export default function SideBar(props: any) {
  const { session } = useSessionContext();
  const socket = session.socket;
  // const [messages, setMessage] = useState([]);
  // const [currentMsg, setCurrentMsg] = useState('');
  // const [isCollapsed, toggleCollapse] = useState(true);
  // const socket = useContext(SocketContext);

  useEffect(() => {
    // socket.on('reply', (data) => {
    //   setMessage([
    //     ...messages, 
    //     <span><b>{data.from}: </b>{data.msg}</span>
    //   ]);
    // });
    // socket.on('receiveStatus', (data) => {
    //   dispatch(setPlayerStatus({ name: data.from, status: data.msg.status }))
    // })
    // return () => {
    //   socket.removeListener('reply');
    //   socket.removeListener('throwingDice');
    // };
  })

  return (
    <Box id="sidebarWrapper"
      align="stretch"
      margin="xsmall"
      alignContent="start">
      <Box 
        direction="row"
        margin="xsmall"><span>Current Room: <b>{session.room}</b></span>
      </Box>
      {/* <Scrollbars autoHide autoHeight autoHeightMax="100%"> */}
        {
          session.players.map((player: User) => (
            <PlayerCard key={player.name} player={player} />
          ))
        }
      {/* </Scrollbars> */}
      {/* <TextArea autoComplete="off" id="text-input" placeholder="Type Message Here..." onChange={(e) => setCurrentMsg(e.target.value)}/>
      <Button onClick={() => socket.emit('msg', currentMsg)}>Send Message</Button>
      <Box justify="start" alignContent="start">
        {messages.map((msg) => (
          <Box margin="xsmall">{msg}</Box>
        ))}
      </Box> */}
    </Box>
  )
}
