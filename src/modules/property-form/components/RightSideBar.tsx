import { Grid } from '@material-ui/core'
import { FormTitle, FormTitleNumber } from '../style'
import { sideBarOptionData } from './SideBarOptions'

const RightSieBar = (props: any) => {
  const { classes, executeScroll } = props
  return (
    <div className="rightSectionWrapper">
    {sideBarOptionData.map(options =>
      <Grid container>
        <Grid item xs={2} className={classes.titleNumberStyle}>
          <FormTitleNumber>{options.number}</FormTitleNumber>
        </Grid>
        <Grid item xs={10} container direction="column" className="title-container" onClick={() => executeScroll(options.number)}>
          <Grid item className={classes.formGroup}>
            <FormTitle>{options.name}</FormTitle>
          </Grid>
        </Grid>
      </Grid>
    )}
  </div>
  )
}

export default RightSieBar
