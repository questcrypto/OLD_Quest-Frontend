import './Login.css'

import React from 'react'
import Web3 from 'web3'

import { Auth } from '../types'
import { Paper } from '@material-ui/core'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'
import CustomTextField from 'shared/components/custom-text-field'
import { ErrorMessage } from 'formik'
import { err } from 'shared/styles/styled'

interface Props {
  onLoggedIn: (auth: Auth) => void
}

let web3: Web3 // Will hold the web3 instance

export class Login extends React.Component<Props> {
  state = {
    loading: false, // Loading button state
  }

  goToDashboard() {
    history.push(Paths.dashboard)
  }

  handleAuthenticate = ({ publicaddress, signature }: { publicaddress: string; signature: string }) =>
    fetch(`${process.env.REACT_APP_BACKEND_URL}/user/getAuth`, {
      body: JSON.stringify({ publicaddress, signature }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then((response) => response.json())

  handleClick = async () => {
    const { onLoggedIn } = this.props

    // Check if MetaMask is installed
    if (!window.ethereum) {
      window.alert('Please install MetaMask first.')
      return
    }

    if (!web3) {
      try {
        // Request account access if needed
        await window.ethereum.enable()

        // We don't know window.web3 version, so we use our own instance of Web3
        // with the injected provider given by MetaMask
        web3 = new Web3(window.ethereum)
      } catch (error) {
        window.alert('You need to allow MetaMask.')
        return
      }
    }

    const coinbase = await web3.eth.getCoinbase()
    if (!coinbase) {
      window.alert('Please activate MetaMask first.')
      return
    }

    const publicaddress = coinbase.toLowerCase()
    this.setState({ loading: true })

    // Look if user with current publicaddress is already present on backend
    fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${publicaddress}`)
      .then((response) => response.json())
      // If yes, retrieve it. If no, create it.
      .then((users) => (users.length ? users[0] : this.handleSignac(publicaddress, 'email')))
      // Popup MetaMask confirmation modal to sign message
      .then(this.handleSignMessage)
      // Send signature to backend on the /auth route
      .then(this.handleAuthenticate)
      // Pass accessToken back to parent component (to save it in localStorage)
      .then(onLoggedIn)
      .then(this.goToDashboard)

      .catch((err) => {
        window.alert(err)
        this.setState({ loading: false })
      })
  }

  handleSignMessage = async ({ publicaddress, nonce }: { publicaddress: string; nonce: string }) => {
    try {
      console.log(publicaddress + ' ' + nonce)
      const signature = await web3.eth.personal.sign(
        `I am signing my one-time nonce: ${nonce}`,
        publicaddress,
        '' // MetaMask will ignore the password argument here
      )

      return { publicaddress, signature }
    } catch (err) {
      throw new Error('You need to sign the message to be able to log in.')
    }
  }

  handleSignac = (publicaddress: string, email: string) => {
    return fetch(`${process.env.REACT_APP_BACKEND_URL}/user/signUp`, {
      body: JSON.stringify({ email, publicaddress }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then((response) => response.json())
  }

  render() {
    const { loading } = this.state
    return (
      <div>
        <Paper className="Login">
          <p className="Login-title">
            <br />
            for Login use your Card details
          </p>
          <label className="Email">
            Email:
            <input type="text" />
          </label>

          {/* <ErrorMessage component={err} name="email" /> */}
          <button className="Login-button Login-mm" onClick={this.handleClick}>
            {loading ? 'Loading...' : 'Login with MetaMask'}
          </button>
        </Paper>
      </div>
    )
  }
}
