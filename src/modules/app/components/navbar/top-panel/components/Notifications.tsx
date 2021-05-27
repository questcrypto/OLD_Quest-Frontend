import { useState, useRef, useEffect } from 'react';
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
  ItemRight
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

const Notifications = (props: any) => {

  // Notification
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

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
          <Badge badgeContent={notifyCount} color="error">
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
                      <Title style={{ paddingTop: '0px'}}>Today</Title>
                      {notifiData && notifiData.today && notifiData.today.map((item: any, i: any) => {
                        return (
                          <>
                            <Item key={i}>
                              <ItemIcon>
                                <img src={getIcon(item.type)} alt='icon' />
                              </ItemIcon>
                              <ItemLeft>{item.name}</ItemLeft>
                              <ItemRight>{item.time}</ItemRight>
                            </Item>
                          </>
                        );
                      })}
                      {/* <br /> */}
                      <Title>Yesterday</Title>
                      {notifiData && notifiData.yesterday && notifiData.yesterday.map((item: any, i: any) => {
                        return (
                          <>
                            <Item key={i}>
                              <ItemIcon>
                                <img src={getIcon(item.type)} alt='icon' />
                              </ItemIcon>
                              <ItemLeft>{item.name}</ItemLeft>
                              <ItemRight>{item.time}</ItemRight>
                            </Item>
                          </>
                        );
                      })}
                      {/* <br /> */}
                      {notifiData && notifiData.old && notifiData.old.map((item: any, i: any) => {
                        return (
                          <>
                            <Title>{item.date}</Title>
                            {item.subItems.map((subItem: any, ind: any) => {
                              return (
                                <Item key={ind}>
                                  <ItemIcon>
                                    <img src={getIcon(subItem.type)} alt='icon' />
                                  </ItemIcon>
                                  <ItemLeft>{subItem.name}</ItemLeft>
                                  <ItemRight>{subItem.time}</ItemRight>
                                </Item>
                              );
                            })}
                            {/* <br /> */}
                          </>
                        );
                      })}
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

export default Notifications;

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

