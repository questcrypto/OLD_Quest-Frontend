import React from 'react'
import Button from '@material-ui/core/Button'

import { useStyles, TopPanelCont } from './style'

const TopPanel = () => {
  const classes = useStyles()
  return (
    <TopPanelCont>
      <Button className={classes.buttonStyle}>Connect Wallet</Button>
    </TopPanelCont>
  )
}
export default TopPanel
