import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import { Grid } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      gridGap: '16px',
    },
    name: {
      marginRight: '28px',
    },
    value: {
      marginRight: '13px',
    },
    docBox: {
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    docPaperStyle: {
      width: '93px',
      height: '74px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#F5F5F5',
      border: '1px solid #E0E0E0',
    },
    btnGroup: { display: 'flex', alignItems: 'center', marginTop: '80px' },
    btn1Style: {
      color: colors.textPrimary,
      fontSize: '14px',
      backgroundColor: '#E0E0E0',
      width: '120px',
      maxWidth: '120px',
      marginRight: '24px',
    },
    btn2Style: {
      color: `${colors.white} !important`,
      backgroundColor: colors.primary,
      fontSize: '14px',
      '&:hover': {
        backgroundColor: colors.primary,
      },
      width: '120px',
      maxWidth: '120px',
    },
    rentalPaper: {
      padding: theme.spacing(3),
      backgroundColor: '#FBFBFB',
      marginBottom: '50px',
      boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.06)',
    },
    dividerStyle: {
      margin: '50px 0',
    },
  })
)

export const AssetDetailsWrapper = styled.div`
`

export const AssetDetailsPanel = styled<any>(Grid)`
  padding: 18px 74px 16px 22px !important;
  background: ${props => props.theme.white};
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 1px 8px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
`

export const PropertiesPanel = styled<any>(Grid)`
  padding: 23px 84.5px 16px 22px;
  background: ${props => props.theme.white};
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 1px 8px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
`

export const Header = styled<any>(Grid)`
  align-items:center;
  margin-bottom: 28px;
  span {
    font-weight: 900;
    font-size: 18px;
    line-height: 22px;
    color: ${props => props.theme.textPrimary};
  }
`
export const Mid = styled<any>(Grid)`
  align-items:center;
  margin-bottom: 41px;

`
export const Footer = styled<any>(Grid)`
  align-items:center;  
`

export const PhotoWrap = styled.div`
  width: 60px;
  height: 60px;
  background: grey;
  border-radius: 50%;
  margin-right: 13px;
`

export const PrimaryText = styled.span<any>`
  font-weight: 900;
  font-size: 18px;
  line-height: 22px;
  color: ${props => props.theme.textPrimary};
  margin-right: 7px;
`

export const SecondaryText = styled.p<any>`
  margin: 0;
  font-size: 14px;
  line-height: 26px;
  color: ${props => props.theme.textPrimary};
  opacity: 0.87;

`

export const ValueText = styled.span<any>`
  font-weight: 900;
  font-size: 17px;
  line-height: 20px;
  color: ${props => props.theme.textPrimary};
`

export const PercentageText = styled.p<any>`
  margin: 0;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  color: ${colors.textPrimary};
  opacity: 0.87;
`