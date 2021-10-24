import React from 'react'
import { TabTitle } from './style'
import Grid from '@material-ui/core/Grid'

const TabComponent = (props: any) => {
  const { tabOptions, activeTab, setActiveTab } = props

  return (
    <Grid container spacing={3}>
      {tabOptions.map((item: any, index: number) => (
        <Grid item key={index}>
          <TabTitle onClick={() => setActiveTab(item.value)} active={activeTab === item.value}>
            {item.label}
          </TabTitle>
        </Grid>
      ))}
    </Grid>
  )
}

export default TabComponent
