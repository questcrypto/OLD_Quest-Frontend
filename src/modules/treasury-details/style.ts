import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'

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
    btn1Style: {
      color: colors.textPrimary,
      fontSize: '14px',
      backgroundColor: '#E0E0E0',
      width: '120px',
      maxWidth: '120px',
      marginRight: '24px',
    },
    btn2Style: {
      color: colors.white,
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
      margin: '50px 0 !important',
    },
    treasuryPaper: {
      padding: '30px',
      backgroundColor: colors.paperBackground2,
      marginBottom: '50px',
    },

    infoAccordionStyle: {
      boxShadow: 'none',
      border: 0,
      background: colors.paperBackground2,
      WebkitBoxShadow: 'none',
    },
    accordionStyle: {
      boxShadow: 'none',
      border: 0,
      background: colors.white,
      WebkitBoxShadow: 'none',
    },
    expandIconStyle: {
      background: colors.lightGray,
      cursor: 'pointer',
    },
    treasuryDividerStyle: {
      margin: '30px 0 !important',
    },
    infoContStyle: {
      position: 'relative',
      alignItems: 'center',
      marginBottom: '20px',
      '& img': {
        width: '93px',
        height: '74px',
      },
    },
    verticalDividerStyle: {
      height: '29px',
      margin: '0 30px !important',
    },
    treasuryOwnersContStyle: {
      marginTop: '30px',
    },
    treasuryOwnersPaper: {
      padding: '10px',
      width: '100%',
      minWidth: '285px',
      backgroundColor: colors.paperBackground3,
      border: '1px solid #F2F2F2',
      boxSizing: 'border-box',
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
  span {
    opacity: 0.5;
  }
`

export const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  line-height: 29px;
  color: ${colors.textPrimary};
`
export const AddressContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`
export const AddressInfo = styled.div`
  h4 {
    font-size: 20px;
    margin: 0;
  }
  p {
    margin: 10px 0 0 0;
    font-size: 16px;
    color: ${colors.textPrimary};
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
`
export const DocWrapper = styled.div`
  margin-top: 30px;
  p {
    font-size: 14px;
    color: ${colors.textPrimary};
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
  opacity: 0.6;
`

export const FeatureHeading = styled.h4`
  margin: 0 0 30px 0;
  font-size: 15px;
  color: ${colors.textPrimary};
  text-align: left;
`
export const InfoBoldTxt = styled.h2`
  font-size: 16px;
  line-height: 22px;
  color: ${colors.textPrimary};
  margin: 0;
`
export const InfoLightTxt = styled.p`
  font-size: 14px;
  line-height: 16px;
  color: ${colors.textPrimary};
  opacity: 0.87;
  margin: 0;
`
export const TreasuryOwnerCont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const HeaderBtnGroup = styled.div`
  display: flex;
  align-items: center;
`
export const ExpandIconButton = styled(IconButton)<any>`
  position: absolute;
  top: 16px;
  right: 0;
  svg {
    transform: ${(props: any) => (props.expandStatus ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: 0.2s;
    background: ${colors.lightGray};
  }
`
