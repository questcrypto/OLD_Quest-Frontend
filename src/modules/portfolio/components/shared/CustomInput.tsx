import { makeStyles, Input, InputAdornment } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  fromDivInput: {
    '&:before': {
      border: 'none'
    },
    width: '100%',
    border: '1px solid #EDEDED',
    padding: '0px 12px'
  }
}));

const CustomInput = (props: any) => {

  const classes = useStyles();
  const { id, type, adornment, ...other } = props;

  return (
    <Input
      id={id || '1'}
      type={type || 'text'}
      disableUnderline={true}
      endAdornment={<InputAdornment position="end">{adornment}</InputAdornment> }
      classes={{ root: classes.fromDivInput }}
      { ...other }
    />
  );
}

export default CustomInput;