export const getPropertyType = (type: number) => {
  switch (type) {
    case 0:
      return 'Single Family Residence'
    case 1:
      return 'Multi Family Residence'
    case 2:
      return 'Commercial'
    case 3:
      return 'Developing Land'
    case 4:
      return 'RawLand'
    default:
      return ''
  }
}
