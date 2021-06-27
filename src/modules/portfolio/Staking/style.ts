import { makeStyles } from '@material-ui/core'
import styled from 'styled-components'

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  },
  mainDiv: {
    padding: theme.spacing(2)
  },
  rowDiv: {
    border: '1px solid #E4E4E4',
    padding: theme.spacing(2)
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

