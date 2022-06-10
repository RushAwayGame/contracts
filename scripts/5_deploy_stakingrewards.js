const hre = require('hardhat')

async function main () {
  var [account] = await hre.ethers.getSigners()
  account = account.address
  console.log({ account })

  const rushAddress = '0x3a46674e99d7D551Ce1289941fDb6D1A9B964553'
  const rushNearLPAddress = '0x522daba9600ad0f2704212dcea4cfa747a03e1f1'

  const StakingRewards = await hre.ethers.getContractFactory('StakingRewards')
  const stakingRewards = await StakingRewards.deploy(
    account, // address _owner,
    account, // address _rewardsDistribution,
    rushAddress, // address _rewardsToken,
    rushNearLPAddress // address _stakingToken
  )
  const r = await stakingRewards.deployed()
  console.log('TX hash = ', r.deployTransaction.hash)
  console.log('StakingRewards deployed to:', stakingRewards.address)
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
