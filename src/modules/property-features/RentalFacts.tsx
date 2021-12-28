import React from 'react'
import { FeatureInfo, FeatureName, FeatureValue, useStyles } from './style'
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
  const classes = useStyles()
  return (
    <Grid>
      <Grid>
        <FeatureInfo>
          <FeatureName>
            <img src={roof} className={classes.featureImage} alt="" />

            <span>Roof</span>
          </FeatureName>
          <FeatureValue>{data.Roof}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <img src={heating} className={classes.featureImage} alt="" />

            <span>Heating</span>
          </FeatureName>
          <FeatureValue>{data.Heating}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <img src={air} className={classes.featureImage} alt="" />
            <span>Air Conditioning</span>
          </FeatureName>
          <FeatureValue>{data.AC}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <img src={floor} className={classes.featureImage} alt="" />
            <span>Floor</span>
          </FeatureName>
          <FeatureValue>{data.Floor}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <img src={windowImg} className={classes.featureImage} alt="" />
            <span>Window Covering</span>
          </FeatureName>
          <FeatureValue>{data.WindowCovering}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <img src={exterior} className={classes.featureImage} alt="" />
            <span>Exterior Features</span>
          </FeatureName>
          <FeatureValue>Brick</FeatureValue>
        </FeatureInfo>
      </Grid>
      <Grid>
        <FeatureInfo>
          <FeatureName>
            <img src={pool} className={classes.featureImage} alt="" />
            <span>Pool</span>
          </FeatureName>
          <FeatureValue>{data.Pool}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <img src={pool} className={classes.featureImage} alt="" />
            <span>Pool Features</span>
          </FeatureName>
          <FeatureValue>{data.PoolFeature}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <img src={exterior} className={classes.featureImage} alt="" />
            <span>Exterior</span>
          </FeatureName>
          <FeatureValue>Brick 70%</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <img src={land} className={classes.featureImage} alt="" />
            <span>Landscaping</span>
          </FeatureName>
          <FeatureValue>{data.Landscaping}</FeatureValue>
        </FeatureInfo>
        <FeatureInfo>
          <FeatureName>
            <img src={plot} className={classes.featureImage} alt="" />
            <span>Lot Facts</span>
          </FeatureName>
          <FeatureValue>{`${data.Lotfacts} m2`}</FeatureValue>
        </FeatureInfo>
      </Grid>
    </Grid>
  )
}

export default RentalFacts
