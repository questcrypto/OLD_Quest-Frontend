import {
  AddAnotherFloorCont,
  FloorDetailsArr,
  FloorDetailsCont,
  FloorFieldMsgBox,
  FormTitle,
  FormTitleNumber,
  useStyle,
  useStyle01,
} from '../style'
import { Divider, Grid } from '@material-ui/core'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Typography from '@material-ui/core/Typography'
import IntegerNumberField from 'shared/components/Integer-number-field'
import { ErrorMessage } from 'formik'
import { err } from 'shared/styles/styled'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import FieldSelect from 'shared/components/field-select'
import { BoolValue, RoomConstants } from 'shared/helpers/dataConstant'

const FloorConfigSection = (props: any) => {
  const classes = useStyle()
  const classes01 = useStyle01()

  const { values } = props

  const handleAddFloorDetails = (arrayHelpers: any) => {
    arrayHelpers.push({ id: Math.random(), floor: '', SquareFoot: '', Bedroom: '', family: '', kitchen: '', Laundary: '', Bath: '' })
  }

  return (
    <>
      <Grid item xs={2} className={classes.titleNumberStyle}>
        <FormTitleNumber>8</FormTitleNumber>
      </Grid>
      <Grid item xs={10} container direction="column">
        <Grid item className={classes.formGroup}>
          <FormTitle>Floor Wise Configuration</FormTitle>
          <FloorDetailsArr
            name="FloorDetails"
            render={(arrayHelpers) => (
              <div>
                {values.FloorDetails.map((ref: any, index: number) => (
                  <FloorDetailsCont key={ref.id}>
                    <Accordion defaultExpanded>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} className={classes01.headerStyle}>
                        <Typography className={classes01.heading}>Floor {index + 1}</Typography>
                      </AccordionSummary>
                      <AccordionDetails className={classes01.detailsCont}>
                        <FloorFieldMsgBox>
                          <IntegerNumberField label="Square Foot" name={`FloorDetails[${index}].SquareFoot`} />
                        </FloorFieldMsgBox>
                        <ErrorMessage component={err} name={`FloorDetails[${index}].SquareFoot`} />
                        <FieldSelect label="Bedroom" name={`FloorDetails[${index}].Bedroom`} options={RoomConstants} showTooltip = {true}/>
                        <ErrorMessage component={err} name={`FloorDetails[${index}].Bedroom`} />
                        <FieldSelect label="Family" name={`FloorDetails[${index}].family`} options={BoolValue} showTooltip = {true}/>
                        <ErrorMessage component={err} name={`FloorDetails[${index}].family`} />
                        <FieldSelect label="Kitchen" name={`FloorDetails[${index}].kitchen`} options={BoolValue} showTooltip = {true}/>
                        <ErrorMessage component={err} name={`FloorDetails[${index}].kitchen`} />
                        <FieldSelect label="Laundary" name={`FloorDetails[${index}].Laundary`} options={BoolValue} showTooltip = {true}/>
                        <ErrorMessage component={err} name={`FloorDetails[${index}].Laundary`} />
                        <FieldSelect label="Bathrooms" name={`FloorDetails[${index}].Bath`} options={RoomConstants} showTooltip = {true}/>
                        <ErrorMessage component={err} name={`FloorDetails[${index}].Bath`} />
                      </AccordionDetails>
                    </Accordion>
                    {values.FloorDetails.length > 1 && (
                      <DeleteIcon className={classes01.deleteBtn2Style} onClick={() => arrayHelpers.remove(index)} />
                    )}
                  </FloorDetailsCont>
                ))}
                <AddAnotherFloorCont onClick={() => handleAddFloorDetails(arrayHelpers)}>
                  <AddIcon />
                  <span>Add Another Floor</span>
                </AddAnotherFloorCont>
              </div>
            )}
          />
        </Grid>
        <Divider className={classes.dividerStyle} />
      </Grid>
    </>
  )
}

export default FloorConfigSection
