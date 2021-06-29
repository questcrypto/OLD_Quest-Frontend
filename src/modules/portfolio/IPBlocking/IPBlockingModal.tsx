import { useState, useEffect } from 'react'
// import useState from 'react-usestateref'
// import { withRouter } from 'react-router'
// import { connect } from 'react-redux'
// import publicIp from 'public-ip'
import { makeStyles, Typography, Grid } from '@material-ui/core'
import styled from 'styled-components'
import axios from 'axios'
import CustomModal from '../../../shared/custom-modal/CustomModal'
import CustomButton from '../components/shared/Button'
import { apiBaseUrl } from 'services/global-constant'
// import { hasApplcationAccess } from 'logic/actions/user.actions'
// const publicIp = require('public-ip')

const useStyles = makeStyles((theme) => ({
  bcDiv: {
    minWidth: '464px',
  },
  modalBody: {
    padding: theme.spacing(4),
  },
  closeIcon: {
    width: '12px',
    height: '12px',
    cursor: 'pointer',
  },
  line: {
    height: '1px',
    width: '100%',
    backgroundColor: '#DEDEDE',
  },

  confirmDialog: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  confirmDialogText: {
    color: '#858585',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  confirmDialogBtn: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '32px',
    marginBottom: '16px',
  },
}))

const IPBlockingModal = (props: any) => {
  const classes = useStyles()
  const { show, toggleModal, onClose, hasAccess } = props
  // const [geoLocation, setGeoLocation] = useState({ data: '' })
  const [ipAddress, setIPAddress] = useState('')
  // useEffect(() => {
  //   axios
  //     // .get('https://geolocation-db.com/json/7bad3e80-c704-11eb-a4bc-19a5c6a04c5d')
  //     // .get('http://ip-api.com/json')
  //     // .get('http://www.geoplugin.net/json.gp')
  //     .get('https://api.ipify.org')
  //     .then((response) => {
  //       // console.log(JSON.stringify(response.data, null, 2))
  //       // console.log(response, '*** api')
  //       setGeoLocation(response)
  //     })
  //     .catch((err) => console.log(err))
  // }, [])

  // const ip: string = geoLocation.data //local user
  // const ip: string = '193.37.254.170' // random IP from USA
  // const ip: string = '115.241.201.82'
  // console.log(ip, '***')
  // useEffect(() => {
  //   axios
  //     .post(`${apiBaseUrl}/user/blockIp`, { ip })
  //     .then((response) => {
  //       console.log(response, '***')
  //       hasAccess(response.data.access)
  //     })
  //     .catch((err) => console.log(err, '*** er'))
  // }, [])
  // console.log(props.applicationAccess, '**')
  // const fetchIP = async () => {
  //   console.log('**', 'hello')
  //   const intIp = await internalIp.v6()
  //   console.log(intIp, '*')
  // }
  // console.log(internalIp.v6.sync(), '**')

  // const ip = address.ip() // '192.168.0.2'
  // address.ipv6()
  // address(function (err: any, addrs: any) {
  //   console.log(addrs.ip, addrs.ipv6, addrs.mac, '**')
  //   // '192.168.0.2', 'fe80::7aca:39ff:feb0:e67d', '78:ca:39:b0:e6:7d'
  // })
  // const ipAdd = async () => {
  //   const ip = await publicIp.v4()
  //   setIPAddress(ip)
  // }
  // console.log(ipAddress, '*** npm')
  //  useEffect(() => {
  //   axios
  //     .post(`${apiBaseUrl}/user/blockIp`, { ip })
  //     .then((response) => {
  //       console.log(response, '***')
  //       hasAccess(response.data.access)
  //     })
  //     .catch((err) => console.log(err, '*** er'))
  // }, [])

  // console.log('*** succ', hasAccess)
  // useEffect(() => {
  //   console.log('*** succ', hasAccess)
  //   if (hasAccess.length > 0) {
  //     // console.log('*** succ')
  //     setIPAddress(hasAccess)
  //   }
  // }, [])
  // console.log(ipAddress, '***')
  return (
    <CustomModal show={show} toggleModal={toggleModal}>
      {/* {() => ipAdd()} */}
      <div className={classes.bcDiv}>
        <div className={classes.confirmDialog}>
          <div className={classes.confirmDialogText}>
            <Typography variant="subtitle1" style={{ lineHeight: 2.5 }}>
              It seems you are accessing <a href="https://questcrypto.app">https://questcrypto.app</a> <br />
              from an IP address belonging to one of <br />
              the following countries:
            </Typography>
          </div>
          <hr />
          <Grid container spacing={2}>
            <Grid item md={8} xs={12}>
              <Typography>United States of America</Typography>
              <Typography>Albania</Typography>
              <Typography>Bosnia and Herzegovina</Typography>
              <Typography>Belarus</Typography>
              <Typography>Congo (DRC)</Typography>
              <Typography>Cote d'lvoire</Typography>
              <Typography>Criemea</Typography>
              <Typography>Cuba</Typography>
              <Typography>Iraq</Typography>
            </Grid>
            <Grid item md={4} xs={12}>
              <Typography>North Korea</Typography>
              <Typography>Liberia</Typography>
              <Typography>Macedonia</Typography>
              <Typography>Myanmar</Typography>
              <Typography>Serbia</Typography>
              <Typography>Sudan</Typography>
              <Typography>Syria</Typography>
              <Typography>Zimbabwe</Typography>
            </Grid>
          </Grid>
          <div className={classes.confirmDialogBtn}>
            <CustomButton size="large" style={{ backgroundColor: '#1E3444', padding: '8px 24px', width: '100%' }} onClick={onClose}>
              I ACKNOWLEGDGE
            </CustomButton>
          </div>
        </div>
      </div>
    </CustomModal>
  )
}

export default IPBlockingModal

export const ModalHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px;
  padding-bottom: 16px;
`

export const ModalHeaderText = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  color: #777777;
`
