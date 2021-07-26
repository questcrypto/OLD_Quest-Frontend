import { makeStyles, Input, InputAdornment } from '@material-ui/core'
import { getStableCoinBalance } from '../../../../modules/block-chain/BlockChainMethods'

const useStyles = makeStyles((theme) => ({
  fromDivInput: {
    '&:before': {
      border: 'none',
    },
    width: '100%',
    border: '1px solid #EDEDED',
    padding: '0px 12px',
  },
}))

// let maxValue: Number = 0;
const CustomInput = (props: any) => {
  const classes = useStyles()
  const { id, type, adornment, adornmentClick, ...other } = props
  // const displayMax = async () => {
  //    maxValue = await getStableCoinBalance()
  //   console.log(maxValue)
  // }
  return (
    <Input
      id={id || '1'}
      type={type || 'text'}
      disableUnderline={true}
      endAdornment={
        <InputAdornment position="end" style={{cursor: 'pointer'}} onClick={adornmentClick}>
          {adornment}
        </InputAdornment>}
      classes={{ root: classes.fromDivInput }}
      {...other}
    />
  )
}

export default CustomInput
