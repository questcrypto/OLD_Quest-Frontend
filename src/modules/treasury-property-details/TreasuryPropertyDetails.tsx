import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import {
  useStyles,
  PropertyDetailsCont,
  HeaderContainer,
  NoDetailsAvailable,
  HeaderPath,
  HeaderTitle,
  FeatureHeading,
  FeatureInfo,
  FeatureName,
  FeatureValue,
  HeaderBtnCont,
} from './style'
import ComponentLoader from 'shared/loader-components/component-loader'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import { Button } from '@material-ui/core'
import plot from 'assets/images/plot.png'
import roof from 'assets/images/roof.svg'
import pool from 'assets/images/pool.png'
import heating from 'assets/images/heating.png'
import air from 'assets/images/air.png'
import exterior from 'assets/images/exterior.png'
import floor from 'assets/images/floor.png'
import land from 'assets/images/land.png'
import windowImg from 'assets/images/window.png'
import { getPropertyType } from 'shared/helpers/globalFunction'
import moment from 'moment'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'
import { SLFContractAddress, selfAbi } from 'modules/chain/abi'
// import { SLCContractAddress, SLFContractAddress, selfAbi, slcAbi } from 'modules/chain/abi'
import { handlePropertyDetailsSubmit } from 'modules/chain/chain'
import Web3 from 'web3'

const TreasuryPropertyDetails = (props: any) => {
  const classes = useStyles()
  const [dataLoading, setDataLoading] = useState(false)
  const [propertyInfo, setPropertyInfo] = useState<any>({})
  const [account, setAccount] = useState('')
  const [contractSLF, setContractSLF] = useState<any>('')

  useEffect(() => {
    let web3: Web3

    const getChainDetails = async () => {
      if (!window.ethereum) {
        window.alert('Please install MetaMask first.')
        return
      }

      if (!web3) {
        try {
          await window.ethereum.enable()
          web3 = new Web3(window.ethereum)
        } catch (error) {
          window.alert('You need to allow MetaMask.')
          return
        }
      }
      try {
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])
        const SLFInstance = new web3.eth.Contract(selfAbi, SLFContractAddress)
        // const SLCInstance = new web3.eth.Contract(slcAbi, SLCContractAddress)
        window.ethereum.on('accountsChanged', (accounts: any) => {
          setAccount(accounts[0])
        })
        setContractSLF(SLFInstance)
        // setContractSLC(SLCInstance)
      } catch (err) {
        alert(`Failed to load web3, accounts, or contract. Check console for details.`)
        console.log('err->', err)
      }
    }
    getChainDetails()
  }, [])

  useEffect(() => {
    const propertyId = props.match.params.propertyId
    const getPropertyDetails = async () => {
      try {
        setDataLoading(true)
        const res = await axios.get(`${apiBaseUrl}/properties/GetSingleProperty/${propertyId}`)
        if (!!res && res.data) {
          const images = []
          const docs = []
          setPropertyInfo(res.data)
          for (const item of res.data.getDocs) {
            if (item.type === 0) {
              images.push(item)
            }
            if (item.type === 1) {
              docs.push(item)
            }
          }
        }
      } catch (error) {
      } finally {
        setDataLoading(false)
      }
    }
    getPropertyDetails()
  }, [props.match.params.propertyId])

  const handleApproveByAdmin = () => {
    const propertyId = props.match.params.propertyId
    handlePropertyDetailsSubmit(contractSLF, account, 1000, 1613575905, propertyId)
  }

  return (
    <PropertyDetailsCont>
      <HeaderContainer>
        <HeaderPath>
          <span>Properties / New</span> / {props.match.params.propertyId}
        </HeaderPath>
        <HeaderBtnCont>
          <HeaderTitle>Property Details</HeaderTitle>
          <Button
            type="button"
            variant="contained"
            classes={{
              root: classes.btn2Style,
            }}
            onClick={() => handleApproveByAdmin()}
          >
            MINT
          </Button>
        </HeaderBtnCont>
      </HeaderContainer>
      {dataLoading ? (
        <ComponentLoader />
      ) : (
        <div>
          {!!propertyInfo && Object.values(propertyInfo).length > 0 ? (
            <div>
              <Paper className={classes.rentalPaper}>
                <FeatureHeading>Rental facts and features</FeatureHeading>
                <Grid container spacing={6}>
                  <Grid item xs={6}>
                    <FeatureInfo>
                      <FeatureName>
                        <img src={roof} alt="" />
                        <span>Roof</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Roof}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <img src={heating} alt="" />
                        <span>Heating</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Heating}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <img src={air} alt="" />
                        <span>Air Conditioning</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.AC}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <img src={floor} alt="" />
                        <span>Floor</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Floor}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <img src={windowImg} alt="" />
                        <span>Window Covering</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.WindowCovering}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <img src={exterior} alt="" />
                        <span>Exterior Features</span>
                      </FeatureName>
                      <FeatureValue>Brick</FeatureValue>
                    </FeatureInfo>
                  </Grid>
                  <Grid item xs={6}>
                    <FeatureInfo>
                      <FeatureName>
                        <img src={pool} alt="" />
                        <span>Pool</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Pool}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <img src={pool} alt="" />
                        <span>Pool Features</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.PoolFeature}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <img src={exterior} alt="" />
                        <span>Exterior</span>
                      </FeatureName>
                      <FeatureValue>Brick 70%</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <img src={land} alt="" />
                        <span>Landscaping</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Landscaping}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <img src={plot} alt="" />
                        <span>Lot Facts</span>
                      </FeatureName>
                      <FeatureValue>{`${propertyInfo.propertyDetails.Lotfacts} m2`}</FeatureValue>
                    </FeatureInfo>
                  </Grid>
                </Grid>
                <Divider className={classes.dividerStyle} />
                <FeatureHeading>Features</FeatureHeading>
                <Grid container spacing={6}>
                  <Grid item xs={6}>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Type</span>
                      </FeatureName>
                      <FeatureValue>{getPropertyType(propertyInfo.propertyDetails.PropertyType)}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Style</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Style}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Year Built</span>
                      </FeatureName>
                      <FeatureValue>{moment(propertyInfo.propertyDetails.YearBuilt).format('YYYY')}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Acres</span>
                      </FeatureName>
                      <FeatureValue>{`${propertyInfo.propertyDetails.Lotfacts} m2`}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Deck</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Deck}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Patio</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Patio}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Garage</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Garage}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Carport</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Carpot}</FeatureValue>
                    </FeatureInfo>
                  </Grid>
                  <Grid item xs={6}>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Parking Space</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.ParkingSpace}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Fin Bsmt</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.FinBasmt}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Basement</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Basement}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Driveway</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Driveway}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Water</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Water}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Water Shares</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.WaterShare}</FeatureValue>
                    </FeatureInfo>
                    <FeatureInfo>
                      <FeatureName>
                        <span>Spa</span>
                      </FeatureName>
                      <FeatureValue>{propertyInfo.propertyDetails.Spa}</FeatureValue>
                    </FeatureInfo>
                  </Grid>
                </Grid>
              </Paper>
            </div>
          ) : (
            <NoDetailsAvailable>
              <p>No details available</p>
            </NoDetailsAvailable>
          )}
        </div>
      )}
    </PropertyDetailsCont>
  )
}
const mapStateToProps = (state: any) => ({
  userInfo: state.user.userInfo,
})
export default withRouter(connect(mapStateToProps)(TreasuryPropertyDetails))
