import {
  makeStyles,
  Button as MuiButton
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '2px',
    '&:disabled': {
      backgroundColor: theme.palette.primary.main,
      color: '#FFF',
      opacity: 0.8,
    },
  },
  label: {
    textTransform: 'capitalize',
    fontWeight: 'normal',
  }
}));

const CustomButton = (props: any) => {

  const classes = useStyles();

  const {
    variant,
    color,
    size,
    onClick,
    backgroundColor,
    padding,
    colour,
    ...other
  } = props;

  return (
    <MuiButton
      variant={variant || "contained"}
      color={color || "primary"}
      size={size || "large"}
      onClick={onClick}
      classes={{ root: classes.root, label: classes.label }}
      style={{
        backgroundColor: backgroundColor ? backgroundColor : '',
        padding: padding ? padding : '',
        colour: colour ? colour : ''
      }}
      {...other}
    >
      {props.children}
    </MuiButton>
  );
}

export default CustomButton;