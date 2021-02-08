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
      backgroundColor: '#F5F5F5',
    },

    image: {
      width: 450,
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
    },
    DocUploads: {
      flex: '50%',
      alt: 'files',
      height: '50px',
      width: '50px',
      color: '#1E3444',
      marginLeft: '25px',
      marginBottom: '25px',
      backgroundColor: '#F5F5F5',
    },
    BtnDocUploads: {
      flex: '50%',
      variant: 'outlined',
      color: '#302E35',
      marginLeft: '20px',
      backgroundColor: '#E0E0E0',
    },
  })
)

// export const Paper = styled.div`
// display: flex,
//   img {
//     alt:"files",
//     height:"50px",
//     width:"50px",
//     style{{
//     color: '#1E3444',
//     marginLeft: '25px',
//      marginBottom: '25px',
//     } }
   
// `

