import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles'

export const useStyle = makeStyles({
  root: { background: 'red' },
  inputStyle: { margin: '50px', required: true },
})

export const Container = styled.div<any>`
  color: ${(props: any) => (props.abc ? 'red' : 'green')};
`
