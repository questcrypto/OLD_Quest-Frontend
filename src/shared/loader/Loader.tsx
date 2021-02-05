import React from 'react'
import { LoaderContainer } from './style'
import loading from 'assets/image/questLoader.svg'

const Loader = () => (
  <LoaderContainer>
    <img src={loading} alt="Loading..." />
  </LoaderContainer>
)

export default Loader
