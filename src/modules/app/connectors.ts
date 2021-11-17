import { Connectors } from 'web3-react'
const { InjectedConnector, NetworkOnlyConnector } = Connectors

const MetaMask = new InjectedConnector({ supportedNetworks: [1,2,3,4] })

// const Infura = new NetworkOnlyConnector({
//     providerURL: 'https://mainnet.infura.io/v3/...'
// })

const connectors = { MetaMask }

export default connectors;