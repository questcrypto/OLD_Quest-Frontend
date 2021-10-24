import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    colorPrimary: {
      color: '#1E3444',
    },
  })
)
const ProgressBar = () => {
  const classes = useStyles()
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(() => {
        return 70
      })
    }, 300)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className={classes.root}>
      <LinearProgress variant="determinate" value={progress} />
    </div>
  )
}

export default ProgressBar
