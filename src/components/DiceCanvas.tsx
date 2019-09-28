import React, { useEffect, useState, useContext } from 'react'
import { Button, ButtonGroup, Switch, ControlGroup } from '@blueprintjs/core';
import { Box } from 'grommet';
import { useSessionContext } from '../contexts/SessionContext';
import Dice from '../utils/dice';
const teal = require('../utils/teal');
const $t = teal.default;

export default function DiceCanvas() {
  const [dice, setDice]: any = useState([]);
  const [box, setBox]: any = useState(null);
  const { session, session: { socket }, checkIfMe } = useSessionContext();
  $t.dice = Dice.apply($t.dice = $t.dice || {}, [$t]);
  

  function addDie(dieType: string) {
    setDice([...dice, dieType]);
  }
  
  function clearDice() {
    setDice([]);
    box.clear();
  }

  function setCanvas() {
    let canvas: any = document.getElementById('canvas'); // this is where dice will be rolled
    canvas.style.width = window.innerWidth + 'px'; // set width and height as you want
    canvas.style.height = window.innerHeight + 'px'; // do not forget 'px' ending
    // w and h should be half of your canvas size
    let box = new $t.dice.dice_box(canvas, { w: canvas.clientWidth / 2, h: canvas.clientHeight / 2 });
    box.animate_selector = false;
    $t.dice.label_color = '#202020'; // while dice with black labels
    $t.dice.dice_color = '#8a8a8a';
    $t.dice.diceBoxObj = box;
    console.log($t.dice.diceBoxObj)
    return box;
  }

  function setSocketListeners() {
    $t.dice.socket = socket;
    socket.on('getVectors', ({ id, vectors, notation }: any) => {
      if (session.currentUserView.id === id) {
        $t.dice.throw_dices_from_others(box, vectors, notation);
      }
    });
  }

  useEffect(() => {
    if (!$t.dice.socket && socket) {
      // $t.dice.setSocket(socket);
      setSocketListeners();
    }
    if (box === null) {
      setBox(setCanvas());
    }
    if (box) {
      $t.dice.setDiceBoxObj(box);
    }
    return () => {
      if (socket) {
        socket.removeListener('getVectors');
      }
    }
  })

  function notation_getter() {
      // This will create 3 d6 with digits as face labels
      return { set: [...dice], constant: 0, result: [], error: false };
      // This will create 3 d6 with dots as face labels
      //return { set: ['b6', 'b6', 'b6'], constant: 0, result: [], error: false };
  }

  function show_result(result: any) {
    socket.emit('sendStatus', { name: session.me.name, status: 'Threw ' + result.toString() + ', for total of ' + result.reduce((total: number, num: number) => total + num) })
      // alert(result);
      // Do you IFs here, and then hide canvas and table_background divs.
  }

  let throwDice = function(box: any) {
      if (box.rolling) return;
      box.socket = socket;
      socket.emit('sendStatus', { name: session.me.name, status: 'Throwing ' + [...dice].toString() })
      // bind on-click event to your button. Start roll on button click.
      box.clear();
      // At this place you can unhide canvas and table_background divs.
      var direction = Math.random() > 0.5 ? 1: -1;
      var vector = { x: direction * box.w * 0.4, y: 0 }; // vector for gentle throw
      box.start_throw(notation_getter, undefined, function(notation: any, result: any) { show_result(result); }, vector);
  };

  return (
    <Box fill>
      <Box direction="row"
        justify="between">
        { session.me.id == session.currentUserView.id &&
          <ButtonGroup large >
            <Button minimal onClick={() => addDie('d4')}>D4</Button>
            <Button minimal onClick={() => addDie('d6')}>D6</Button>
            <Button minimal onClick={() => addDie('d8')}>D8</Button>
            <Button minimal onClick={() => addDie('d10')}>D10</Button>
            <Button minimal onClick={() => addDie('d12')}>D12</Button>
            <Button minimal onClick={() => addDie('d20')}>D20</Button>
            <Button minimal onClick={() => addDie('d100')}>D100</Button>
            <Button minimal intent="danger" rightIcon="cross" onClick={() => clearDice()}>Clear</Button>
            <Switch className="m5 mt10" label="Private" />
            <Button minimal intent="success" rightIcon="arrow-right" onClick={() => throwDice(box)}>Roll!</Button>
          </ButtonGroup>
        }
        { session.me.id !== session.currentUserView.id &&
          session.currentUserView.name + ` 's dice board`
        }
      </Box>
      <Box id="canvas"
        fill="vertical">
      </Box>
    </Box>
  )
}
