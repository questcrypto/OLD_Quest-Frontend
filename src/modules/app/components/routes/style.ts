import styled from 'styled-components'
import { colors } from 'shared/styles/theme'

export const StyledRoutesWrapper = styled.div`
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
`
export const StyledRoutesContainer = styled.div<any>`
  display: grid;
  grid-template-columns: ${(props: any) => (props.contStatus ? '1fr 7fr' : '1fr')};
  grid-gap: ${(props: any) => (props.contStatus ? '50px' : 0)};
`
export const LeftContainer = styled.div`
  max-width: 180px;
  background: ${colors.white};
`
export const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 30px;
`

export const StyledRoutes = styled.div`
  box-sizing: border-box;
`
