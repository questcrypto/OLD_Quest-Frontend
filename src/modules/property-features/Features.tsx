import React from 'react'
import { FeatureInfo, FeatureName, FeatureValue } from './style'
import Grid from '@material-ui/core/Grid'
import { getPropertyType } from 'shared/helpers/globalFunction'
import moment from 'moment'

const Features = (props: any) => {
  const { data } = props

  return (
    <Grid>
      <Grid>
        <FeatureInfo>
          <FeatureName>
            <span>Type</span>
          </FeatureName>
          <FeatureValue>{data?.PropertyType}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <span>Style</span>
          </FeatureName>
          <FeatureValue>{data?.Style?.map((item:any)=><div>{item.label}</div>)}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <span>Year Built</span>
          </FeatureName>
          <FeatureValue>{data?.YearBuilt}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <span>Acres</span>
          </FeatureName>
          <FeatureValue>{data?.Lotfacts}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <span>Deck</span>
          </FeatureName>
          <FeatureValue>{data?.Deck?.map((item:any)=><>{item.label}</>)}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <span>Patio</span>
          </FeatureName>
          <FeatureValue>{data?.Patio?.map((item:any)=><>{item.label}</>)}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <span>Garage</span>
          </FeatureName>
          <FeatureValue>{data?.Garage}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <span>Carport</span>
          </FeatureName>
          <FeatureValue>{data?.Carpot}</FeatureValue>
        </FeatureInfo>
      </Grid>
      <Grid>
        <FeatureInfo>
          <FeatureName>
            <span>Parking Space</span>
          </FeatureName>
          <FeatureValue>{data?.ParkingSpace}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <span>Fin Bsmt</span>
          </FeatureName>
          <FeatureValue>{data?.FinBasmt}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <span>Basement</span>
          </FeatureName>
          <FeatureValue>{data?.Basement}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <span>Driveway</span>
          </FeatureName>
          <FeatureValue>{data?.Driveway}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <span>Water</span>
          </FeatureName>
          <FeatureValue>{data?.Water}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <span>Water Shares</span>
          </FeatureName>
          <FeatureValue>{data?.WaterShare}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <span>Spa</span>
          </FeatureName>
          <FeatureValue>{data?.Spa}</FeatureValue>
        </FeatureInfo>
      </Grid>
    </Grid>
  )
}

export default Features
