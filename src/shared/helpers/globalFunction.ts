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
