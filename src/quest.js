var TX = require('ethereumjs-tx');
// const { async } = require('rxjs');
const Web3 = require('web3');
var providerURL =
  'https://rinkeby.infura.io/v3/422ff8b52c6a43eb8a2d269ce3495c9f';
const web3 = new Web3(new Web3.providers.HttpProvider(providerURL));

var SLFContractAddress = '0xB25ed94E012b28Ff5D791Ee51b53D5d532B1dEFA';
var SLCContractAddress = '0x2E54d706CD1C8d483539D286F78cc324cb2005Fc';
var mintNFTContractAddress = '0xc3E7e1dc5B4B516725DADD0489f88e33081B0fCD';

//SLF Contract interface
const slf_abi = [
  { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: '', type: 'address' },
    ],
    name: 'AdminDeleted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: '', type: 'address' },
    ],
    name: 'NewAdminAdded',
    type: 'event',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'AdminMApping',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
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
      {
        internalType: 'uint256',
        name: '_next_schedule_reevaluation',
        type: 'uint256',
      },
      { internalType: 'string', name: 'token_uri', type: 'string' },
    ],
    name: 'ListProperty_details',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newAdmin', type: 'address' }],
    name: 'addAdmin',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'ExistingAdmin', type: 'address' },
    ],
    name: 'delAdmin',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'property_id', type: 'uint256' }],
    name: 'listFromTempInfo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'propInfo',
    outputs: [
      { internalType: 'uint256', name: 'origValue', type: 'uint256' },
      { internalType: 'uint256', name: 'currValue', type: 'uint256' },
      { internalType: 'uint256', name: 'coins_issued', type: 'uint256' },
      { internalType: 'uint256', name: 'equity_at_issuance', type: 'uint256' },
      { internalType: 'uint256', name: 'Total_Current_Value', type: 'uint256' },
      { internalType: 'uint256', name: 'Varriation', type: 'uint256' },
      { internalType: 'uint256', name: 'Current_Coin_Value', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'Original_Issuance_Rate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'Next_Schedule_Revaluation',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_address', type: 'address' }],
    name: 'setSLC_contract_address',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'temppropInfo',
    outputs: [
      { internalType: 'uint256', name: 'origValue', type: 'uint256' },
      { internalType: 'uint256', name: 'currValue', type: 'uint256' },
      { internalType: 'uint256', name: 'coins_issued', type: 'uint256' },
      { internalType: 'uint256', name: 'equity_at_issuance', type: 'uint256' },
      { internalType: 'uint256', name: 'Total_Current_Value', type: 'uint256' },
      { internalType: 'uint256', name: 'Varriation', type: 'uint256' },
      { internalType: 'uint256', name: 'Current_Coin_Value', type: 'uint256' },
      {
        internalType: 'uint256',
        name: 'Original_Issuance_Rate',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'Next_Schedule_Revaluation',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
const slf_interface = new web3.eth.Contract(slf_abi, SLFContractAddress);

//SLC Contract interface
const slc_abi = [
  {
    inputs: [
      { internalType: 'uint256', name: '_initialSupply', type: 'uint256' },
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
      { indexed: false, internalType: 'address', name: '', type: 'address' },
      { indexed: false, internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'DepositFunds',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: '', type: 'uint256' },
      { indexed: false, internalType: 'address', name: '', type: 'address' },
    ],
    name: 'RegionAdminAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: '', type: 'uint256' },
      { indexed: false, internalType: 'address', name: '', type: 'address' },
    ],
    name: 'RegionAdminChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: '', type: 'address' },
      { indexed: false, internalType: 'uint256', name: '', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'TransactionCompleted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: '', type: 'address' },
      { indexed: false, internalType: 'uint256', name: '', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'TransactionCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: '', type: 'address' },
      { indexed: false, internalType: 'uint256', name: '', type: 'uint256' },
    ],
    name: 'TransactionSigned',
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
      { indexed: true, internalType: 'address', name: '_to', type: 'address' },
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
      { indexed: false, internalType: 'address', name: '', type: 'address' },
    ],
    name: 'ownerAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: '', type: 'address' },
    ],
    name: 'ownerRemoved',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'tokenid', type: 'uint256' },
      { internalType: 'address', name: 'receiver', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'string', name: 'token_uri', type: 'string' },
    ],
    name: 'InitiateTransaction',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'SLf_contract_address',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: '_owners',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: '_transactionIdx',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: '_transactions',
    outputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'tokenid', type: 'uint256' },
      { internalType: 'uint8', name: 'signatureCount', type: 'uint8' },
      { internalType: 'string', name: 'tokenURI', type: 'string' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_owner', type: 'address' }],
    name: 'addOwner',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'region_no', type: 'uint256' },
      { internalType: 'address', name: '_address', type: 'address' },
    ],
    name: 'add_region_admin',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_spender', type: 'address' },
      { internalType: 'uint256', name: '_value', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'request', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_region_no', type: 'uint256' },
      { internalType: 'address', name: '_address', type: 'address' },
    ],
    name: 'change_region_admin',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'transactionId', type: 'uint256' },
    ],
    name: 'deleteTransaction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getPendingTransactions',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mintNFT_contract_address',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_oldAddress', type: 'address' },
      { internalType: 'address', name: '_newAddress', type: 'address' },
    ],
    name: 'modify',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_owner', type: 'address' }],
    name: 'removeOwner',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_from', type: 'address' },
      { internalType: 'address', name: '_to', type: 'address' },
      { internalType: 'uint256', name: '_value', type: 'uint256' },
    ],
    name: 'safetransferFrom',
    outputs: [{ internalType: 'bool', name: 'success', type: 'bool' }],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_address', type: 'address' }],
    name: 'setSLF_contract_address',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_address', type: 'address' }],
    name: 'setmintNFT_contract_address',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'transactionId', type: 'uint256' },
    ],
    name: 'signTransaction',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'walletBalance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  { stateMutability: 'payable', type: 'receive' },
];
const slc_interface = new web3.eth.Contract(slc_abi, SLCContractAddress);

//mintNFT Contract interface
const mintNFT_abi = [
  {
    inputs: [{ internalType: 'address', name: '_address', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'approved',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
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
        indexed: true,
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'operator',
        type: 'address',
      },
      { indexed: false, internalType: 'bool', name: 'approved', type: 'bool' },
    ],
    name: 'ApprovalForAll',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'from', type: 'address' },
      { indexed: true, internalType: 'address', name: 'to', type: 'address' },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'Transfer',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'baseURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_new', type: 'address' }],
    name: 'changeSLCAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'operator', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'to_', type: 'address' },
      { internalType: 'uint256', name: 'id_', type: 'uint256' },
      { internalType: 'string', name: 'token_uri', type: 'string' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'operator', type: 'address' },
      { internalType: 'bool', name: 'approved', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'index', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'uint256', name: 'index', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'tokenId', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ internalType: 'string', name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: 'from', type: 'address' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
const mintNFT_interface = new web3.eth.Contract(
  mintNFT_abi,
  mintNFTContractAddress
);

/*
 * Default Deployer Account Address and private key
 */

const account1 = '0xF51632261987F4578425Ca91a48117E11516a4CF'; //admin in SLF and owners in SLC
const account2 = '0xA499569422a00d7f612ab91a47B3cb8C6Be71884'; //admin in SLF and owners in SLC

const privateKey1 = new Buffer.from(
  'bbe63d1fba1794a8c74bfd779c1ae2535a1d5953a6ee6aec609c2351db57fff8',
  'hex'
);
const privateKey2 = new Buffer.from(
  '9525d3eef65fd22cff71b627c35003d27472370f4067246dbbcedec692b66309',
  'hex'
);

/*
 * Transaction function for different contract functions
 */
async function runCode(data, account, privateKey, deployedAddress) {
  var count = await web3.eth.getTransactionCount(account);
  var Price = await web3.eth.getGasPrice();
  var txData = {
    nonce: web3.utils.toHex(count),
    gasLimit: web3.utils.toHex(7500000),
    gasPrice: web3.utils.toHex(Price * 1.4),
    to: deployedAddress,
    from: account,
    data: data,
  };

  var run_code = new TX(txData, { chain: 'rinkeby' });
  run_code.sign(privateKey); //change here
  const serialisedrun_code = run_code.serialize().toString('hex');
  const result = await web3.eth.sendSignedTransaction(
    '0x' + serialisedrun_code
  );
  console.log(result);
}

async function convPrivateKeyToBuffer(key) {
  const pkey = new Buffer.from(key, 'hex');
  return pkey;
}

/*
 * SLF Contract Functions
 */

/*check whether given address is admin or not*/
async function checkAdminOrNot(_of) {
  try {
    var data = await slf_interface.methods.AdminMApping(_of).call();
    if (data == true) console.log(`Given Address ${_of} is admin`);
    else console.log(`Given Address ${_of} is not an admin`);
    return data;
  } catch (err) {
    throw { message: `ERROR: check admin function error ${err}` };
  }
}

/*return property info for a particular property id*/
async function returnPropertyInfo(_property_id) {
  try {
    var data = await slf_interface.methods.propInfo(_property_id).call();
    console.log(data);
    return data;
  } catch (err) {
    throw { message: `ERROR: check admin function error ${err}` };
  }
}

/* set SLC contract address */
async function setSLCContractAddress(account, privatekey, _slcAddress) {
  try {
    var data = await slf_interface.methods
      .setSLC_contract_address(_slcAddress)
      .encodeABI();
    privatekey = await convPrivateKeyToBuffer(privatekey);
    console.log(privatekey);
    runCode(data, account, privatekey, SLFContractAddress);
  } catch {
    throw { message: "ERROR: cann't set SLC contract address" };
  }
}

/* Add Property Details EnlistingAdmin*/
async function addPropertyEnlistAdmin(account, privatekey, _newAdmin) {
  try {
    var data = await slf_interface.methods.addAdmin(_newAdmin).encodeABI();
    privatekey = await convPrivateKeyToBuffer(privatekey);
    console.log(privatekey);
    runCode(data, account, privatekey, SLFContractAddress);
  } catch {
    throw { message: "ERROR: cann't add new property enlist admin" };
  }
}

/* Delete Property Details EnlistingAdmin*/
async function DeletePropertyEnlistAdmin(account, privatekey, _existingAdmin) {
  try {
    var data = await slf_interface.methods.delAdmin(_existingAdmin).encodeABI();
    privatekey = await convPrivateKeyToBuffer(privatekey);
    console.log(privatekey);
    runCode(data, account, privatekey, SLFContractAddress);
  } catch {
    throw { message: "ERROR: cann't delete property enlist admin" };
  }
}

/* Enlist Property Details*/
async function EnlistPropertyDetails(
  AdminPublicAddress,
  AdminPrivateKey,
  _origValue,
  _currValue,
  _coins_issued,
  _equity_at_issuance,
  _varriation,
  _current_coin_value,
  _orig_issue_rate,
  _next_schedule_reevaluation,
  token_uri
) {
  try {
    var data = await slf_interface.methods
      .ListProperty_details(
        _origValue,
        _currValue,
        _coins_issued,
        _equity_at_issuance,
        _varriation,
        _current_coin_value,
        _orig_issue_rate,
        _next_schedule_reevaluation,
        token_uri
      )
      .encodeABI();
    AdminPrivateKey = await convPrivateKeyToBuffer(AdminPrivateKey);
    console.log(AdminPrivateKey);
    runCode(data, AdminPublicAddress, AdminPrivateKey, SLFContractAddress);
  } catch {
    throw { message: "ERROR: cann't delete property enlist admin" };
  }
}

/*
 * SLC Contract Functions
 */

/* set SLF contract address */
async function setSLFContractAddress(account, privatekey, _slfAddress) {
  try {
    var data = await slc_interface.methods
      .setSLF_contract_address(_slfAddress)
      .encodeABI();
    privatekey = await convPrivateKeyToBuffer(privatekey);
    console.log(privatekey);
    runCode(data, account, privatekey, SLCContractAddress);
  } catch {
    throw { message: "ERROR: cann't set SLF contract address" };
  }
}

/* set mintNFT contract address */
async function setmintNFTContractAddress(account, privatekey, _mintNFTAddress) {
  try {
    var data = await slc_interface.methods
      .setmintNFT_contract_address(_mintNFTAddress)
      .encodeABI();
    privatekey = await convPrivateKeyToBuffer(privatekey);
    console.log(privatekey);
    runCode(data, account, privatekey, SLCContractAddress);
  } catch {
    throw { message: "ERROR: cann't set mintNFT contract address" };
  }
}

/* Add Region Admin so that after verifying enlisting transaction tokens transferred to this region admin */
async function setRegionAdmin(
  account,
  privatekey,
  _newRegionNumber,
  _newRegionAdmin
) {
  try {
    var data = await slc_interface.methods
      .add_region_admin(_newRegionNumber, _newRegionAdmin)
      .encodeABI();
    privatekey = await convPrivateKeyToBuffer(privatekey);
    console.log(privatekey);
    runCode(data, account, privatekey, SLCContractAddress);
  } catch {
    throw { message: "ERROR: cann't set Region Admin" };
  }
}

/* change Region Admin so that after verifying enlisting transaction tokens transferred to this region admin */
async function changeRegionAdmin(
  account,
  privatekey,
  _existingRegionNumber,
  _newRegionAdmin
) {
  try {
    var data = await slc_interface.methods
      .change_region_admin(_existingRegionNumber, _newRegionAdmin)
      .encodeABI();
    privatekey = await convPrivateKeyToBuffer(privatekey);
    console.log(privatekey);
    runCode(data, account, privatekey, SLCContractAddress);
  } catch {
    throw { message: "ERROR: cann't change region admin" };
  }
}

/*Remove existing owner and add new owner who can sign the pending transactions*/
async function removeExistAndAddNewOwner(
  account,
  privatekey,
  _existingOwner,
  _newOwner
) {
  try {
    var data = await slc_interface.methods
      .modify(_existingOwner, _newOwner)
      .encodeABI();
    privatekey = await convPrivateKeyToBuffer(privatekey);
    console.log(privatekey);
    runCode(data, account, privatekey, SLCContractAddress);
  } catch {
    throw { message: "ERROR: cann't remove and add existing and new owner" };
  }
}

/*add new owner who can sign the pending transactions*/
async function AddNewOwner(account, privatekey, _newOwner) {
  try {
    var data = await slc_interface.methods.addOwner(_newOwner).encodeABI();
    privatekey = await convPrivateKeyToBuffer(privatekey);
    console.log(privatekey);
    runCode(data, account, privatekey, SLCContractAddress);
  } catch {
    throw { message: "ERROR: cann't add new owner" };
  }
}

/*remove existing owner who can sign the pending transactions*/
async function removeOwner(account, privatekey, _newOwner) {
  try {
    var data = await slc_interface.methods.removeOwner(_newOwner).encodeABI();
    privatekey = await convPrivateKeyToBuffer(privatekey);
    console.log(privatekey);
    runCode(data, account, privatekey, SLCContractAddress);
  } catch {
    throw { message: "ERROR: cann't remove owner" };
  }
}

/*get pending transactions*/
async function getPendingTransactions(TransSignerAddress) {
  try {
    var data = await slc_interface.methods
      .getPendingTransactions()
      .call({ from: TransSignerAddress });
    console.log('Pending Transactions:-', data);
    return data;
  } catch {
    throw { message: "ERROR: cann't get pending transactions" };
  }
}

/*get transaction details*/
async function getTransactionDetails(TransSignerAddress, TransID) {
  try {
    var data = await slc_interface.methods
      ._transactions(TransID)
      .call({ from: TransSignerAddress });
    console.log('Transactions Details:-', data);
    return data;
  } catch {
    throw { message: "ERROR: cann't get pending transactions" };
  }
}

/*sign pending transactions*/
async function signPendingTransactions(
  TransSignerAddress,
  TransSignerPrivateKey,
  TransID
) {
  try {
    var data = await slc_interface.methods.signTransaction(TransID).encodeABI();
    console.log(data);
    runCode(
      data,
      TransSignerAddress,
      TransSignerPrivateKey,
      SLCContractAddress
    );
  } catch {
    throw { message: "ERROR: cann't sign pending transactions" };
  }
}

/*delete pending transactions*/
async function deletePendingTransactions(
  TransSignerAddress,
  TransSignerPrivateKey,
  TransID
) {
  try {
    var data = await slc_interface.methods
      .deleteTransaction(TransID)
      .encodeABI();
    console.log(data);
    runCode(
      data,
      TransSignerAddress,
      TransSignerPrivateKey,
      SLCContractAddress
    );
  } catch {
    throw { message: "ERROR: cann't delete pending transactions" };
  }
}

/*
 * mintNFT Contract Functions
 */
async function getTokenURI(tokenid) {
  try {
    var data = await mintNFT_interface.methods.tokenURI(tokenid).call();
    console.log(data);
    return data;
  } catch {
    throw { message: "ERROR: cann't get tokenURI for this token id" };
  }
}

//getTokenURI(1);
//var res = EnlistPropertyDetails(account1,privateKey1,500000,400000,10000,50,2,20,67,45678,"MYFIRSTTOKEN").then((data) => console.log(data));
//checkAdminOrNot("0xF51632261987F4578425Ca91a48117E11516a4CW");
//getTokenURI(1);
//var res = getTransactionDetails(1).then((data) => console.log(data));
//var res = signPendingTransactions(account2,privateKey2,1);
//var res = getPendingTransactions(account1).then((data) => console.log(data));
//var res = addPropertyEnlistAdmin("0xA499569422a00d7f612ab91a47B3cb8C6Be71884").then((data) => console.log(data));
//var res = checkAdminOrNot("0xA499569422a00d7f612ab91a47B3cb8C6Be71884").then((data)=> console.log(data));

var checkSLFAdmin = async function (address) {
  return await checkAdminOrNot(address);
};
var propertyInfo = async function (id) {
  return await returnPropertyInfo(id);
};
var addSLFadmin = async function (
  Caller_Address,
  Caller_private_key,
  New_admin_Address
) {
  await addPropertyEnlistAdmin(
    Caller_Address,
    Caller_private_key,
    New_admin_Address
  );
};
var deleteSLFadmin = async function (
  Caller_Address,
  Caller_private_key,
  Existing_admin_Address
) {
  await DeletePropertyEnlistAdmin(
    Caller_Address,
    Caller_private_key,
    Existing_admin_Address
  );
};
var enlistPropertyDetails = async function (
  adminAddress,
  adminPrivateKey,
  Original_Value,
  Current_value,
  coins_issued,
  Equity_At_issuance,
  Varriation,
  current_coin_value,
  Orig_issue_rate,
  Next_Schedule_reevaluation,
  tokenuri
) {
  await EnlistPropertyDetails(
    adminAddress,
    adminPrivateKey,
    Original_Value,
    Current_value,
    coins_issued,
    Equity_At_issuance,
    Varriation,
    current_coin_value,
    Orig_issue_rate,
    Next_Schedule_reevaluation,
    tokenuri
  );
};
var removeAndAddOwner = async function (
  Caller_Address,
  Caller_private_key,
  Existing_owner,
  New_Owner
) {
  await removeExistAndAddNewOwner(
    Caller_Address,
    Caller_private_key,
    Existing_owner,
    New_Owner
  );
};
var addNewOwner = async function (
  Caller_Address,
  Caller_private_key,
  New_Owner
) {
  await AddNewOwner(Caller_Address, Caller_private_key, New_Owner);
};
var deleteOwner = async function (
  Caller_Address,
  Caller_private_key,
  existing_Owner
) {
  await AddNewOwner(Caller_Address, Caller_private_key, existing_Owner);
};
var GetPendingTransactions = async function (SignerAddress) {
  return await getPendingTransactions(SignerAddress);
};
var GetTransactionsDetails = async function (SignerAddress, TransactionID) {
  return await getTransactionDetails(SignerAddress, TransactionID);
};
var SignPendingTransactions = async function (
  SignerAddress,
  SignerPrivatekey,
  TransactionID
) {
  return await signPendingTransactions(
    SignerAddress,
    SignerPrivatekey,
    TransactionID
  );
};
var DeletePendingTransactions = async function (
  SignerAddress,
  SignerPrivatekey,
  TransactionID
) {
  return await deletePendingTransactions(
    SignerAddress,
    SignerPrivatekey,
    TransactionID
  );
};
var getURIOfToken = async function (tokenid) {
  await getTokenURI(tokenid);
};

module.exports = {
  checkSLFAdmin: checkSLFAdmin,
  propertyInfo: propertyInfo,
  addSLFadmin: addSLFadmin,
  deleteSLFadmin: deleteSLFadmin,
  enlistPropertyDetails: enlistPropertyDetails,
  removeAndAddOwner: removeAndAddOwner,
  addNewOwner: addNewOwner,
  deleteOwner: deleteOwner,
  GetPendingTransactions: GetPendingTransactions,
  GetTransactionsDetails: GetTransactionsDetails,
  SignPendingTransactions: SignPendingTransactions,
  DeletePendingTransactions: DeletePendingTransactions,
  getURIOfToken: getURIOfToken,
  web3 : web3
};
// var res = checkSLFAdmin('0xF51632261987F4578425Ca91a48117E11516a4CF').then((data) => console.log(data));
// var res = EnlistPropertyDetails(account1,privateKey1,500000,400000,10000,50,2,20,67,45678,"MYFIRSTTOKEN").then((data) => console.log(data));
