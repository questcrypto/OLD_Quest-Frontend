import React from 'react'
import { useStyles } from './FilterButtonStyle'
const FilterButton = (props: any) => {
  const { showButtonName, setShowButtonName } = props
  const classes = useStyles()

  const handleClearButton = (id: number) => {
    const filterButtonNameData = showButtonName.filter((item: any, index: number) => {
      if (index !== id) {
        return item
      }
    })
    setShowButtonName([...filterButtonNameData])
  }
  return (
    <div className={classes.buttonRow}>
      {showButtonName.map((item: any, index: number) => (
        <div className={classes.CheckboxButton} >
          {item}
          <div className={classes.CloseIcon} onClick={() => handleClearButton(index)}>
          <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M6.96875 6L10.3438 2.65625C10.5312 2.46875 10.5312 2.125 10.3438 1.9375L9.5625 1.15625C9.375 0.96875 9.03125 0.96875 8.84375 1.15625L5.5 4.53125L2.125 1.15625C1.9375 0.96875 1.59375 0.96875 1.40625 1.15625L0.625 1.9375C0.4375 2.125 0.4375 2.46875 0.625 2.65625L4 6L0.625 9.375C0.4375 9.5625 0.4375 9.90625 0.625 10.0938L1.40625 10.875C1.59375 11.0625 1.9375 11.0625 2.125 10.875L5.5 7.5L8.84375 10.875C9.03125 11.0625 9.375 11.0625 9.5625 10.875L10.3438 10.0938C10.5312 9.90625 10.5312 9.5625 10.3438 9.375L6.96875 6Z" fill="#8C8C8C"></path></svg>
          </div>
        </div>
      ))}
      {showButtonName.length > 0 ? (
        <div
          className={classes.CheckboxButton}
          onClick={() => {
            setShowButtonName([])
          }}
        >
          Clear All
        </div>
      ) : null}
    </div>
  )
}

export default FilterButton
