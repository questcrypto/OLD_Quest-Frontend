import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useStyles } from './style'
import Box from '@material-ui/core/Box'
import TabComponent from 'shared/tab-component'
import { transactionTabList } from 'shared/helpers/dataConstant'

const Transactions = (props: any) => {
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState('tokenToMint')
  return (
    <Box>
      <TabComponent tabOptions={transactionTabList} activeTab={activeTab} setActiveTab={setActiveTab} />
    </Box>
  )
}

const mapStateToProps = (state: any) => ({
  userInfo: state.user.userInfo,
})
export default connect(mapStateToProps)(Transactions)
