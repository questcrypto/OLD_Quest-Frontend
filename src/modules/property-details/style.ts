import styled from 'styled-components'
import { FieldArray } from 'formik'
import { colors } from 'shared/styles/theme'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 1010,
      marginTop: 100,
      height: 650,
    },

    image: {
      width: 511,
      height: 385,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    table: {
      minWidth: 650,
    },

    features: {
      display: 'flex',
      width: '100%',
      height: '40px',
    },
    feature1: {
      flex: '1',
    },
    feature2: {
     flex: '2',
      marginbottom: '20px',
    }
  })
)

