import styled from 'styled-components'
import { colors } from 'shared/styles/theme'

export const TabTitle = styled.p<any>`
  margin: 0;
  font-size: 16px;
  opacity: ${(props: any) => (props.active ? 1 : 0.87)};
  color: ${(props: any) => (props.active ? colors.primary : colors.textPrimary)};
  cursor: pointer;
  text-align: center;
  border-bottom: ${(props: any) => (props.active ? `1px solid ${colors.primary}` : 'none')};
  padding: 0 1px 20px 1px;
  &:hover {
    color: ${colors.primary};
  }
`
