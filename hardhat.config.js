require('@nomiclabs/hardhat-waffle')

const secrets = require('./secrets.json')

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    aurora_testnet: {
      url: 'https://testnet.aurora.dev:443/',
      chainId: 1313161555,
      accounts: [secrets.auroraPrivateKey]
    },
    aurora_mainnet: {
      url: 'https://mainnet.aurora.dev',
      chainId: 1313161554,
      accounts: [secrets.auroraPrivateKey]
    }
  },
  solidity: {
    compilers: [
      {
        version: '0.8.7',
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999
          }
        }
      },
      {
        version: '0.6.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999
          },
          evmVersion: 'istanbul'
        }
      },
      {
        version: '0.5.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 999999
          },
          evmVersion: 'istanbul'
        }
      }
    ]
    /*overrides: {
      "./contracts/dex/core/": {
        version: "0.5.16",
      },
    }*/
  },
  gas: 'auto',
  gasReporter: {
    gasPrice: 1,
    enabled: false,
    showTimeSpent: true
  }
}
