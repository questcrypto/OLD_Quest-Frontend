import styled from 'styled-components'
import { createStyles, makeStyles } from '@material-ui/core/styles'

export const TextIcon = styled.div`
    position:unset;
`
export const UseStyle = makeStyles(() =>
  createStyles({
    
    infoIcon: {
        position: 'absolute',
        right: '-52px',
      }
  })
)
