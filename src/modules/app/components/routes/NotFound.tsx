import * as React from 'react'
import styled from 'styled-components'
import PageNotFoundImg from 'assets/images/page-not-found.svg'

const StyledNotFound = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
`
const Title = styled.div`
  font-size: 20px;
  line-height: 26px;
  color: #2b3141;
  font-family: RobotoBold;
`
const Text = styled.div`
  font-size: 14px;
  line-height: 26px;
  color: #676767;
  font-family: RobotoRegular;
`

export function NotFound() {
  return (
    <StyledNotFound>
      <img src={PageNotFoundImg} alt="" />
      <Title>Page Not Found</Title>
      <Text>The page you are looking for was moved, removed, renamed or might never existed</Text>
    </StyledNotFound>
  )
}
