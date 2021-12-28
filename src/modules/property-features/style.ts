import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'


export const FeatureInfo = styled.div`
  display: flex;
  align-item: center;
  justify-content: space-between;
  margin-bottom: 30px;

` 
export const FeatureName = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
  span {
    font-size: 15px;
    color: ${colors.textPrimary};
    font-family: RobotoRegular;
    opacity: 0.6;
  }
  img {
    margin-right: 10px;
    opacity: 1 !important;
  }
`
export const FeatureValue = styled.p`
  margin: 0;
  font-size: 15px;
  color: ${colors.textPrimary};
  font-family: RobotoRegular;
  width: 40%;
  text-align: left;
`
export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    featureImage : {
      maxWidth: '16px',
      maxHeight: '16px',
      height: 'auto',
      width: 'auto',
    },
    sliderBox: {
      background: 'rgb(245 245 245 / 15%)',
      border:' 1px solid rgb(30 52 68 / 15%)',
      borderRadius: '5px',
      padding: '7px 12px 3px',
      marginBottom: '16px',
    },
    inputRow: {
      display: 'flex',
      margin: '0 -10px',
      '& input' : {
        padding: '14.5px 14px',
        background: 'rgb(245 245 245 / 15%)',
        border:' 1px solid rgb(30 52 68 / 15%) ',
        borderRadius: '5px',
      },
      '& label' : {
        transform: 'translate(14px, 15px) scale(1)',
      }
    },
    inputCol: {
      padding: '0 10px' ,
      flex: 1
    },
    buttonRow: {
      display: 'flex',
      
    },
    Approve: {
      background: '#1E3444',
      boxShadow: '0px 3px 1px -2px rgba(30, 52, 68, 0.2), 0px 2px 2px rgba(30, 52, 68, 0.14), 0px 1px 5px rgba(30, 52, 68, 0.12)',
      borderRadius: '2px',
      flex: '1',
      fontSize: '14px !important' ,
      padding: '16px 3px !important',
      lineHeight: '16px',
      color: '#F2F2F2 !important',
    },
    Purchase :{
      background: '#E9E2E2',
      border: '1px solid #D5D5D5',
      borderRadius: '2px',
      flex: '1',
      fontSize: '14px !important',
      padding: '16px 3px !important',
      lineHeight: '16px',
      marginLeft: '3px',
    },
    formHd : {
      marging: 0,
      fontSize: '16px',
      lineHeight: '26px',
    },
    inputfooter: {
      background: '#ECECEC',
      borderTop: '1px solid #E0E0E0',
      margin: '0 -24px 0',
      padding: '24px 24px 4px',
    }
  }
))