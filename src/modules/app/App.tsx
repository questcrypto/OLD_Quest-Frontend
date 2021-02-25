import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from 'shared/styles/theme'
import { authStart, setSocketConnection } from 'logic/actions/user.actions'
import Routes from './components/routes/Routes'
import io from 'socket.io-client'
import { apiBaseUrl } from 'services/global-constant'
import { SocketContext, socket } from 'context/socket'
const App = (props: any) => {
  const { authStart, loggedIn } = props
  const [initDone, setInitDone] = useState(false)
  
  useEffect(() => {
    if (apiBaseUrl !== 'https://13.82.217.131:3001') {
    }
    authStart()
  }, [authStart])

  useEffect(() => {
    if (loggedIn) {
      const socket = io(`wss://${apiBaseUrl.split('//')[1]}`)
      socket.on('connection', () => {
        if (socket.connected) {
          socket.emit('user', {
            token: localStorage.getItem('token'),
          })
          setSocketConnection(socket)
        } else {
          socket.on('exception', function () {})
        }
      })
    }
  }, [loggedIn, setSocketConnection])

  return (
    <>
      {/* <SocketContext.Provider value={{ initDone }}> */}
      {initDone && (
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Routes />
        </ThemeProvider>
      )}

      {/* </SocketContext.Provider> */}
    </>
  )
}

const mapStateToProps = (state: any) => ({
  loggedIn: state.user.loggedIn,
  socketApi: state.user.socketApi,
})
export default connect(mapStateToProps, { authStart, setSocketConnection })(App)

 // //socket.emit allows you to emit custom events on the server and client
 // //socket.send sends messages which are received with the 'message' event

// import React, { useEffect } from 'react'
// import { connect } from 'react-redux'
// import { ThemeProvider } from 'styled-components'
// import { theme, GlobalStyle } from 'shared/styles/theme'
// import { authStart } from 'logic/actions/user.actions'
// import Routes from './components/routes/Routes'

// const App = (props: any) => {
//   const { authStart } = props

//   useEffect(() => {
//     authStart()
//   }, [authStart])

//   return (
//     <ThemeProvider theme={theme}>
//       <GlobalStyle />
//       <Routes />
//     </ThemeProvider>
//   )
// }

// const mapStateToProps = (state: any) => ({
//   loggedIn: state.user.loggedIn,
// })
// export default connect(mapStateToProps, { authStart })(App)
