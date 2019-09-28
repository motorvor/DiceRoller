import React from 'react'
import { Icon, Button, Popover, Menu, Position, ButtonGroup } from '@blueprintjs/core';
import { Grid, Box } from 'grommet';
import { useSessionContext } from '../contexts/SessionContext';

export default function PlayerCard(props: any) {
  const { session, setCurrentUserView } = useSessionContext();

  const switchCanvases = (target: HTMLElement) => {
    if (!target.closest('.playerCardChevron') && !target.closest('.playerPopover')) {
      setCurrentUserView(props.player)
      console.log(props.player)
      console.log(session.currentUserView);
    }
  };
  return (
    <Box
      className="m5 playerCard"
      border="all"
      round="4px"
      onClick={(e) => switchCanvases(e.target as HTMLElement)}>
      <Grid
        rows={['50px', '30px']}
        columns={['50px', 'flex']}
        margin="xsmall"
        gap="none"
        areas={[
          { name: 'avatar', start: [0, 0], end: [0, 0] },
          { name: 'name', start: [1, 0], end: [1, 0] },
          { name: 'dropdown', start: [2, 0], end: [2, 0] },
          { name: 'status', start: [0, 1], end: [2, 1] },
        ]}
      >
        <Box gridArea="avatar"
          align="center" justify="center">
          <Icon icon="person" iconSize={30} />
        </Box>
        <Box gridArea="name"
          pad="xsmall"
          justify="center"
          align="start">
          <span className="fs-18">{props.player.name}</span>
        </Box>
        <Box gridArea="dropdown"
          pad="xsmall"
          justify="center"
          align="start">
          <Popover boundary="viewport" content={
            <Menu className="playerPopover" >
              <Menu.Item icon="new-text-box" text="New text box" />
              <Menu.Item icon="new-text-box" text="New text box" />
              <Menu.Item icon="new-text-box" text="New text box" />
              <Menu.Item icon="new-text-box" text="New text box" />
              <Menu.Item icon="new-text-box" text="New text box" />
              <Menu.Item icon="new-text-box" text="New text box" />
              <Menu.Item icon="new-text-box" text="New text box" />
              <Menu.Item icon="new-text-box" text="New text box" />
            </Menu>
          } minimal position={Position.RIGHT_TOP}>
            <Button className="playerCardChevron" minimal intent="primary"><Icon icon="chevron-down" iconSize={20} /></Button>
          </Popover>
          
        </Box>
        <Box gridArea="status"
          direction="row"
          pad="xsmall"
          justify="between"
          align="start">
          <span className="fs-16">{props.player.status}</span>
        </Box>
      </Grid>
    </Box>
  )
}
