import React, { createContext } from 'react' 
import socketio from 'socket.io-client'
// import { SOCKET_URL } from 'config'
import { apiBaseUrl } from 'services/global-constant'



export const socket = socketio.connect(apiBaseUrl)
export const SocketContext = React.createContext(null)
 

