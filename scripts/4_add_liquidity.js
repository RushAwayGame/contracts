const hre = require('hardhat')

async function main () {
  var [account] = await hre.ethers.getSigners()
  account = account.address

  const rushAddress = '0x3a46674e99d7D551Ce1289941fDb6D1A9B964553'
  const nearAddress = '0xE3994155062785FB9b36462B23357db76e1d2A9B'
  const dexRouterAddress = '0xAc1c2161e0b5045F561Aa711C6dF61953b44B67f'

  const rushToken = await hre.ethers.getContractAt('RushawayToken', rushAddress)
  const nearToken = await hre.ethers.getContractAt('FakeNEARToken', nearAddress)
  const dexRouter = await hre.ethers.getContractAt(
    'DexRouter',
    dexRouterAddress
  )

  await exec(
    'Mint NEAR',
    nearToken.mint(account, hre.ethers.utils.parseEther('50000'))
  )

  await exec(
    'Approve RUSH',
    rushToken.approve(dexRouterAddress, hre.ethers.constants.MaxUint256)
  )
  await exec(
    'Approve NEAR',
    nearToken.approve(dexRouterAddress, hre.ethers.constants.MaxUint256)
  )

  // Add liquidity
  // 1M RUSH  -  50K NEAR
  await exec(
    'addLiquidity | 1M RUSH  -  50K NEAR',
    dexRouter.addLiquidity(
      rushAddress, // tokenA
      nearAddress, // tokenB
      hre.ethers.utils.parseEther('1000000'), // amountADesired
      hre.ethers.utils.parseEther('50000'), // amountBDesired
      0, // amountAMin
      0, // amountBMin
      account, // to
      999000000000, // deadline
      { gasLimit: 5000000 }
    )
  )
}

async function exec (firstMessage, tx, secondMessage) {
  tx = await Promise.resolve(tx)
  console.log(firstMessage, ' | hash =', tx.hash)
  await tx.wait()
  if (secondMessage) {
    console.log(secondMessage)
  } else {
    console.log('Done.')
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
