import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core';
import MaticIcon from 'assets/icons/matic.svg';
import KnabDummy from 'assets/icons/knab_dummy.svg';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '6px',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  label: {
    textTransform: 'capitalize',
    fontWeight: 'normal',
  },
  root2: {
    borderLeft: 'none',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
}));

// const options = ['Matic', 'Matic2', 'Matic3'];

const DropDownButton = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const classes = useStyles();
  const { options } = props;

  return (
    <Grid container style={{ width: 'auto' }}>
      <Grid item xs={12}>
        <ButtonGroup
          disableElevation
          disableFocusRipple
          disableRipple
          variant="outlined"
          color="default"
          ref={anchorRef}
          aria-label="split button"
        >
          <Button
            onClick={handleClick}
            classes={{ root: classes.root, label: classes.label }}
          >
            <img src={options[selectedIndex].icon} alt="" style={{ paddingRight: '8px' }} />
            {options[selectedIndex] ? options[selectedIndex].name : ''}
          </Button>
          <Button
            color="default"
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            classes={{ root: classes.root2 }}
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{ zIndex: 9 }}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {options.map((option: any, index: any) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        <img src={option.icon} alt="" style={{ paddingRight: '8px' }} />
                        {option.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
}

export default DropDownButton;