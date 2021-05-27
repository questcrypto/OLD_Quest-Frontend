import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const NotificationDiv = styled.div`
  z-index: 101;
`;

export const NotifyInnerDiv = styled.div`
  position: relative;
  width: 325px;
  height: 310px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.22);
  /* right: 300px; */
`;

export const ContentDiv = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.22);
  padding: 12px 16px;
`;

export const ScrollDiv = styled.div`
  max-height: 269px;
  overflow: auto;
  padding: 8px;
  padding-right: 12px;
  /* margin-top: 12px; */
  line-height: 26px;
  ::-webkit-scrollbar-track
  {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #F5F5F5;
    margin-top: 30px;
    border-radius: 4px;
  }
  ::-webkit-scrollbar
  {
    width: 6px;
    background-color: #FFFFFF;
  }
  ::-webkit-scrollbar-thumb
  {
    background-color: #C4C4C4;
  }
`;

export const CustomBtn = styled(Button)`
  &:hover {
    background-color: #FFFFFF;
  }
`;

export const CloseIconDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 4px;
  img { 
    cursor: pointer;
  }
`;

export const Title = styled.div`
  padding-top: 12px;
  color: #9B9B9B;
`;

export const Item = styled.div`
  display: flex;
`;

export const ItemIcon = styled.div`
  padding-right: 8px;
`;

export const ItemLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-grow: 2;
  color: #000000;
`;

export const ItemRight = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-grow: 1;
  color: #BABABA;
  font-size: 0.95rem;
`;