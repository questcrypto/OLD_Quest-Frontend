import styled from 'styled-components'
import { colors } from 'shared/styles/theme'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    treasuryPaper: {
      padding: '30px',
      backgroundColor: colors.paperBackground2,
      marginBottom: '50px',
    },
    img: {
      width: '100%',
      maxWidth: '500px',
      height: '100%',
      maxHeight: '385px',
    },
    infoItemImages : {
      border: '1px solid rgb(30 52 68 / 20%)',
      borderRadius: '5px',
      overflow : 'radius',
      marginBottom: '20px',
    },
    infoContStyle: {
      position: 'relative',
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'row',
      '& img': {
        width: '93px',
        height: '74px',
      },
    },
    verticalDividerStyle: {
      height: '29px',
      margin: '0 30px !important',
    },
    infoContSlider: {
      flex:1,
      maxWidth: '50%',
      padding: '22px !important',
      background: '#fff',
      borderRadius: '4px',
      '& img': {
        width :'100%',
        height: 'auto',
      },
      '& slick-slide':{
        padding: '4px',
        boxSizing: 'border-box',
        border: '1px solid transparent',
        cursor: 'pointer',
        opacity: 0.87,
        '& img': {
          width: '100%',
        },
        
      },
      
    },
    activeItem: {
      border: '1px solid #333',
      boxSizing: 'border-box',
      cursor:'pointer'
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
    rightSection: {
      paddingLeft:'37px',
      flex: '1',
      '& button': {
        padding:'0',
        minWidth: 'auto',
        textTransform: 'capitalize',
        fontSize: '16px',
        color: '#302E35',
        fontWeight: 400,
      },
    },
    TabListRow : {
      '& div' : {
        '& div' : {
          display: 'flex',
          justifyContent: 'space-between',
        },
      },
      
    },
    topHeading: {
      '& h2' : {
        fontWeight: 700,
        fontSize: '30px',
        lineHeight: '36px',
        color: '#302E35',
      },
      '& p' : {
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '17px',
        color: '#302E35',
      },
    },
    tadWrapper : {
      background: '#ffffff',
      boxShadow: '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 1px 8px rgba(0, 0, 0, 0.12)',
      borderRadius: '4px',
      marginTop: '12px',
      height: 'calc(100% - 110px)',
      overflowY: 'auto',
      maxHeight: '533px',
    },
    tadListingRow: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '28px 0 48px'
    },
    mainWrapper : {
      background:' #F5F5F5',
      border: '1px solid #E0E0E0',
      marginTop: '50px',
      paddingBottom: 0,
    },
    ownerCont: {
      background: '#FAFAFA',
      border: '1px solid #F2F2F2',
      boxSizing: 'border-box',
      borderRadius: '2px',
      maxWidth: '240px' ,
      flexDirection: 'column',
      alignItems: 'flex-start !important',
      padding: '10px',
      position: 'relative',
      '& svg ' : {
        position: 'absolute',
        right: '17px',
        top: '50%',
        transform: 'translateY(-50%)',
      }
    },
    innerTab: {
      display:'flex',
      flexDirection: 'row',
      margin: '-24px -24px 0',
      '& button': {
        textTransform: 'capitalize',
        fontSize: '16px',
        color: '#1E3444',
        fontWeight: 400,
        flex: '1',
        background: '#DDDADA',
      },
      
    },
    selectedTab: {
      background: '#F5E6B9  !important',
    }
  })
)

export const InfoBoldTxt = styled.h2`
  font-size: 16px;
  line-height: 22px;
  color: ${colors.textPrimary};
  font-family: RobotoBold;
  margin: 0;
`
export const InfoLightTxt = styled.p`
  font-size: 14px;
  line-height: 16px;
  color: ${colors.textPrimary};
  font-family: RobotoRegular;
  opacity: 0.87;
  margin: 0;
`

export const ExpandIconButton = styled.div<any>`
  position: absolute;
  top: 16px;
  right: 0;
  svg {
    transform: ${(props: any) => (props.expandStatus ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: 0.2s;
    background: ${colors.lightGray};
  }
`

export const TreasuryOwnerCont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

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
  font-family: RobotoRegular;
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
  text-align: left;
  font-family: RobotoBold;
`
