import { useState, useEffect } from 'react';
import {
  makeStyles,
  Typography,
  Input,
  InputAdornment,
} from '@material-ui/core';
import styled from 'styled-components';

import CustomModal from '../../../shared/custom-modal/CustomModal';
import closeIcon from 'assets/icons/closeIcon.svg';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import DropDownButton from './shared/DropDownButton';
import CustomInput from './shared/CustomInput';
import CustomButton from './shared/Button';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Spinner from 'shared/loader-components/spinner'

const useStyles = makeStyles(theme => ({
  bcDiv: {
    minWidth: '464px',
    // padding: theme.spacing(4)
  },
  modalBody: {
    padding: theme.spacing(4)
  },
  closeIcon: {
    width: '12px',
    height: '12px',
    cursor: 'pointer'
  },
  line: {
    height: '1px',
    width: '100%',
    backgroundColor: '#DEDEDE',
    // margin: '24px 0px'
  },
  swapDiv: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  swapDivText: {
    color: '#858585',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center'
  },
  swapRightDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  swapRightText: {
    fontSize: '12px',
    paddingRight: theme.spacing(1)
  },
  eightFiveC: {
    color: '#858585'
  },
  impactValue: {
    color: '#0AD071'
  },
  confirmDialog: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4)
  },
  confirmDialogText: {
    color: '#858585',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  confirmDialogBtn: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '32px',
    marginBottom: '16px'
  }
}));

const BuyAndConvertModal = (props: any) => {

  const classes = useStyles();

  const { show, toggleModal, onClose, options1,
    options2, headerText, onModalSubmit,
    isConfirm, conversionData, confirmTransaction, rejectTransaction, isTransaction } = props;

  const [initialRender, setInitialRender] = useState(true);
  const [formData, setFormData] = useState({ from: 0.00, to: 0.00 });
  const [dropDownData, setDropDownData] = useState({ from: options1[0], to: options2[0] });
  const [conversionFactor, setConversionFactor] = useState(2);
  const [swapData, setSwapData] = useState({ minimumReceived: '17.77 USDT', priceImpact: '0.01%', fee: '0.03% Matic' });
  const [swapDivValue, setSwapDivValue] = useState(1);

  const handleChange = (e: any) => {
    try {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    } catch (error) { console.log(error) }
  }

  const handleBtnChange = (e: any) => {
    try {
      if (e.id.includes('from')) {
        setDropDownData({ ...dropDownData, from: { ...e } });
      } else {
        setDropDownData({ ...dropDownData, to: { ...e } });
      }
    } catch (error) { console.log(error) }
  }

  // Form Data Change From
  useEffect(() => {
    if (!initialRender) {
      setFormData({ ...formData, to: formData.from * conversionFactor });
      setSwapDivValue(conversionFactor)
    }
    setInitialRender(false);
    setConversionFactor(conversionData[dropDownData.from.key][dropDownData.to.key]);
  }, [formData.from, conversionFactor])

  // Form Data Change To
  useEffect(() => {
    if (!initialRender) {
      setFormData({ ...formData, from: formData.to / conversionFactor });
    }
    setInitialRender(false);
  }, [formData.to])

  // Drop Down Data Change
  useEffect(() => {
    if (!initialRender) {
      if (conversionData && dropDownData) {
        setConversionFactor(conversionData[dropDownData.from.key][dropDownData.to.key]);
        console.log(conversionData[dropDownData.from.key][dropDownData.to.key]);
      }
    }
    setInitialRender(false);
  }, [dropDownData])

  return (
    <CustomModal show={show} toggleModal={toggleModal}>
      <div className={classes.bcDiv}>
        <ModalHeaderDiv>
          <ModalHeaderText>{headerText}</ModalHeaderText>
          <div onClick={onClose}>
            <img src={closeIcon} alt='close' className={classes.closeIcon} />
          </div>
        </ModalHeaderDiv>
        <div className={classes.line}></div>
        {isConfirm ?
          <>
            <div className={classes.confirmDialog}>
              <div className={classes.confirmDialogText}>
                <Typography variant="h5" style={{ marginBottom: '8px' }}>
                  Attention !
                </Typography>
                <Typography variant="subtitle1">
                  You are swaping your coins from other stable coins.<br />
                  After the confirmation you can check it's status <br /> in your metamask
                </Typography>
              </div>
              <div className={classes.confirmDialogBtn}>
                <CustomButton
                  size="large"
                  style={{ backgroundColor: '#1E3444', padding: '8px 24px' }}
                  onClick={() => confirmTransaction(formData)}
                >
                  { isTransaction? <Spinner /> : 'Confirm' }
                </CustomButton>
                <CustomButton
                  size="large"
                  style={{
                    backgroundColor: '#BDBDBD',
                    padding: '8px 24px',
                    marginLeft: '12px'
                  }}
                  onClick={rejectTransaction}
                >
                  Later
                </CustomButton>
              </div>
            </div>
          </> :
          <div className={classes.modalBody}>
            <div className={classes.swapDiv}>
              <Typography variant="subtitle2" className={classes.swapDivText}>Price</Typography>
              <div className={classes.swapRightDiv}>
                <Typography variant="subtitle2" className={classes.swapRightText}>
                  { (formData.from > 0 || formData.to > 0) ?
                    `${swapDivValue} ${dropDownData.to.name} per ${dropDownData.from.name}` : ''
                  }
                </Typography>
                <CustomButton
                  size="small"
                  style={{
                    backgroundColor: '#C4C4C4',
                    color: 'rgba(0, 0, 0, 0.7)',
                    borderRadius: '6px',
                    padding: '4px 0px',
                    minWidth: '48px'
                  }}
                >
                  <SwapVertIcon />
                </CustomButton>
              </div>
            </div>
            <ContaDiv>
              <Typography variant="subtitle2">From</Typography>
              <ContaInnerDiv>
                <DropDownButton
                  options={options1}
                  valueChange={handleBtnChange}
                />
                <CustomInput
                  id="from"
                  type="number"
                  value={formData.from}
                  onChange={handleChange}
                />
              </ContaInnerDiv>

              <Typography variant="subtitle2" style={{ paddingTop: '16px' }}>To</Typography>
              <ContaInnerDiv>
                <DropDownButton
                  options={options2}
                  valueChange={handleBtnChange}
                />
                <CustomInput
                  id="to"
                  type="number"
                  value={formData.to}
                  onChange={handleChange}
                />
              </ContaInnerDiv>
            </ContaDiv>
            {(formData.from > 0 || formData.to > 0) ? '': ''
              // <SwapDetailsDiv>
              //   <Typography variant="subtitle1">Swap Details</Typography>
              //   <SwapInnerDiv>
              //     <div className={classes.eightFiveC}>Minimum Received</div>
              //     <div>{swapData.minimumReceived}</div>
              //   </SwapInnerDiv>
              //   <SwapInnerDiv>
              //     <div className={classes.eightFiveC}>Price Impact</div>
              //     <DFlexDiv className={classes.impactValue}>
              //       <ArrowDropUpIcon />
              //       {swapData.priceImpact}
              //     </DFlexDiv>
              //   </SwapInnerDiv>
              //   <SwapInnerDiv>
              //     <div className={classes.eightFiveC}>Liquidity Provider Fee</div>
              //     <div>{swapData.fee}</div>
              //   </SwapInnerDiv>
              // </SwapDetailsDiv> : ''
            }
            <DFlexDiv>
              <CustomButton
                size="large"
                style={{ backgroundColor: '#1E3444', padding: '8px 24px' }}
                disabled={!(formData.from > 0 || formData.to > 0)}
                onClick={() => onModalSubmit(formData)}
              >
                Submit
            </CustomButton>
            </DFlexDiv>
          </div>
        }
      </div>
    </CustomModal>
  );
}

export default BuyAndConvertModal;

export const DFlexDiv = styled.div`
  width: '100%';
  display: flex;
  justify-content:center;
`;

export const ModalHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px;
  padding-bottom: 16px;
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