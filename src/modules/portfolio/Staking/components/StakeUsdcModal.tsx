import { useState, useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core'
import CustomModal from '../../../../shared/custom-modal/CustomModal'
import styled from 'styled-components'
import closeIcon from 'assets/icons/closeIcon.svg'
import CustomButton from '../../components/shared/Button'
import Spinner from 'shared/loader-components/spinner'
import CustomInput from '../../components/shared/CustomInput'
import KNAB from 'assets/icons/KNAB.svg'
import USDC from 'assets/icons/USDC.svg'
import { deposit, depositUsdc, getUSDCAllowance } from '../../../../modules/block-chain/BlockChainMethods'
import { connect } from 'react-redux'
import { successAlert, errorAlert } from 'logic/actions/alerts.actions'

const useStyles = makeStyles((theme) => ({
  dcDiv: {
    minWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      minWidth: '500px',
    }
  },
  closeIcon: {
    width: '12px',
    height: '12px',
    cursor: 'pointer',
  },
  line: {
    height: '1px',
    width: '100%',
    backgroundColor: '#DEDEDE',
  },
  confirmDialog: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(4),
  },
  confirmDialogText: {
    color: '#858585',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  confirmDialogBtn: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '32px',
    marginBottom: '16px',
  },
  modalBody: {
    padding: theme.spacing(4),
  },
  knabInput: {
    paddingTop: theme.spacing(2),
    display: 'flex'
  },
  KnabIc: {
    display: 'flex',
    border: '1px solid #EDEDED',
    borderRight: 'none',
    alignItems: 'center',
    padding: theme.spacing(1),
    '& $img': {
      paddingRight: theme.spacing(1)
    }
  },
  btnDiv: {
    marginTop: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center'
  },
  hr: {
    height: '24px',
    color: '#EDEDED',
    opacity: '0.5'
  }
}));

const StakeUsdcModal = (props: any) => {

  const classes = useStyles();

  const { show, toggleModal, stUpdate, successAlert, errorAlert,
    user: { walletConAddress } } = props;

  // const [show, setShow] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [loader, setLoader] = useState({ confirmTrans: false });
  const [stakeUsdcVal, setStakeUsdcVal] = useState(0.00);
  const [usdcAllowance, setUsdcAllowance] = useState(0);
  useEffect(() => {
    if (!show) {
      setIsConfirm(false);
    }
    if (walletConAddress.length > 0) {
      getUSDCAllowance().then((res: any) => {
        setUsdcAllowance(res);
      });
    }
  }, [show]);

  const stake = () => {
    try {
      if (stakeUsdcVal > usdcAllowance) {
        errorAlert('Insufficent Allowance in wallet to Stake USDC');
        setStakeUsdcVal(0);
        return;
      }
      setIsConfirm(true);
    } catch (error) { console.log(error) }
  }

  const confirmTransaction = async () => {
    try {
      setLoader({ ...loader, confirmTrans: true });
      depositUsdc(3, stakeUsdcVal).then((res: any) => {
        if (res) {
          setLoader({ ...loader, confirmTrans: false });
          setIsConfirm(false)
          toggleModal();
          stUpdate();
          successAlert('Transaction completed successfully')
        }
      }, err => {
        setLoader({ ...loader, confirmTrans: false });
        setIsConfirm(false);
        toggleModal();
        console.log(err)
        errorAlert('Something went wrong , please try again')
      })
    } catch (error) {
      console.log(error)
    }
  }

  const rejectTransaction = () => {
    try {
      setIsConfirm(false)
    } catch (error) {
      console.log(error)
    }
  }

  const approveMaxUsdcClick = () => {
    try {
      setStakeUsdcVal(usdcAllowance);
    } catch (error) { console.log(error) }
  }

  return (
    <CustomModal show={show} toggleModal={toggleModal}>
      <div className={classes.dcDiv}>
        <ModalHeaderDiv>
          <ModalHeaderText>Stake USDC Tokens</ModalHeaderText>
          <div onClick={toggleModal}>
            <img src={closeIcon} alt="close" className={classes.closeIcon} />
          </div>
        </ModalHeaderDiv>
        <div className={classes.line}></div>
        {isConfirm ? (
          <>
            <div className={classes.confirmDialog}>
              <div className={classes.confirmDialogText}>
                <Typography variant="h5" style={{ marginBottom: '8px' }}>
                  Attention !
                </Typography>
                <Typography variant="subtitle1" style={{ lineHeight: 2.5 }}>
                  You are now staking your USDC coins to the pool.<br />
                  Your  coins will be locked in the pools smart backed <br />
                  liquidity contracts for 14 days, starting from time of <br />
                  deposit.
                </Typography>
              </div>
              <div className={classes.confirmDialogBtn}>
                <CustomButton
                  size="large"
                  style={{ backgroundColor: '#1E3444', padding: '8px 24px' }}
                  onClick={() => confirmTransaction()}
                >
                  {loader.confirmTrans ? <Spinner /> : 'Confirm'}
                </CustomButton>
                <CustomButton
                  size="large"
                  style={{
                    backgroundColor: '#BDBDBD',
                    padding: '8px 24px',
                    marginLeft: '12px',
                  }}
                  onClick={rejectTransaction}
                >
                  Later
                </CustomButton>
              </div>
            </div>
          </>
        ) : (
          <div className={classes.modalBody}>
            <FlexColumn>
              <Header>Total Allowance </Header>
              <Value>{usdcAllowance} USDC</Value>
            </FlexColumn>
            <div>
              Stake With
            </div>
            <div className={classes.knabInput}>
              <div className={classes.KnabIc}>
                <img src={USDC} alt="" />
                <span>USDC&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <hr className={classes.hr} />
              </div>
              <CustomInput
                id="knab"
                type="number"
                value={stakeUsdcVal}
                onChange={(e: any) => { setStakeUsdcVal(e.target.value) }}
                adornment={' | MAX'}
                style={{ minHeight: '48px', borderLeft: 'none' }}
                adornmentClick={approveMaxUsdcClick}
              />
            </div>
            <div className={classes.btnDiv}>
              <CustomButton
                size="large"
                style={{ backgroundColor: '#1E3444', padding: '8px 24px' }}
                onClick={stake}
                disabled={!(stakeUsdcVal > 0)}
              >
                Stake USDC
              </CustomButton>
            </div>
          </div>
        )}
      </div>
    </CustomModal>
  );
}

// export default StakeUsdcModal;
const mapStateToProps = (state: any) => ({
  user: state.user,
  staking: state.staking
})

export default connect(mapStateToProps, {
  successAlert, errorAlert,
})(StakeUsdcModal)

export const ModalHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px;
  padding-bottom: 16px;
`
export const ModalHeaderText = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  color: #777777;
  font-size: 18px;
`
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const Header = styled.div`
  font-size: 14px;
  color: #858585;
`;

export const Value = styled.div`
  color: #BDBDBD;
  font-size: 21px;
`;
