import { createStyles, makeStyles } from '@material-ui/core/styles'
import { FlexRow } from 'modules/portfolio/Staking/style'
import { callbackify } from 'util'

export const useStyles = makeStyles(() =>
  createStyles({
    buttonRow: {
      display: 'flex',
      flexDirection: 'row',
    },
  })
)
