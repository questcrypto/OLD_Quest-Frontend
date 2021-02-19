import React from 'react'
import { FeatureInfo, FeatureName, FeatureValue } from './style'
import Grid from '@material-ui/core/Grid'
import plot from 'assets/images/plot.png'
import roof from 'assets/images/roof.svg'
import pool from 'assets/images/pool.png'
import heating from 'assets/images/heating.png'
import air from 'assets/images/air.png'
import exterior from 'assets/images/exterior.png'
import floor from 'assets/images/floor.png'
import land from 'assets/images/land.png'
import windowImg from 'assets/images/window.png'

const RentalFacts = (props: any) => {
  const { data } = props

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <FeatureInfo>
          <FeatureName>
            <img src={roof} alt="" />
            <span>Roof</span>
          </FeatureName>
          <FeatureValue>{data.Roof}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <img src={heating} alt="" />
            <span>Heating</span>
          </FeatureName>
          <FeatureValue>{data.Heating}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <img src={air} alt="" />
            <span>Air Conditioning</span>
          </FeatureName>
          <FeatureValue>{data.AC}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <img src={floor} alt="" />
            <span>Floor</span>
          </FeatureName>
          <FeatureValue>{data.Floor}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <img src={windowImg} alt="" />
            <span>Window Covering</span>
          </FeatureName>
          <FeatureValue>{data.WindowCovering}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <img src={exterior} alt="" />
            <span>Exterior Features</span>
          </FeatureName>
          <FeatureValue>Brick</FeatureValue>
        </FeatureInfo>
      </Grid>
      <Grid item xs={12} md={6}>
        <FeatureInfo>
          <FeatureName>
            <img src={pool} alt="" />
            <span>Pool</span>
          </FeatureName>
          <FeatureValue>{data.Pool}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <img src={pool} alt="" />
            <span>Pool Features</span>
          </FeatureName>
          <FeatureValue>{data.PoolFeature}</FeatureValue>
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
          <FeatureValue>{data.Landscaping}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <img src={plot} alt="" />
            <span>Lot Facts</span>
          </FeatureName>
          <FeatureValue>{`${data.Lotfacts} m2`}</FeatureValue>
        </FeatureInfo>
      </Grid>
    </Grid>
  )
}

export default RentalFacts
