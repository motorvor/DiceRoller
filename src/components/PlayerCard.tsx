import React from 'react'
import { Icon, Button, Popover, Menu, Position } from '@blueprintjs/core';
import { Grid, Box } from 'grommet';

export default function PlayerCard(props: any) {
  return (
    <Box
      className="m5 playerCard"
      border="all"
      margin="xsmall"
      round="4px">
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
          <b className="fs-20">{props.player.name}</b>
        </Box>
        <Box gridArea="dropdown"
          pad="xsmall"
          justify="center"
          align="start">
          <Popover boundary="viewport" content={
            <Menu>
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
            <Button minimal><Icon icon="chevron-down" iconSize={20} /></Button>
          </Popover>
        </Box>
        <Box gridArea="status"
          pad="xsmall"
          justify="center"
          align="start">
          <span className="fs-16">{props.player.status}</span>
        </Box>
      </Grid>
    </Box>
  )
}
