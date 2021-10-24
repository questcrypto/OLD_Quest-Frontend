import { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux'
import {
  NotificationDiv,
  NotifyInnerDiv,
  CustomBtn,
  CloseIconDiv,
  ContentDiv,
  ScrollDiv,
  Title,
  Item,
  ItemIcon,
  ItemLeft,
  ItemRight,
  Noti,
  Noti2,
  DoneIcon
} from './style';
import {
  Button,
  Popper,
  Grow,
  Paper,
  MenuList,
  MenuItem,
  ClickAwayListener,
  Badge,
} from '@material-ui/core';
import NotificationIcon from 'assets/icons/notificationIcon.svg';
import CloseIcon from 'assets/icons/x.svg';
import axios from 'axios';
import NewPropertyIcon from 'assets/icons/newProperty.svg';
import AuctionUpdateIcon from 'assets/icons/auctionUpdate.svg';
import AuctionEndIcon from 'assets/icons/auctionEnd.svg';
import * as jsonData from 'assets/jsons/notifications.json';
import { setNotifications } from 'logic/actions/user.actions';
import DoneAllIcon from '@material-ui/icons/DoneAll';

const Notifications = (props: any) => {

  // Notification
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const { loggedIn, user: { notifications }, setNotifications } = props

  useEffect(() => {
    if (loggedIn) {
      const data = async () => {
        // const res = await axios.get(`${apiBaseUrl}/emails/getNotification`)
        const res = await axios.get(`https://api.questcrypto.app/emails/getNotication`)
        setNotifications(res.data);
      }
      data();
    }
  }, [loggedIn])

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);

  // Component Inputs 
  let notifiData = jsonData.data;
  const [notifyCount, setNotifyCount] = useState<any>(0)

  const getIcon = (type: string) => {
    try {
      if (type === 'new') { return NewPropertyIcon }
      else if (type === 'updated') { return AuctionUpdateIcon }
      else if (type === 'end') { return AuctionEndIcon }
      else { return NewPropertyIcon }
    } catch { }
  }

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }
    prevOpen.current = open;

    setNotifyCount(notifiData.today.length + notifiData.yesterday.length + notifiData.old.length);

  }, [open]);


  return (
    <NotificationDiv>
      <div>
        <CustomBtn
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Badge badgeContent={notifications.length > 0 ? notifications.length : '0'} color="error">
            <img src={NotificationIcon} />
          </Badge>
        </CustomBtn>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal placement='bottom-end'>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <NotifyInnerDiv>
                <Paper>
                  {/* <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </MenuList>

                </ClickAwayListener> */}
                  <ContentDiv>
                    <CloseIconDiv>
                      <img src={CloseIcon} alt='close' onClick={handleClose} />
                    </CloseIconDiv>
                    <ScrollDiv>
                      {
                        notifications.map((item: any) => {
                          return (
                            <>
                              <Noti>
                                <DoneIcon>
                                  <DoneAllIcon />
                                </DoneIcon>
                                <div>
                                  {item.message}
                                </div>
                                <br />
                              </Noti>
                            </>
                          )
                        })
                      }
                      {
                        notifications.length === 0 ? <>
                          <Noti2>No Notifications</Noti2>
                        </> : ''
                      }
                    </ScrollDiv>
                  </ContentDiv>
                </Paper>
              </NotifyInnerDiv>
            </Grow>
          )}
        </Popper>
      </div>
    </NotificationDiv>
  );
}

// export default Notifications;

const mapStateToProps = (state: any) => ({
  loggedIn: state.user.loggedIn,
  user: state.user,
})

export default connect(mapStateToProps, { setNotifications })(Notifications)

// const Content = (props: any) => {
//   const { title, index, icon, name, time } = props;
//   return (
//     <>
//       { title }
//       <Item key={index} >
//         <ItemIcon>
//           <img src={icon} alt='icon' />
//         </ItemIcon>
//         <ItemLeft>{name}</ItemLeft>
//         <ItemRight>{time}</ItemRight>
//       </Item>
//     </>
//   );
// }

