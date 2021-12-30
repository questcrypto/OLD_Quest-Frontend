export const propertyType = [
  {
    label: 'Attached / multi-unit dwellings',
    value: 'Attached / multi-unit dwellings',
    suboptions: ['Apartment', 'Multi-family house', 'Terraced house', 'Condominium', 'Cooperative'],
  },
  { label: 'Semi-dettach dwellings', value: 'Semi-dettach dwellings', suboptions: ['Duplex'] },
  { label: 'Detached dwellings', value: 'Detached dwellings', suboptions: [' Detached house or single-family detached house'] },
  { label: 'Portable dwellings', value: 'Portable dwellings', suboptions: ['Mobile homes or residential caravans', 'Houseboats', 'Tents'] },
  { label: 'Commercial', value: 'Commercial', suboptions: ['Retail', ' Shops', 'Vehicle Garages', 'Warehouses', 'Offices'] },
]

export const zoning = [
  { label: 'Residential for housing', value: 'Residential for housing' },
  { label: 'Commercial for offices', value: 'Commercial for offices' },
  { label: 'Retail for malls or high-street complexes', value: 'Retail for malls or high-street complexes' },
  { label: 'factories and manufacturing units', value: 'factories and manufacturing units' },
  { label: ' Agricultural for farming', value: ' Agricultural for farming' },
  { label: ' Public and semi-public for infrastructure development', value: ' Public and semi-public for infrastructure development' },
  { label: ' Utilities and services for installing basic facilities', value: ' Utilities and services for installing basic facilities' },
  { label: 'Parks and playground for green open spaces', value: 'Parks and playground for green open spaces' },
  { label: ' Mixed land use for urbanised development', value: 'Mixed land use for urbanised development' },
]

export const auctionTabList: any = [
  { label: 'Ongoing', value: 'ongoing' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Participating', value: 'participating' },
  { label: 'Passed', value: 'passed' },
]
export const treasuryTabList: any = [
  {
    label: 'All',
    value: 'All',
  },
  {
    label: 'Published',
    value: 'published',
  },
  // {
  //   label: 'Token To Mint',
  //   value: 'tokenToMint',
  // },
  {
    label: 'Pre-Auction',
    value: 'preAuction',
  },
  {
    label: 'On-Auction',
    value: 'onAuction',
  },
  {
    label: 'Post-Auction',
    value: 'postAuction',
  },
  {
    label: 'End Auction',
    value: 'endAuction',
  },
]

export const propertyTabList = [
  {
    label: 'All',
    value: 'All',
  },
  {
    label: 'Published',
    value: 'published',
  },
  {
    label: 'Approved',
    value: 'approved',
  },
  {
    label: 'Pre-Auction',
    value: 'preAuction',
  },
  {
    label: 'On-Auction',
    value: 'onAuction',
  },
  {
    label: 'Post-Auction',
    value: 'postAuction',
  },
  {
    label: 'New',
    value: 'new',
  },
]

export const treasuryDetailsTabList = [
  {
    label: 'Documents',
    value: 'documents',
  },
  {
    label: 'Token holders',
    value: 'tokenHolders',
  },
  {
    label: 'Transactions',
    value: 'transactions',
  },
]

export const lotFacts = [
  {
    label: 'Interior Lot',
    value: 'Interior Lot',
  },

  { label: 'Corner Lot', value: 'Corner Lot' },

  { label: 'Flag Lot', value: 'Flag Lot' },
  { label: 'Cul-de-Sac Lot', value: 'Cul-de-Sac Lot' },
  { label: 'Key Lot', value: 'Key Lot' },
  { label: 'T-Intersection Lot', value: 'T-Intersection Lot' },
]

export const Landscaping = [
  { label: 'Planting beds', value: 'Planting beds' },
  { label: 'Lawns', value: 'Lawns' },
  { label: 'Shrubs', value: 'Shrubs' },
  { label: 'Flowering trees', value: 'Flowering trees' },
  { label: 'Foundation plantings', value: 'Foundation plantings' },
  { label: 'Driveways ', value: 'Driveways' },
  { label: 'Walkways', value: 'Walkways' },
  { label: 'Fences', value: 'Fences' },
  { label: 'Fountains', value: 'Fountains' },
  { label: 'Water gardens', value: 'Water gardens' },
]

export const RoomConstants = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
]

export const BoolValue = [
  { label: 'yes', value: 'yes' },
  { label: 'no ', value: 'no' },
]

export const RoofValues = [
  { label: 'Asphalt Shingles ', value: 'Asphalt Shingles ' },
  { label: 'Clay and Concrete Tile Roofing ', value: 'Clay and Concrete Tile Roofing ' },
  { label: 'Slate Roofing ', value: 'Slate Roofing ' },
  { label: 'Metal Roofing ', value: 'Metal Roofing ' },
  { label: ' Wood Roofing', value: ' Wood Roofing' },
  { label: 'Standing Seam Metal Roofing ', value: 'Standing Seam Metal Roofing ' },
  { label: 'Corrugated Steel Roofing ', value: 'Corrugated Steel Roofing ' },
  { label: 'Aluminum Shingles ', value: 'Aluminum Shingles ' },
  { label: 'Stone-Coated Steel Shingles ', value: 'Stone-Coated Steel Shingles ' },
  { label: 'Green Roofing ', value: 'Green Roofing ' },
  { label: 'Cedar Shingles and Shakes ', value: 'Cedar Shingles and Shakes ' },
  { label: 'Rolled Roofing ', value: 'Rolled Roofing ' },
  { label: 'Solar Tiles ', value: 'Solar Tiles ' },
  { label: 'Fiberglass Shingles ', value: 'Fiberglass Shingles ' },
  { label: 'Membrane Roofing', value: 'Membrane Roofing' },
]

export const FloorValues = [
  { label: 'Carpet', value: 1, suboptions: [] },
  { label: ' Hardwood', value: 2, suboptions: ['Solid hardwood flooring ', 'Engineered hardwood flooring'] },
  {
    label: 'Laminate ',
    value: 3,
    suboptions: ['Pine, maple, cherry, oak and other hardwoods', 'Stone, marble, limestone, slate and travertine'],
  },
  { label: 'Vinyl ', value: 4, suboptions: ['Hardwood', 'High-end stones such as marble'] },
  { label: 'Tile ', value: 5, suboptions: ['Ceramic', 'Porcelain', 'Natural stone', 'Mosaic glass, metal, cement and engineered tile'] },
  { label: 'Bamboo ', value: 6, suboptions: [] },
  { label: ' Cork', value: 7, suboptions: [] },
  { label: 'Rubber ', value: 8, suboptions: [] },
  { label: 'Gym ', value: 9, suboptions: [] },
]

export const WindowValues = [
  { label: 'Blinds ', value: 1, isParent: true },
  { label: 'Wood', value: 'wood', isParent: false },
  { label: 'Faux Wood', value: 'Faux Wood', isParent: false },
  { label: 'Mini', value: 'Mini', isParent: false },
  { label: 'Vertical', value: 'Vertical', isParent: false },
  { label: 'Shades ', value: 2, isParent: true },
  { label: 'Cellular', value: 'Cellular', isParent: false },
  { label: 'Pleated', value: 'Pleated', isParent: false },
  { label: 'Outdoor', value: 'Outdoor', isParent: false },
  { label: 'Roller', value: 'Roller', isParent: false },
  { label: 'Drapes or Curtains ', value: 3, isParent: true },
  { label: 'Shutters', value: 'Shutters', isParent: false },
  { label: '1 1/4-inch', value: '1 1/4-inch', isParent: false },
  { label: '2 1/2-inch', value: '2 1/2-inch', isParent: false },
  { label: '3 1/2-inch', value: '3 1/2-inch', isParent: false },
  { label: '4 1/2-inch louve', value: '4 1/2-inch louve', isParent: false },
]

export const PoolValues = [
  {
    label: 'Inground ',
    value: 'Inground',
    suboptions: ['Concrete With Plaster or Aggregate Finishes', 'Alternative Finishes', 'Fiberglass', 'Vinyl'],
  },
  { label: 'Above Ground ', value: 'Above Ground', suboptions: ['Easy Set / Inflatable ', 'Steel Frame', 'Traditional', 'Semi-Inground '] },
]

export const Size = [
  { label: 'Above Ground ', value: 1, isParent: true },
  { label: '24 x 52 Round (most popular)', value: '', isParent: false },
  { label: '21 x 52 Round', value: '21 x 52 Round', isParent: false },
  { label: '15 x 30 x 52 Oval', value: '21 x 52 Round', isParent: false },
  { label: 'Inground Vinyl ', value: 2, isParent: true },
  { label: '16 x 32 Rectangle (most popular)', value: '16 x 32 Rectangle (most popular)', isParent: false },
  { label: '18 x 36 Rectangle', value: '18 x 36 Rectangle', isParent: false },
  { label: '20 x 40 Rectangle', value: '20 x 40 Rectangle', isParent: false },
  { label: 'Concrete ', value: 3, isParent: true },
  { label: '16 x 32 Kidney Shape', value: '16 x 32 Kidney Shape', isParent: false },
]
export const WaterFeature = [
  { label: 'Spillover Spa ', value: 'Spillover Spa ' },
  { label: 'Waterfall ', value: 'Waterfall' },
  { label: 'Curtain ', value: 'Curtain' },
  { label: 'Deck Jet ', value: 'Deck Jet' },
  { label: 'Bubblers ', value: 'Bubblers' },
  { label: 'Spouts ', value: 'Spouts' },
  { label: 'Grotto ', value: 'Grotto' },
]

export const PatioValue = [
  { label: 'Paver ', value: 'Paver' },
  { label: 'Brick ', value: 'Brick' },
  { label: 'Flagstone ', value: 'Flagstone' },
  { label: 'Gravel ', value: 'Gravel' },
  { label: 'Slate ', value: 'Slate' },
  { label: 'Concrete ', value: '6' },
  { label: 'Exposed aggregate finish ', value: 'Exposed aggregate finish ' },
  { label: 'Salt finish ', value: 'Salt finish' },
  { label: 'Stamped ', value: 'Stamped' },
  { label: 'Stained ', value: 'Stained' },
]

export const StyleFeature = [
  { label: 'Cape Cod ', value: 'Cape Cod' },
  { label: 'Country French ', value: 'Country French' },
  { label: 'Colonial ', value: 'Colonial' },
  { label: 'Victorian ', value: 'Victorian' },
  { label: 'Tudor ', value: 'Tudor' },
  { label: 'Play Up Tudor ', value: 'Tudor' },
  { label: 'Craftsman ', value: 'Craftsman' },
  { label: 'Add Craftsman ', value: 'Add Craftsman ' },
  { label: 'Cottage ', value: 'Cottage' },
  { label: 'Mediterranean ', value: 'Mediterranean' },
  { label: 'Traditional Ranch ', value: 'Traditional Ranch' },
  { label: 'Contemporary ', value: 'Contemporary' },
  { label: 'New Home Additions ', value: 'New Home Additions' },
]

export const DeckFeature = [
  { label: 'Wraparound ', value: 'Wraparound' },
  { label: 'Multi-Tier ', value: 'Multi-Tier' },
  { label: 'Attached ', value: 'Attached' },
  { label: 'Detached ', value: 'Detached' },
  { label: 'Rooftop/Over Garage ', value: 'Rooftop/Over Garage ' },
]

export const usaCountry = [
  {
    label: 'Alabama',
    value: 'AL',
  },
  {
    label: 'Alaska',
    value: 'AK',
  },
  {
    label: 'American Samoa',
    value: 'AS',
  },
  {
    label: 'Arizona',
    value: 'AZ',
  },
  {
    label: 'Arkansas',
    value: 'AR',
  },
  {
    label: 'California',
    value: 'CA',
  },
  {
    label: 'Colorado',
    value: 'CO',
  },
  {
    label: 'Connecticut',
    value: 'CT',
  },
  {
    label: 'Delaware',
    value: 'DE',
  },
  {
    label: 'District Of Columbia',
    value: 'DC',
  },
  {
    label: 'Federated States Of Micronesia',
    value: 'FM',
  },
  {
    label: 'Florida',
    value: 'FL',
  },
  {
    label: 'Georgia',
    value: 'GA',
  },
  {
    label: 'Guam',
    value: 'GU',
  },
  {
    label: 'Hawaii',
    value: 'HI',
  },
  {
    label: 'Idaho',
    value: 'ID',
  },
  {
    label: 'Illinois',
    value: 'IL',
  },
  {
    label: 'Indiana',
    value: 'IN',
  },
  {
    label: 'Iowa',
    value: 'IA',
  },
  {
    label: 'Kansas',
    value: 'KS',
  },
  {
    label: 'Kentucky',
    value: 'KY',
  },
  {
    label: 'Louisiana',
    value: 'LA',
  },
  {
    label: 'Maine',
    value: 'ME',
  },
  {
    label: 'Marshall Islands',
    value: 'MH',
  },
  {
    label: 'Maryland',
    value: 'MD',
  },
  {
    label: 'Massachusetts',
    value: 'MA',
  },
  {
    label: 'Michigan',
    value: 'MI',
  },
  {
    label: 'Minnesota',
    value: 'MN',
  },
  {
    label: 'Mississippi',
    value: 'MS',
  },
  {
    label: 'Missouri',
    value: 'MO',
  },
  {
    label: 'Montana',
    value: 'MT',
  },
  {
    label: 'Nebraska',
    value: 'NE',
  },
  {
    label: 'Nevada',
    value: 'NV',
  },
  {
    label: 'New Hampshire',
    value: 'NH',
  },
  {
    label: 'New Jersey',
    value: 'NJ',
  },
  {
    label: 'New Mexico',
    value: 'NM',
  },
  {
    label: 'New York',
    value: 'NY',
  },
  {
    label: 'North Carolina',
    value: 'NC',
  },
  {
    label: 'North Dakota',
    value: 'ND',
  },
  {
    label: 'Northern Mariana Islands',
    value: 'MP',
  },
  {
    label: 'Ohio',
    value: 'OH',
  },
  {
    label: 'Oklahoma',
    value: 'OK',
  },
  {
    label: 'Oregon',
    value: 'OR',
  },
  {
    label: 'Palau',
    value: 'PW',
  },
  {
    label: 'Pennsylvania',
    value: 'PA',
  },
  {
    label: 'Puerto Rico',
    value: 'PR',
  },
  {
    label: 'Rhode Island',
    value: 'RI',
  },
  {
    label: 'South Carolina',
    value: 'SC',
  },
  {
    label: 'South Dakota',
    value: 'SD',
  },
  {
    label: 'Tennessee',
    value: 'TN',
  },
  {
    label: 'Texas',
    value: 'TX',
  },
  {
    label: 'Utah',
    value: 'UT',
  },
  {
    label: 'Vermont',
    value: 'VT',
  },
  {
    label: 'Virgin Islands',
    value: 'VI',
  },
  {
    label: 'Virginia',
    value: 'VA',
  },
  {
    label: 'Washington',
    value: 'WA',
  },
  {
    label: 'West Virginia',
    value: 'WV',
  },
  {
    label: 'Wisconsin',
    value: 'WI',
  },
  {
    label: 'Wyoming',
    value: 'WY',
  },
]

export const CountryConstant = [
  {
    label: 'USA',
    value: 'USA',
  },
]
