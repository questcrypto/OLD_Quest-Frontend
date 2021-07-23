import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import styled from 'styled-components'
import CustomModal from '../../../shared/custom-modal/CustomModal'
import closeIcon from 'assets/icons/closeIcon.svg'
import DropDownButton from './shared/DropDownButton'
import CustomInput from './shared/CustomInput'
import CustomButton from './shared/Button'
import Spinner from 'shared/loader-components/spinner'
import './fieldStyle.css'
// const commaNumber = require('comma-number')
import USDC from 'assets/icons/USDC.svg'
import KNAB from 'assets/icons/KNAB.svg'
import KnabDummy from 'assets/icons/knab_dummy.svg';
import SwapVertIcon from '@material-ui/icons/SwapVert'
import {
  getWeb3Val,
  getAssetsUSDCBalance,
  getQuestBalance,
  handleUsdcApprovalQuest,
  handleQSTApproval,
  buyQST,
  returnQST
} from '../../../modules/block-chain/BlockChainMethods'
import { successAlert, errorAlert } from 'logic/actions/alerts.actions'
import {
  setChainId,
  setWeb3Instance,
  walletConnectAddress,
  walletConnect,
} from 'logic/actions/user.actions'
import { questabi, questAddress, USDCAddress } from '../../../modules/block-chain/abi';

const useStyles = makeStyles((theme) => ({
  dcDiv: {
    minWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      minWidth: '500px',
    },
  },
  modalBody: {
    padding: theme.spacing(4),
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
  swapDiv: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  swapDivText: {
    color: '#858585',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
  },
  swapRightDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  swapRightText: {
    fontSize: '12px',
    paddingRight: theme.spacing(1),
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
}))

const BuyAndConvertQuest = (props: any) => {
  const classes = useStyles()

  const { show, toggleModal, onClose,
    successAlert, errorAlert,
    setChainId, setWeb3Instance, walletConnectAddress, walletConnect,
    user: { walletConAddress, web3Instance } } = props

  const [formData, setFormData] = useState({ from: 1, to: 1 });
  const [isConfirm, setIsConfirm] = useState(false);
  const [isTransaction, setIsTransaction] = useState(false);
  const [loader, setLoader] = useState(false);
  const [dropDownData, setDropDownData] = useState({ from: options1[0], to: options2[0] });
  const [isSwap, setIsSwap] = useState(true);

  useEffect(() => {
    setIsConfirm(false);
  }, []);

  useEffect(() => {
    setFormData({ ...formData, to: formData.from });
  }, [formData.from]);

  useEffect(() => {
    setFormData({ ...formData, from: formData.to });
  }, [formData.to]);

  const handleChange = (e: any) => {
    try {
      setFormData({ ...formData, [e.target.id]: e.target.value })
    } catch (error) {
      console.log(error)
    }
  }

  const onModalSubmit = async (values: any) => {
    try {

      const web3 = await getWeb3Val()
      if (web3) {
        const chainId = await web3.eth.getChainId();
        setChainId(chainId);
        const coinbase = await web3.eth.getCoinbase()
        if (!coinbase) {
          window.alert('Please activate Wallet first.')
          return
        }
        const publicaddress = coinbase.toLowerCase()
        if (web3Instance === '') {
          setWeb3Instance(web3);
          walletConnectAddress(publicaddress);
          walletConnect(true);
        }

        if (isSwap) {
          const fromData = values.from;
          getAssetsUSDCBalance().then(async (result: any) => {
            if ((fromData / 1) > (result / 1)) {
              errorAlert('Insufficent USDC balance in wallet to buy Quest');
              return;
            }
            setLoader(true)
            const accounts = await web3.eth.getAccounts()
            const contractSc = new web3.eth.Contract(questabi, USDCAddress);
            handleUsdcApprovalQuest(contractSc, accounts[0], fromData).then(
              (res) => {
                if (res) {
                  setLoader(false)
                  setIsConfirm(true)
                }
              },
              (err) => {
                setLoader(false)
                console.log(err)
              }
            )
          })
        } else {
          const fromData = values.from;
          getQuestBalance().then(async (result: any) => {
            if ((fromData / 1) > (result / 1)) {
              errorAlert('Insufficent QUEST balance in wallet to convert to USDC');
              return;
            }
            setLoader(true)
            setIsConfirm(true)
            // handleQSTApproval(fromData).then(
            //   (res) => {
            //     if (res) {
            //       setLoader(false)
            //       setIsConfirm(true)
            //     }
            //   },
            //   (err) => {
            //     setLoader(false)
            //     console.log(err)
            //   }
            // )
          })
        }
      }
      // console.log(dropDownData);
    } catch (error) { console.log(error) }
  }

  const confirmTransaction = async (values: any) => {
    try {
      const fromData = values.from;
      const web3 = await getWeb3Val()
      if (web3) {
        setIsTransaction(true)
        let data;
        if (isSwap) {
          data = buyQST(fromData)
        } else {
          data = returnQST(fromData)
        }
        data.then(
          (res) => {
            setIsTransaction(false)
            toggleModal()
            setIsConfirm(false)
            successAlert('Transaction completed successfully')
          },
          (error) => {
            setIsTransaction(false)
            toggleModal()
            setIsConfirm(false)
            console.log(error)
            errorAlert('Something went wrong , please try again')
          }
        )
      }
    } catch (error) { console.log(error) }
  }

  const rejectTransaction = () => {
    try {
      setIsConfirm(false);
    } catch (error) { console.log(error) }
  }

  const maxClickFrom = () => {
    try {
      if (walletConAddress.length > 0) {
        if (isSwap) {
          getAssetsUSDCBalance().then((res: any) => {
            setFormData({ ...formData, from: res })
          })
        } else {
          getQuestBalance().then((res: any) => {
            setFormData({ ...formData, from: res })
          })
        }
      }
    } catch (error) { console.log(error) }
  }

  const maxClickTo = () => {
    try {
      if (walletConAddress.length > 0) {
        if (isSwap) {
          getQuestBalance().then((res: any) => {
            setFormData({ ...formData, to: res })
          })
        } else {
          getAssetsUSDCBalance().then((res: any) => {
            setFormData({ ...formData, to: res })
          })
        }
      }
    } catch (error) { console.log(error) }
  }

  const handleBtnChange = (e: any) => {
    // console.log(e)
    try {
      if (e.id.includes('from')) {
        setDropDownData({ ...dropDownData, from: { ...e } })
      } else {
        setDropDownData({ ...dropDownData, to: { ...e } })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const swap = () => {
    try {
      setIsSwap(!isSwap);
      setFormData({ ...formData, from: 1, to: 1 })
    } catch (error) { console.log(error) }
  }

  return (
    <CustomModal show={show} toggleModal={toggleModal}>
      <div className={classes.dcDiv}>
        <ModalHeaderDiv>
          <ModalHeaderText>Buy | Convert Quest</ModalHeaderText>
          <div onClick={onClose}>
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
                  You are purchasing/coverting Quest Tokens.
                  <br />
                  Please confirm this transaction in your MetaMask wallet.
                  <br />
                  You can see the status of this transaction in your wallet.
                </Typography>
              </div>
              <div className={classes.confirmDialogBtn}>
                <CustomButton
                  size="large"
                  style={{ backgroundColor: '#1E3444', padding: '8px 24px' }}
                  onClick={() => confirmTransaction(formData)}
                >
                  {isTransaction ? <Spinner /> : 'Confirm'}
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
            <div className={classes.swapDiv}>
              <Typography variant="subtitle2" className={classes.swapDivText}>
                Price
              </Typography>
              <div className={classes.swapRightDiv}>
                <Typography variant="subtitle2" className={classes.swapRightText}>
                  1 USDC per QUEST
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
                  onClick={swap}
                >
                  <SwapVertIcon />
                </CustomButton>
              </div>
            </div>
            <ContaDiv>
              <Typography variant="subtitle2">From</Typography>
              <ContaInnerDiv>
                {
                  isSwap ? <><DropDownButton options={options1} valueChange={handleBtnChange} />
                    <CustomInput
                      id="from"
                      type="number"
                      value={formData.from}
                      onChange={handleChange}
                      adornment={' | MAX'}
                      adornmentClick={() => maxClickFrom()}
                    /></> :
                    <>
                      <DropDownButton options={options2} valueChange={handleBtnChange} />
                      <CustomInput
                        id="from"
                        type="number"
                        value={formData.from}
                        onChange={handleChange}
                        adornment={' | MAX'}
                        adornmentClick={() => maxClickFrom()}
                      />
                    </>
                }
              </ContaInnerDiv>
              <Typography variant="subtitle2" style={{ paddingTop: '16px' }}>
                To
              </Typography>
              <ContaInnerDiv>
                {
                  isSwap ? <>
                    <DropDownButton options={options2} valueChange={handleBtnChange} />
                    <CustomInput
                      id="to"
                      type="number"
                      value={formData.to}
                      onChange={handleChange}
                    />
                    {/* adornment={' | MAX'}
                    adornmentClick={() => maxClickTo()} */}
                  </> : <>
                    <DropDownButton options={options1} valueChange={handleBtnChange} />
                    <CustomInput
                      id="to"
                      type="number"
                      value={formData.to}
                      onChange={handleChange}
                    />
                    {/* adornment={' | MAX'}
                    adornmentClick={() => maxClickTo()} */}
                  </>
                }

              </ContaInnerDiv>
            </ContaDiv>
            <DFlexDiv>
              <CustomButton
                size="large"
                style={{ backgroundColor: '#1E3444', padding: '8px 24px' }}
                // disabled={!(formData.from > 0 || formData.to > 0)}
                disabled={!(formData.from > 0) || !(formData.to > 0)}
                onClick={() => onModalSubmit(formData)}
              >
                {loader ? <Spinner /> : 'Buy | Convert QUEST'}
              </CustomButton>
            </DFlexDiv>
          </div>
        )}
      </div>
    </CustomModal>
  )
}

// export default BuyAndConvertQuest;
const mapStateToProps = (state: any) => ({
  user: state.user
})

export default connect(mapStateToProps, {
  successAlert,
  errorAlert,
  setChainId,
  setWeb3Instance,
  walletConnectAddress,
  walletConnect,
})(BuyAndConvertQuest)

const options1 = [{ name: 'USDC', icon: USDC, id: 'usdc_from', key: 'usdc' }]
const options2 = [{ name: 'QUEST', icon: KnabDummy, id: 'quest_to', key: 'quest' }]

export const DFlexDiv = styled.div`
  width: '100%';
  display: flex;
  justify-content: center;
`
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
`
export const ContaDiv = styled.div`
  padding: 16px 0px;
`
export const ContaInnerDiv = styled.div`
  padding: 8px 0px;
  display: flex;
  justify-content: flex-start;
`
export const SwapInnerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: '#858585';
  line-height: 24px;
`
