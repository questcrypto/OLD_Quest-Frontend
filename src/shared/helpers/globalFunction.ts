import moment from 'moment'
export const getPropertyType = (type: number) => {
  switch (type) {
    case 1:
      return 'Single Family Residence'
    case 2:
      return 'Multi Family Residence'
    case 3:
      return 'Commercial'
    case 4:
      return 'Developing Land'
    case 5:
      return 'RawLand'
    default:
      return ''
  }
}
export const getFullName = (firstName: string, lastName: string) => {
  let fName = ''
  let lName = ''
  if (firstName) {
    fName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
  }
  if (lastName) {
    lName = lastName.charAt(0).toUpperCase() + lastName.slice(1)
  }
  const fullName = `${fName} ${lName}`

  return fullName
}
export const getDaysValue = (startData: any, endDate: any) => {
  const a = moment(startData)
  const b = moment(endDate)
  const duration = b.diff(a, 'days')
  return duration
}
