import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from 'shared/styles/theme'
import { authStart } from 'logic/actions/user.actions'
import Routes from './components/routes/Routes'
import Notifications from 'shared/notifications'

const App = (props: any) => {
  // console.log("App mapStateToProps");
  const { authStart } = props

  useEffect(() => {
    authStart()
  }, [authStart])
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Notifications />
      <Routes />
    </ThemeProvider>
  )
}

const mapStateToProps = (state: any) => ({
  loggedIn: state.user.loggedIn,
})
export default connect(mapStateToProps, { authStart })(App)
