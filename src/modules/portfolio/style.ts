import {
  makeStyles,
} from '@material-ui/core';

import styled from 'styled-components';

export const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    // backgroundColor: '#E5E5E5'
    paddingTop: theme.spacing(7),
    paddingRight: theme.spacing(5),
  },
  header: {
    display: 'flex'
  },
  title: {
    color: '#302E35',
    fontWeight: 'bold'
  },
  btnDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  portfolioDiv: {
    padding: theme.spacing(2)
  },
  pfBtnDiv: {
    height: '100%',
    paddingTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'space-around'
  },
  pfBtnhelpText: {
    fontSize: '14px',
    opacity: '0.5'
  },
  bcQuestDiv: {
    minWidth: '400px',
    padding: theme.spacing(4)
  },
  line: {
    height: '1px',
    width: '100%',
    backgroundColor: '#DEDEDE',
    margin: '24px 0px'
  },
  swapDiv: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  swapDivText: {
    color: '#858585',
    fontSize: '14px'
  }
}))

export const DFlexDiv = styled.div`
  width: '100%';
  display: flex;
  justify-content:center;
`;

export const ModalHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ModalHeaderText = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  color: #777777;
`;

export const ContaDiv = styled.div`
  padding: 16px 0px;
`;

export const ContaInnerDiv = styled.div`
  padding: 8px 0px;
  display: flex;
  justify-content: flex-start;
`;

export const SwapDetailsDiv = styled.div`
  padding: 8px;
  border: 1px solid #EDEDED;
  margin: 24px 0px;
  border-radius: 5px;
`;

export const SwapInnerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: '#858585';
  line-height: 24px;
`;