import moment from 'moment'
import dateFormat from 'dateformat'

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

export function formatDateString(date: Date | string): string {
  let dateValue: string = ''
  if (typeof date === 'string') {
    dateValue = dateFormat(date.split('T')[0].replace(/\-/g, '/'), 'mm/dd/yyyy')
  } else {
    dateValue = dateFormat(date, 'mm/dd/yyyy')
  }
  return dateValue
}

export function formatExtendedDateString(date: Date | string): string {
  let dateValue: string = ''
  if (typeof date === 'string') {
    dateValue = dateFormat(date.split('T')[0].replace(/\-/g, '/'), 'dd mmm yyyy')
  } else {
    dateValue = dateFormat(date, 'dd mmm yyyy')
  }
  return dateValue
}

export const toCommaNumber = (value: number | string) => {
  const parts = value.toString().split('.')
  const first = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  return [first].concat(parts.slice(1)).join('.')
}

export function usdFormatString(value: number, decimalPlaces: number = 4): string {
  const isNegative = value < 0
  const negativePrefix = isNegative ? '- ' : ''
  const result = negativePrefix + '$ ' + toCommaNumber(Math.abs(value).toFixed(decimalPlaces))
  return decimalPlaces === 2 ? result : result.replace(/\.?0?0?$/, '')
}

export function currencyString(value?: number, decimalPlaces?: number): string | undefined {
  return typeof value == 'number'
    ? usdFormatString(value, decimalPlaces)
    : undefined
}
