import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    propertyPaper: {
      padding: theme.spacing(3, 4, 8, 2),
      backgroundColor: '#F5F5F5',
      marginBottom: '50px',
      boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.06)',
    },
    img: {
      width: '100%',
      maxWidth: '500px',
      height: '100%',
      maxHeight: '385px',
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
    rentalPaper: {
      padding: theme.spacing(3),
      backgroundColor: '#FBFBFB',
      marginBottom: '50px',
      boxShadow: '0px 8px 8px rgba(0, 0, 0, 0.06)',
    },
    dividerStyle: {
      margin: '50px 0 !important',
    },
  })
)
export const NoDetailsAvailable = styled.div`
  margin-bottom: 30px;
  p {
    text-align: center;
  }
`
export const HeaderContainer = styled.div`
  margin-bottom: 20px;
`
export const HeaderPath = styled.div`
  margin: 0 0 24px 0;
  font-size: 16px;
  line-height: 19px;
  font-family: RobotoRegular;
  span {
    opacity: 0.5;
  }
`

export const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  line-height: 29px;
  color: ${colors.textPrimary};
  font-family: RobotoBold;
`
export const AddressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`
export const AddressInfo = styled.div`
  h4 {
    font-size: 20px;
    font-family: RobotoBold;
    margin: 0;
  }
  p {
    margin: 10px 0 0 0;
    font-size: 16px;
    color: ${colors.textPrimary};
    font-family: RobotoRegular;
    opacity: 0.87;
  }
`
export const EditSection = styled.div`
  display: flex;
  align-items: center;
  svg {
    color: ${colors.primary};
    font-size: medium;
  }
  span {
    font-size: 14px;
    color: ${colors.primary};
    font-family: RobotoRegular;
    margin-right: 6px;
  }
  cursor: pointer;
`
export const PriceContainer = styled.div`
  display: flex;
  margin: 30px 0 24px 0;
`
export const PriceInfo = styled.div`
  display: flex;
  align-items: center;
  p {
    color: ${colors.textPrimary};
    margin: 0;
  }
  img {
    margin-right: 8px;
  }
  margin-right: 30px;
`
export const AboutProperty = styled.p`
  color: ${colors.textPrimary};
  font-size: 14px;
  font-family: RobotoRegular;
`
export const DocWrapper = styled.div`
  margin-top: 30px;
  p {
    font-size: 14px;
    color: ${colors.textPrimary};
    font-family: RobotoRegular;
    opacity: 0.87;
  }
  .doc-img {
    width: 93px;
    height: 74px;
    cursor: pointer;
  }
`
export const DocContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;
`
export const DocName = styled.p`
  margin: 10px 0 0 0;
  text-align: center;
  font-size: 12px;
  color: ${colors.textPrimary};
  font-family: RobotoRegular;
  opacity: 0.6;
`

export const FeatureHeading = styled.h4`
  margin: 0 0 30px 0;
  font-size: 15px;
  color: ${colors.textPrimary};
  font-family: RobotoBold;
  text-align: left;
`
export const HeaderBtnCont = styled.div`
  display: flex;
  justify-content: space-between;
`
