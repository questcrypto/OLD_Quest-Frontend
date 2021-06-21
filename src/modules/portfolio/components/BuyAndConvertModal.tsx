import { useState, useEffect } from 'react'
import { makeStyles, Typography, Input, InputAdornment } from '@material-ui/core'
import styled from 'styled-components'

import CustomModal from '../../../shared/custom-modal/CustomModal'
import closeIcon from 'assets/icons/closeIcon.svg'
import SwapVertIcon from '@material-ui/icons/SwapVert'
import DropDownButton from './shared/DropDownButton'
import CustomInput from './shared/CustomInput'
import CustomButton from './shared/Button'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import Spinner from 'shared/loader-components/spinner'
import { getWeb3Val, fetchValue, fetchDetails } from '../../../modules/block-chain/BlockChainMethods'
import history from 'modules/app/components/history'
import { Paths } from 'modules/app/components/routes/types'

const useStyles = makeStyles((theme) => ({
  bcDiv: {
    minWidth: '464px',
    // padding: theme.spacing(4)
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
  eightFiveC: {
    color: '#858585',
  },
  impactValue: {
    color: '#0AD071',
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
  learnMoreText: {
    color: '#35AEBC',
    fontSize: '12px',
    textDecoration: 'underline',
    position: 'relative',
    bottom: '2px',
    cursor: 'pointer',
  },
}))

const BuyAndConvertModal = (props: any) => {
  const classes = useStyles()

  const {
    show,
    toggleModal,
    onClose,
    options1,
    options2,
    headerText,
    onModalSubmit,
    isConfirm,
    conversionData,
    confirmTransaction,
    rejectTransaction,
    isTransaction,
    loader,
  } = props

  const [initialRender, setInitialRender] = useState(true)
  const [formData, setFormData] = useState({ from: 1, to: '' })
  const [dropDownData, setDropDownData] = useState({ from: options1[0], to: options2[0] })
  const [conversionFactor, setConversionFactor] = useState(2)
  const [swapData, setSwapData] = useState({ bonusRatio: 0, tokensSold: '0', tokensLeft: '0' })
  const [swapDivValue, setSwapDivValue] = useState(1)

  const handleChange = (e: any) => {
    try {
      setFormData({ ...formData, [e.target.id]: e.target.value })
    } catch (error) {
      console.log(error)
    }
  }

  const handleBtnChange = (e: any) => {
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

  // Resetting Form
  useEffect(() => {
    fetchValue(formData.from).then(
      (res) => {
        setFormData({ ...formData, to: res })
      },
      (err) => {
        console.log(err)
      }
    )
    // Tokens Sold and Left
    fetchDetails().then(
      (res) => {
        setSwapData({ ...swapData, tokensSold: res['tokensSold'], tokensLeft: res['tokensLeft'] })
        // console.log(res)
      },
      (err) => {
        console.log(err)
      }
    )
  }, [show])

  // Form Data Change From
  useEffect(() => {
    if (!initialRender) {
      const timeOutId = setTimeout(() => {
        if (formData && formData.from && formData.from >= 0) {
          fetchValue(formData.from).then(
            (res) => {
              setFormData({ ...formData, to: res })
            },
            (err) => {
              console.log(err)
            }
          )
        } else {
          setFormData({ ...formData, to: '0' })
        }
      }, 500)
      return () => clearTimeout(timeOutId)

      // setFormData({ ...formData, to: formData.from * conversionFactor });
      // setSwapDivValue(conversionFactor)
    }
    setInitialRender(false)
    setConversionFactor(conversionData[dropDownData.from.key][dropDownData.to.key])
  }, [formData.from, conversionFactor])

  // Form Data Change To
  useEffect(() => {
    if (!initialRender) {
      // setFormData({ ...formData, from: formData.to / conversionFactor });
      setSwapData({ ...swapData, bonusRatio: Number(formData.to) / formData.from })
    }
    setInitialRender(false)
  }, [formData.to])

  // Drop Down Data Change
  useEffect(() => {
    if (!initialRender) {
      if (conversionData && dropDownData) {
        setConversionFactor(conversionData[dropDownData.from.key][dropDownData.to.key])
        // console.log(conversionData[dropDownData.from.key][dropDownData.to.key]);
      }
    }
    setInitialRender(false)
  }, [dropDownData])
  const handleLearnMorePage = () => history.push(Paths.learnMore)
  return (
    <CustomModal show={show} toggleModal={toggleModal}>
      <div className={classes.bcDiv}>
        <ModalHeaderDiv>
          <ModalHeaderText>{headerText}</ModalHeaderText>
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
                  {/* You are swaping your coins from other stable coins.<br />
                  After the confirmation you can check it's status <br /> in your metamask */}
                  You are purchasing KNAB ICO Tokens.
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
                  {/* { (formData.from > 0 || formData.to > 0) ?
                    `${swapDivValue} ${dropDownData.to.name} per ${dropDownData.from.name}` : ''
                  } */}
                  1 USDC per KNAB
                </Typography>
                {/* <CustomButton
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
                </CustomButton> */}
              </div>
            </div>
            <ContaDiv>
              <Typography variant="subtitle2">From</Typography>
              <ContaInnerDiv>
                <DropDownButton options={options1} valueChange={handleBtnChange} />
                <CustomInput id="from" type="number" value={formData.from} onChange={handleChange} adornment="| MAX" />
              </ContaInnerDiv>

              <Typography variant="subtitle2" style={{ paddingTop: '16px' }}>
                To
              </Typography>
              <ContaInnerDiv>
                <DropDownButton options={options2} valueChange={handleBtnChange} />
                <CustomInput id="to" type="number" value={formData.to} onChange={handleChange} adornment="" readOnly />
              </ContaInnerDiv>
            </ContaDiv>
            {/* {(formData.from > 0 || formData.to > 0) ? '': '' */}
            <SwapDetailsDiv>
              <Typography variant="subtitle1">
                ICO Details (
                <span className={classes.learnMoreText} onClick={() => handleLearnMorePage()}>
                  Learn More
                </span>
                )
              </Typography>
              <SwapInnerDiv>
                <div className={classes.eightFiveC}>Current Bonus Ratio</div>
                <div>{swapData.bonusRatio}</div>
              </SwapInnerDiv>
              <SwapInnerDiv>
                <div className={classes.eightFiveC}>Tokens Sold</div>
                {/* <DFlexDiv className={classes.impactValue}> */}
                {/* <ArrowDropUpIcon /> */}
                {swapData.tokensSold}
                {/* </DFlexDiv> */}
              </SwapInnerDiv>
              <SwapInnerDiv>
                <div className={classes.eightFiveC}>Tokens Left</div>
                <div>{swapData.tokensLeft}</div>
              </SwapInnerDiv>
            </SwapDetailsDiv>
            {/* } */}
            <DFlexDiv>
              <CustomButton
                size="large"
                style={{ backgroundColor: '#1E3444', padding: '8px 24px' }}
                // disabled={!(formData.from > 0 || formData.to > 0)}
                disabled={!(formData.from > 0)}
                onClick={() => onModalSubmit(formData)}
              >
                {loader ? <Spinner /> : 'Buy KNAB'}
              </CustomButton>
            </DFlexDiv>
          </div>
        )}
      </div>
    </CustomModal>
  )
}

export default BuyAndConvertModal

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

export const SwapDetailsDiv = styled.div`
  padding: 8px;
  border: 1px solid #ededed;
  margin: 24px 0px;
  border-radius: 5px;
`

export const SwapInnerDiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: '#858585';
  line-height: 24px;
`
