export const ERC1155FACTORYABI: any = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_baseURI',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'treasuryAdmimAddress',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: '_parentHash',
        type: 'bytes',
      },
      {
        internalType: 'address',
        name: 'propertyOwnerAddress',
        type: 'address',
      },
    ],
    name: 'deployPropertyToken',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
