import React from 'react'
import { Box } from 'grommet';
import { FormGroup, InputGroup, Button, Divider, Icon, Popover, PopoverInteractionKind, Tooltip } from '@blueprintjs/core';
import { useSessionContext } from '../contexts/SessionContext';
import Trianglify from 'trianglify';

var canvas = Trianglify({
  width: 1920,
  height: 1080,
  stroke_width: 2,
  cell_size: Math.random()*200 + 40,
  x_colors: 'random',
  variance: Math.random(),
}).canvas();
let context = canvas.getContext('2d');
context!.save();
context!.drawImage(canvas, 0, 0);
context!.restore();
let url = canvas.toDataURL();



export default function Login() {
  const { session, setName, setRoom, login, setCurrentUserView } = useSessionContext();
  const loginWrapper = () => {
    setCurrentUserView(session.me);
    login();
  }
  return (
    <Box style={{ backgroundSize: 'cover', backgroundImage: 'url(' + url + ')'}}
      fill 
      align="center"
      justify="evenly">
      <Box>
        <span className="logoFont">Dice Roller</span>
      </Box>
      <Box className="loginBackground">
        <FormGroup
          label="Name"
          labelFor="text-input">
          <InputGroup autoComplete="off" id="text-input" placeholder="Enter a name..." onChange={(e: any) => setName(e.target.value)}/>
        </FormGroup>
        <FormGroup
          label="Room"
          labelFor="text-input">
          <InputGroup autoComplete="off" id="text-input" placeholder="Enter the room name..." onChange={(e: any) => setRoom(e.target.value)}/>
        </FormGroup>
        <Box className="loginButton mt10">
          <Button intent="success" rightIcon="arrow-right" text="Join" onClick={() => loginWrapper()}/>
        </Box>
      </Box>
      <Popover className="triangleInfoBtn" popoverClassName="bp3-dark" interactionKind={PopoverInteractionKind.HOVER} position="left">
        <Icon icon="info-sign" iconSize={30} intent="none"/>
        <Box className="p10">
          <a className="dark" href="http://qrohlf.com/trianglify/">Backgrounds generated with Trianglify</a>
        </Box>
      </Popover>
    </Box>
  )
}
