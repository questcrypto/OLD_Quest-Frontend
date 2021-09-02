
import closeIcon from 'assets/icons/closeIcon.svg'
import { makeStyles } from '@material-ui/core'
import styled from 'styled-components'
import { SignUp } from 'modules/auth'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

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
  }
}))

const SignUpModal = (props: any) => {

  const classes = useStyles()

  const { toggle } = props;

  return (
    <div className={classes.dcDiv}>
      {/* <ModalHeaderDiv>
        <ModalHeaderText>Sign Up / Sign In</ModalHeaderText>
        <div onClick={toggle}>
          <img src={closeIcon} alt="close" className={classes.closeIcon} />
        </div>
      </ModalHeaderDiv> */}
      <SignUp />
    </div>
  );
}

export default SignUpModal;

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