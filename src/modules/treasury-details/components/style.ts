import styled from 'styled-components'
import { colors } from 'shared/styles/theme'

export const FeatureInfo = styled.div`
  display: flex;
  align-item: center;
  justify-content: space-between;
  margin-bottom: 30px;
`
export const FeatureName = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
  span {
    font-size: 15px;
    color: ${colors.textPrimary};
    opacity: 0.6;
  }
  img {
    margin-right: 10px;
    opacity: 1 !important;
  }
`
export const FeatureValue = styled.p`
  margin: 0;
  font-size: 15px;
  color: ${colors.textPrimary};
  width: 40%;
  text-align: left;
`
