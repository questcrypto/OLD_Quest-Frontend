import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from 'shared/styles/theme'
import { authStart, logout } from 'logic/actions/user.actions'
import Routes from './components/routes/Routes'

const App = (props: any) => {
  const { authStart } = props

  useEffect(() => {
    authStart()
  }, [authStart])

    // Event handler to handle metamask account change
  if(window.ethereum ){
    window.ethereum.on("accountsChanged", function () {
      props.logout();
     });
  }

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
export default connect(mapStateToProps, { authStart, logout })(App)
