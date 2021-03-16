import React from 'react'
import emptyPageImg from '../../assets/images/emptyPage.svg'
import { EmptyPageWrapper } from './style'

interface Props {
  name: string
}

const EmptyPage = (props: Props) => {
  return (
    <EmptyPageWrapper>
      <img src={emptyPageImg} alt="No Data Here"></img>
      <h1>Seems no properties is listed!</h1>
      <p>Currently no property is listed {props.name}, please come back later</p>
    </EmptyPageWrapper>
  )
}

export default EmptyPage
