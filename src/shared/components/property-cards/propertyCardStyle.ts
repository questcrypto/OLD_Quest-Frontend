import { makeStyles } from '@material-ui/core'
import { colors } from 'shared/styles/theme'

export const cardStyle = makeStyles({
  infoRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: '15px 15px 0',
  },
  title: {
    fontSize: '12px',
    color: '#BA8E4D',
    display: 'block',
    fontWeight: 600,
  },
  infoWrap: {
    flex: '1',
  },
  info: {
    fontSize: '16px',
    color: '#302E35',
    fontWeight: 600,
  },
  infoPrice: {
    display: 'inlineFlex',
    flexDirection: 'column',
    textAlign: 'end',
    flexBasis: '80px',
  },
  priceTitle: {
    fontSize: '12px',
    color: '#BA8E4D',
    display: 'block',
    fontWeight: 600,
  },
  priceinfo: {
    fontSize: '14px',
    color: '#000000',
    lineHeight: 'normal',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    fontWeight: 600,
  },
  svg: {
    marginRight: '8px',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '15px 13px !important',
  },
  btnBuyToken: {
    fontSize: '14px',
    letterSpacing: 0,
    height: 'auto',
    padding: ' 0px 11px',
    lineHeight: '23px',
    borderRadius: '5px',
    fontWeight: 600,
    backgroundColor: '#1E3444',
  },
  btnviweDetalis: {
    fontSize: '14px',
    letterSpacing: 0,
    height: 'auto',
    padding: '0 11px',
    lineHeight: '23px',
    borderRadius: '5px',
    fontWeight: 600,
    backgroundColor: '#EFA937',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#EFA937',
      color: '#ffffff',
    },
  },
})
