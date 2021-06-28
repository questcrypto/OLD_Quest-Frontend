import { makeStyles } from '@material-ui/core'
import styled from 'styled-components'

export const useStyles = makeStyles((theme) => ({
  hoverBtnDiv: {
    top: '0%',
    left: '0%',
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    background: '#858585',
    color: '#FFFFFF',
  },
  hoverBtnTxt: {
    // color: '#FFFFFF'
    position: 'relative',
    left: '1.5%',
  },
  relativeDiv: {
    position: 'relative'
  },
  root: {
    padding: theme.spacing(2)
  },
  mainDiv: {
    padding: theme.spacing(2)
  },
  rowDiv: {
    border: '1px solid #E4E4E4',
    padding: theme.spacing(2)
  },
  outerDiv: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  }
}));

export const FlexDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-basis: 100%;
`;

export const Headers = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-top: 24px;
  flex-basis: '100%';
  /* padding-left: 8px;
  padding-right: 8px; */
`;

export const FlexItem = styled.div`
  width: '100%';
  flex-grow: 1;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
`;

export const Heading = styled.div`
  color: #6F7583;
`;

export const Value = styled.div`
  color: #1C2D1E;
`;

export const AccordHeading = styled.div`
  font-size: 14px;
  color: #000000;
`;

export const AccordValue = styled.div`
  font-size: 12px;
  color: #858585;
`;

export const AccordArrIcon = styled.img`
  max-height: 12px;
`;

