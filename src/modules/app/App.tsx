import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from 'shared/styles/theme'
import { authStart } from 'logic/actions/user.actions'
import Routes from './components/routes/Routes'

const App = (props: any) => {
  const { authStart } = props

  useEffect(() => {
    authStart()
  }, [authStart])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes />
    </ThemeProvider>
  )
}

const mapStateToProps = (state: any) => ({
  loggedIn: state.user.loggedIn,
})
export default connect(mapStateToProps, { authStart })(App)
