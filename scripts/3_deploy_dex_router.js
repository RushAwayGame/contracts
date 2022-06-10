const hre = require('hardhat')

async function main () {
  const factoryAddress = '0x6d21841c004861142e8809be055a55e98f1220ab'

  const WETH = await hre.ethers.getContractFactory('WETH9')
  const weth = await WETH.deploy()
  const r1 = await weth.deployed()
  console.log('TX hash = ', r1.deployTransaction.hash)
  console.log('WETH deployed to:', weth.address)
  const wethAddress = weth.address

  const DexRouter = await hre.ethers.getContractFactory('DexRouter')
  const router = await DexRouter.deploy(factoryAddress, wethAddress)
  const r2 = await router.deployed()
  console.log('TX hash = ', r2.deployTransaction.hash)
  console.log('DEX Router deployed to:', router.address)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
