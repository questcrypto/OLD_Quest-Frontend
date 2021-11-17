import React, { useState, useEffect } from 'react'
import Web3Provider from 'web3-react'
import { connect } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from 'shared/styles/theme'
import { authStart } from 'logic/actions/user.actions'
import Routes from './components/routes/Routes'
import Notifications from 'shared/notifications'
import connectors from './connectors'

const App = (props: any) => {
  const { authStart } = props

  useEffect(() => {
    authStart()
  }, [authStart])
  return (
    <Web3Provider
      connectors={connectors}
      libraryName={'ethers.js' || 'web3.js' || null}
      
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Notifications />
        <Routes />
      </ThemeProvider>
    </Web3Provider>
  )
}

const mapStateToProps = (state: any) => ({
  loggedIn: state.user.loggedIn,
})
export default connect(mapStateToProps, { authStart })(App)
