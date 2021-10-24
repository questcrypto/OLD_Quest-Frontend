import styled from 'styled-components'

export const Container = styled.div<any>`
  color: ${(props: any) => (props.abc ? 'red' : 'green')};
`
