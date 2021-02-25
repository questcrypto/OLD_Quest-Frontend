import React, { useState } from 'react'
import { useStyles, TransactionTableCont } from './style'
import ComponentLoader from 'shared/loader-components/component-loader'
import Box from '@material-ui/core/Box'
import TabComponent from 'shared/tab-component'
import { transactionTabList } from 'shared/helpers/dataConstant'
import TransactionTable from './components/TransactionTable'

const Transactions = (props: any) => {
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState('tokenToMint')
  const { loading, pendingTransactions } = props
  return (
    <Box className={classes.root}>
      <TabComponent tabOptions={transactionTabList} activeTab={activeTab} setActiveTab={setActiveTab} />
      <TransactionTableCont>
        {loading ? <ComponentLoader /> : <div>{activeTab === 'tokenToMint' && <TransactionTable data={pendingTransactions} />}</div>}
      </TransactionTableCont>
    </Box>
  )
}

export default Transactions
