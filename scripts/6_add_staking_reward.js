const hre = require('hardhat')

async function main () {
  var [account] = await hre.ethers.getSigners()
  account = account.address
  console.log({ account })

  const rushAddress = '0x3a46674e99d7D551Ce1289941fDb6D1A9B964553'
  const stakingRewardsAddress = '0xc49a58d5916d848b09ccb9fe0fde7418707967fa'

  const rushToken = await hre.ethers.getContractAt('RushawayToken', rushAddress)
  const stakingRewards = await hre.ethers.getContractAt(
    'StakingRewards',
    stakingRewardsAddress
  )

  console.log(
    'Rush balance = ',
    ethers.utils.formatEther(await rushToken.balanceOf(account))
  )

  await exec(
    'Transfer',
    rushToken.transfer(stakingRewardsAddress, ethers.utils.parseEther('10000'))
  )

  await exec(
    'notifyRewardAmount',
    stakingRewards.notifyRewardAmount(ethers.utils.parseEther('10000'))
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
