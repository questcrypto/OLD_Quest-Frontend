export const SLCContractAddress = '0xbC83d3996bDC072E4Afd37BBF79A902C601bEBa6'
export const SLFContractAddress = '0xD0d211f4faF5F5964095756214Cf330163b1e4e5'
export const DAIContractAddress = '0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735'
export const auctionContractAddress = '0xDC0c1218499E98cEfd8941b2014945Fcaa060259'
export const treasuryAddress = '0xF51632261987F4578425Ca91a48117E11516a4CF'
export const mintNft = '0x6d07776B7530f06A9844e06dB52a7F2a36632c46'

export const slcAbi: any = [
  {
    inputs: [
      {
        internalType: 'string',
        name: '_name',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_symbol',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: '_decimals',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_initialSupply',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_AUCTION_DEPLOYED_ADDRESS',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_spender',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'DepositFunds',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'RegionAdminAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'RegionAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'auc_id',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'bid_add',
        type: 'address',
      },
    ],
    name: 'SLC_TOKEN_TRANSFER_SUCCESS',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'ownerAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'ownerRemoved',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'region_no',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
    ],
    name: 'ADD_REGION_ADMIN',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'AUCTION_DEPLOYED_ADDRESS',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_region_no',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
    ],
    name: 'CHANGE_REGION_ADMIN',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'uid',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'property_id',
        type: 'string',
      },
    ],
    name: 'EndAuction',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'uid',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 's_date',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'e_date',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'res_price',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'sl_reserve',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'noOfTokens',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'property_id',
        type: 'string',
      },
    ],
    name: 'EnlistAuction',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'auctionID',
        type: 'string',
      },
      {
        internalType: 'address',
        name: 'Treasury_Admin',
        type: 'address',
      },
    ],
    name: 'GET_AUCTION_WIN_SLC',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'GET_WIN_SLC',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'MINT_SLC',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'REGION_NO_TO_ADMIN_ADDRESS',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
    ],
    name: 'SET_AUCTION_DEPLOYED_ADDRESS',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'auctionID',
        type: 'string',
      },
      {
        internalType: 'address[]',
        name: 'BiddersArray',
        type: 'address[]',
      },
      {
        internalType: 'uint256[]',
        name: 'BidAmount',
        type: 'uint256[]',
      },
    ],
    name: 'STORE_AUCTION_TOKENS_TO_BE_GIVEN',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: '_owners',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'addOwner',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'allowance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_spender',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'approve',
    outputs: [
      {
        internalType: 'bool',
        name: 'success',
        type: 'bool',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'request',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'balances',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_oldAddress',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_newAddress',
        type: 'address',
      },
    ],
    name: 'modify',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'removeOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_from',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    name: 'safetransferFrom',
    outputs: [
      {
        internalType: 'bool',
        name: 'success',
        type: 'bool',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'walletBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
]

export const selfAbi: any = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: 'string', name: 'ID', type: 'string' }],
    name: 'PROPERTY_TOKENS_MINTED',
    type: 'event',
  },
  {
    inputs: [],
    name: 'AUCTION_DEPLOYED_ADDRESS',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_origValue', type: 'uint256' },
      { internalType: 'uint256', name: '_currValue', type: 'uint256' },
      { internalType: 'uint256', name: '_coins_issued', type: 'uint256' },
      { internalType: 'uint256', name: '_equity_at_issuance', type: 'uint256' },
      { internalType: 'uint256', name: '_varriation', type: 'uint256' },
      { internalType: 'uint256', name: '_current_coin_value', type: 'uint256' },
      { internalType: 'uint256', name: '_orig_issue_rate', type: 'uint256' },
      { internalType: 'uint256', name: '_next_schedule_reevaluation', type: 'uint256' },
      { internalType: 'string', name: 'token_uri', type: 'string' },
      { internalType: 'string', name: 'propertyID', type: 'string' },
    ],
    name: 'ListProperty_details',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MINTNFT_DEPLOYED_ADDRESS',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: '', type: 'string' }],
    name: 'PROPERTY_ERC20_ADDRESS',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: '', type: 'string' }],
    name: 'PROP_INFO',
    outputs: [
      { internalType: 'uint256', name: 'origValue', type: 'uint256' },
      { internalType: 'uint256', name: 'currValue', type: 'uint256' },
      { internalType: 'uint256', name: 'coins_issued', type: 'uint256' },
      { internalType: 'uint256', name: 'equity_at_issuance', type: 'uint256' },
      { internalType: 'uint256', name: 'Total_Current_Value', type: 'uint256' },
      { internalType: 'uint256', name: 'Varriation', type: 'uint256' },
      { internalType: 'uint256', name: 'Current_Coin_Value', type: 'uint256' },
      { internalType: 'uint256', name: 'Original_Issuance_Rate', type: 'uint256' },
      { internalType: 'uint256', name: 'Next_Schedule_Revaluation', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_address', type: 'address' }],
    name: 'SET_AUCTION_DEPLOYED_ADDRESS',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_address', type: 'address' }],
    name: 'SET_MINTNFT_DEPLOYED_ADDRESS',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

export const daiAbi: any = [
  {
    inputs: [{ internalType: 'uint256', name: 'chainId_', type: 'uint256' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'src', type: 'address' },
      { indexed: true, internalType: 'address', name: 'guy', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'wad', type: 'uint256' },
    ],
    name: 'Approval',
    type: 'event',
  },
  {
    anonymous: true,
    inputs: [
      { indexed: true, internalType: 'bytes4', name: 'sig', type: 'bytes4' },
      { indexed: true, internalType: 'address', name: 'usr', type: 'address' },
      { indexed: true, internalType: 'bytes32', name: 'arg1', type: 'bytes32' },
      { indexed: true, internalType: 'bytes32', name: 'arg2', type: 'bytes32' },
      { indexed: false, internalType: 'bytes', name: 'data', type: 'bytes' },
    ],
    name: 'LogNote',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'src', type: 'address' },
      { indexed: true, internalType: 'address', name: 'dst', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'wad', type: 'uint256' },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    constant: true,
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'PERMIT_TYPEHASH',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'usr', type: 'address' },
      { internalType: 'uint256', name: 'wad', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'usr', type: 'address' },
      { internalType: 'uint256', name: 'wad', type: 'uint256' },
    ],
    name: 'burn',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ internalType: 'address', name: 'guy', type: 'address' }],
    name: 'deny',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'usr', type: 'address' },
      { internalType: 'uint256', name: 'wad', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'src', type: 'address' },
      { internalType: 'address', name: 'dst', type: 'address' },
      { internalType: 'uint256', name: 'wad', type: 'uint256' },
    ],
    name: 'move',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'nonces',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'holder', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'nonce', type: 'uint256' },
      { internalType: 'uint256', name: 'expiry', type: 'uint256' },
      { internalType: 'bool', name: 'allowed', type: 'bool' },
      { internalType: 'uint8', name: 'v', type: 'uint8' },
      { internalType: 'bytes32', name: 'r', type: 'bytes32' },
      { internalType: 'bytes32', name: 's', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'usr', type: 'address' },
      { internalType: 'uint256', name: 'wad', type: 'uint256' },
    ],
    name: 'pull',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'usr', type: 'address' },
      { internalType: 'uint256', name: 'wad', type: 'uint256' },
    ],
    name: 'push',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [{ internalType: 'address', name: 'guy', type: 'address' }],
    name: 'rely',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'dst', type: 'address' },
      { internalType: 'uint256', name: 'wad', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'address', name: 'src', type: 'address' },
      { internalType: 'address', name: 'dst', type: 'address' },
      { internalType: 'uint256', name: 'wad', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'version',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'wards',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
]

export const auctionAbi: any = [
  {
    inputs: [{ internalType: 'address', name: '_SLF_CONTRACT_ADDRESS', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'string', name: 'auc_id', type: 'string' },
      { indexed: false, internalType: 'uint256', name: 'time', type: 'uint256' },
    ],
    name: 'AuctionCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'string', name: 'auc_id', type: 'string' },
      { indexed: false, internalType: 'bool', name: 'state', type: 'bool' },
    ],
    name: 'AuctionSuccess',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'string', name: 'auc_id', type: 'string' },
      { indexed: false, internalType: 'uint256', name: 'time', type: 'uint256' },
      { indexed: false, internalType: 'address', name: 'bidder', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'price', type: 'uint256' },
    ],
    name: 'BidPlaced',
    type: 'event',
  },
  {
    inputs: [],
    name: 'AuctionSuspended',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: '', type: 'string' }],
    name: 'Auction_Success',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'string', name: '', type: 'string' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'BidTokensTransferred',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'NEW_SLF_ADDRESS', type: 'address' }],
    name: 'Change_SLF_Contract_Address',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'auctionID', type: 'string' },
      { internalType: 'address', name: 'Bidder_Address', type: 'address' },
    ],
    name: 'CheckBidderIdentity',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'auction_id', type: 'string' },
      { internalType: 'string', name: 'property_id', type: 'string' },
    ],
    name: 'End_Auction',
    outputs: [
      { internalType: 'bool', name: '', type: 'bool' },
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'uid', type: 'string' },
      { internalType: 'uint256', name: 's_date', type: 'uint256' },
      { internalType: 'uint256', name: 'e_date', type: 'uint256' },
      { internalType: 'uint256', name: 'res_price', type: 'uint256' },
      { internalType: 'uint256', name: 'sl_reserve', type: 'uint256' },
      { internalType: 'uint256', name: 'noOfTokens', type: 'uint256' },
      { internalType: 'string', name: 'property_id', type: 'string' },
    ],
    name: 'Enlist_Auction',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'string', name: '', type: 'string' },
    ],
    name: 'SLC_contract_address',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'SLF_CONTRACT_ADDRESS',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'auctionID', type: 'string' },
      { internalType: 'address[]', name: 'Bid_Token_Claimers', type: 'address[]' },
      { internalType: 'uint256[]', name: 'claim_amount', type: 'uint256[]' },
      { internalType: 'address', name: 'BidTokenAddress', type: 'address' },
    ],
    name: 'StoreBidTokenClaimAmount',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_address', type: 'address' },
      { internalType: 'string', name: 'property_id', type: 'string' },
    ],
    name: 'Store_SLC_Contract_Address',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'SuspendAuction',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: '', type: 'string' }],
    name: 'auction',
    outputs: [
      { internalType: 'string', name: 'unique_id', type: 'string' },
      { internalType: 'string', name: 'property_id', type: 'string' },
      { internalType: 'uint256', name: 'auction_enlist_date', type: 'uint256' },
      { internalType: 'uint256', name: 'start_date', type: 'uint256' },
      { internalType: 'uint256', name: 'end_date', type: 'uint256' },
      { internalType: 'uint256', name: 'reserve_price', type: 'uint256' },
      { internalType: 'uint256', name: 'sl_reserve', type: 'uint256' },
      { internalType: 'uint256', name: 'no_of_tokens', type: 'uint256' },
      { internalType: 'uint256', name: 'collected_amount', type: 'uint256' },
      { internalType: 'bool', name: 'auction_start', type: 'bool' },
      { internalType: 'bool', name: 'auction_end', type: 'bool' },
      { internalType: 'bool', name: 'auction_exist', type: 'bool' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'string', name: '', type: 'string' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'claimBidTokens',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'auctionID', type: 'string' },
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'BidTokenAddress', type: 'address' },
    ],
    name: 'claimBidTokensback',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'contractOwner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'string', name: 'auctionID', type: 'string' }],
    name: 'getAuctionBidders',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: 'auctionID', type: 'string' },
      { internalType: 'uint256', name: 'bid_amount', type: 'uint256' },
      { internalType: 'address', name: 'Treasurer_Address', type: 'address' },
      { internalType: 'address', name: 'BidTokenAddress', type: 'address' },
    ],
    name: 'saveBid',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]
