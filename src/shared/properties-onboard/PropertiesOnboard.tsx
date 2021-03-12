import React, { useEffect, useState } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import { ProgressText, StyledLinearProgress } from 'shared/styles/dashboardStyle'
import axios from 'axios'
import { apiBaseUrl } from 'services/global-constant'
import { Loader } from 'shared/loader-components/component-loader/style'

const useStyles = makeStyles(() =>
  createStyles({
    progressStyle: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      marginTop: '8px',
    },
    loaderWrap: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    loader: {
      width: '10px !important',
      height: '10px !important',
    },
  })
)

const PropertiesOnboard = () => {
  const classes = useStyles()
  const [dataLoading, setDataLoading] = useState(false)
  const [propertiesOnboard, setPropertiesOnboard] = useState<any>({})

  useEffect(() => {
    const getPropertiesOnboard = async () => {
      try {
        setDataLoading(true)
        const res = await axios.get(`${apiBaseUrl}/properties/getOnboardCount`)
        if (!!res && res.data) {
          setPropertiesOnboard(res.data)
        }
      } catch (error) {
      } finally {
        setDataLoading(false)
      }
    }
    getPropertiesOnboard()
  }, [])

  const properties = propertiesOnboard?.pending
  const propertiesProgress = (propertiesOnboard?.pending / propertiesOnboard?.total) * 100

  return dataLoading ? (
    <Grid item xs={6} className={classes.loaderWrap}>
      <Loader className={classes.loader} />
    </Grid>
  ) : (
    <>
      <Grid item xs={6} md={3}>
        <StyledLinearProgress variant="determinate" value={propertiesProgress} className={classes.progressStyle} />
      </Grid>
      <Grid item xs={6} md={3}>
        <ProgressText>
          {properties} new {properties === '1' ? 'property' : 'properties'} to onboard
        </ProgressText>
      </Grid>
    </>
  )
}

export default PropertiesOnboard
