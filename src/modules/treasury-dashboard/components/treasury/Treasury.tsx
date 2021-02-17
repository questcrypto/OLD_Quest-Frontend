import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  useStyles,
  StyledLinearProgress,
  TresuryContainer,
  PropertyHeader,
  HeaderTitle,
  ProgressText,
  PropertyTabCont,
  TabTitle,
  PropertySearchBox,
  StyledGrid,
} from './style'
// import PropertyTable from '../property-table/PropertyTable'
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { Grid } from '@material-ui/core'
import ComponentLoader from 'shared/loader-components/component-loader'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'
import { getPublicAddress } from 'modules/auth/authFunction'
import { Paths } from 'modules/app/components/routes/types'
import history from 'modules/app/components/history'
import AssetDetails from '../asset-details/AssetDetails'
import AssetTransactions from '../asset-transactions/AssetTransactions'

const Treasury = (props: any) => {
  const classes = useStyles()
  const [activeTab, setActiveTab] = useState('new')
  const [propertiesList, setPropertiesList] = useState<any>([])
  const [dataLoading, setDataLoading] = useState(false)
  const { userInfo } = props

  useEffect(() => {
    const getPropertiesList = async () => {
      try {
        setDataLoading(true)
        if (!!userInfo && userInfo.role === 1) {
          const res = await axios.get(`${apiBaseUrl}/properties/GetAllProperty`)
          setPropertiesList(res.data)
        }
        if (!!userInfo && userInfo.role === 2) {
          const publicaddress = await getPublicAddress()
          if (publicaddress) {
            const res = await axios.get(`${apiBaseUrl}/properties/GetProperty/${publicaddress}`)
            setPropertiesList(res.data)
          }
        }
      } catch (error) {
      } finally {
        setDataLoading(false)
      }
    }
    getPropertiesList()
  }, [userInfo])

  const handleAddProperty = () => {
    history.push(Paths.addPropertyForm)
  }

  return (
    <TresuryContainer>
      <PropertyHeader>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <HeaderTitle>Welcome to the Strategic land treasury</HeaderTitle>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={() => handleAddProperty()} className={classes.confirmationsBtnStyle}>
              pending multi-sig req. confirmations
            </Button>
          </Grid>
        </Grid>
      </PropertyHeader>
      <StyledGrid container spacing={3}>
        <Grid item xs={12} sm={12} lg={6}>
          <AssetDetails />
        </Grid>
        <Grid item xs={12} sm={12} lg={6}>
          <AssetTransactions />
        </Grid>
      </StyledGrid>
    </TresuryContainer>
  )
}

const mapStateToProps = (state: any) => ({
  userInfo: state.user.userInfo,
})
export default connect(mapStateToProps)(Treasury)
