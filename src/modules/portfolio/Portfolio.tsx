import { useState } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Input,
  InputAdornment,
} from '@material-ui/core';

import {
  useStyles,
  DFlexDiv,
  ModalHeaderDiv,
  ModalHeaderText,
  ContaDiv,
  ContaInnerDiv,
  SwapDetailsDiv,
  SwapInnerDiv
} from './style';
import CustomButton from './components/shared/Button';
import Question from '../../assets/icons/question.svg';
import CustomModal from '../../shared/custom-modal/CustomModal';
import closeIcon from 'assets/icons/closeIcon.svg';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import DropDownButton from './components/shared/DropDownButton';
import CustomInput from './components/shared/CustomInput';
import MaticIcon from 'assets/icons/matic.svg';
import KnabDummy from 'assets/icons/knab_dummy.svg';
import MoreWithCrypto from './components/MoreWithCrypto';
import YourAssets from './components/YourAssets';

const Portfolio = (props: any) => {

  const classes = useStyles();

  const [pb, setPb] = useState(0.00);
  const [bcQuestModal, setBcQuestModal] = useState(false);

  const openbcQuestModal = () => {
    try {
      setBcQuestModal(true);
    } catch (error) { console.log(error) }
  }

  const handlebcQuestModalClose = () => {
    try {
      setBcQuestModal(false);
    } catch (error) { console.log(error) }
  }

  return (
    <div className={classes.root}>

      <div className={classes.header}>
        <Typography className={classes.title} variant="h6" >Portfolio</Typography>
        <div className={classes.btnDiv}>
          <CustomButton
            size="small"
            disableElevation
            disableFocusRipple
            disableRipple
            style={{ backgroundColor: '#858585', padding: '0px 16px' }}
          >
            00.00 KNABr
          </CustomButton>&nbsp;&nbsp;&nbsp;
          <CustomButton
            size="small"
            disableElevation
            disableFocusRipple
            disableRipple
            style={{ backgroundColor: '#858585', padding: '0px 16px' }}
          >
            00.00 KNAB
          </CustomButton>&nbsp;&nbsp;&nbsp;
          <CustomButton
            size="small"
            style={{ backgroundColor: '#1E3444', padding: '0px 16px' }}
          >
            Real Estate Auctions
          </CustomButton>&nbsp;&nbsp;&nbsp;
          <CustomButton
            size="small"
            onClick={openbcQuestModal}
            style={{ backgroundColor: '#1E3444', padding: '0px 16px' }}
          >
            Buy | Convert Quest
          </CustomButton>&nbsp;&nbsp;&nbsp;
          <CustomButton
            size="small"
            style={{ backgroundColor: '#1E3444', padding: '0px 16px' }}
          >
            Buy | Convert KNAB
          </CustomButton>
        </div>
      </div>

      <Grid container spacing={4} style={{ padding: '32px 0px' }}>

        <Grid item md={7} xs={12}>

          <Paper className={classes.portfolioDiv}>
            <Typography variant="subtitle1">
              Portfolio Balance
            </Typography>
            <div>
              <Typography variant="h4">
                {pb.toFixed(2)}
                <img src={Question} alt="question" style={{ position: 'relative', left: '6px', bottom: '2px' }} />
              </Typography>
            </div>
            <div className={classes.pfBtnDiv}>
              <div>
                <CustomButton
                  size="large"
                  style={{ backgroundColor: '#1E3444', padding: '8px 80px' }}
                >
                  Buy Quest Tokens
                </CustomButton><br />
                <span className={classes.pfBtnhelpText}>Purchase Equity in Real Estate</span>
              </div>
              <div>
                <CustomButton
                  size="large"
                  style={{ backgroundColor: '#1E3444', padding: '8px 80px' }}
                >
                  Buy KNAB Tokens
                </CustomButton><br />
                <span className={classes.pfBtnhelpText}>Purchase ICO tokens from Quest Crypto</span>
              </div>
            </div>
          </Paper>

          <YourAssets />
        </Grid>

        <Grid item md={5} xs={12}>
          <MoreWithCrypto />
        </Grid>
      </Grid>

      {/* Buy or Convert Quest Modal */}
      <CustomModal show={bcQuestModal} toggleModal={handlebcQuestModalClose}>
        <div className={classes.bcQuestDiv}>
          <ModalHeaderDiv>
            <ModalHeaderText>Buying | Converting Quest Tokens</ModalHeaderText>
            <div onClick={handlebcQuestModalClose}>
              <img src={closeIcon} alt='close' style={{ width: '12px', height: '12px' }} />
            </div>
          </ModalHeaderDiv>
          <div className={classes.line}></div>
          <div className={classes.swapDiv}>
            <Typography variant="subtitle2" className={classes.swapDivText}>Price</Typography>
            <CustomButton
              size="small"
              style={{ backgroundColor: '#C4C4C4', color: '#000000' }}
            >
              <SwapVertIcon />
            </CustomButton>
          </div>
          <ContaDiv>
            <Typography variant="subtitle2">From</Typography>
            <ContaInnerDiv>
              <DropDownButton
                options={options}
              />
              <CustomInput id="1" type="number" />
            </ContaInnerDiv>

            <Typography variant="subtitle2" style={{ paddingTop: '16px' }}>To</Typography>
            <ContaInnerDiv>
              <DropDownButton
                options={options}
              />
              <CustomInput id="1" type="number" />
            </ContaInnerDiv>
          </ContaDiv>
          <SwapDetailsDiv>
            <Typography variant="subtitle1">Swap Details</Typography>
            <SwapInnerDiv>
              <div>Minimum Received</div>
              <div>17.77 USDT</div>
            </SwapInnerDiv>
            <SwapInnerDiv>
              <div>Price Impact</div>
              <div>0.01%</div>
            </SwapInnerDiv>
            <SwapInnerDiv>
              <div>Liquidity Provider Fee</div>
              <div>0.03% Quest</div>
            </SwapInnerDiv>
          </SwapDetailsDiv>
          <DFlexDiv>
            <CustomButton
              size="large"
              style={{ backgroundColor: '#1E3444', padding: '8px 24px' }}
            >
              Submit
            </CustomButton>
          </DFlexDiv>
        </div>
      </CustomModal>

    </div>
  )
}

const options = [{ name: 'Matic', icon: MaticIcon }, { name: 'Knab', icon: KnabDummy }]

export default Portfolio;
