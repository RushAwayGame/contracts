const hre = require("hardhat");


async function main() {
  var [account] = await hre.ethers.getSigners();
  account = account.address;

  const DexFactory = await hre.ethers.getContractFactory("DexFactory");
  const factory = await DexFactory.deploy(account);
  const r1 = await factory.deployed();
  console.log('TX hash = ', r1.deployTransaction.hash);
  console.log("DEX Factory deployed to:", factory.address);

  const init_code_hash = await factory.INIT_CODE_PAIR_HASH();
  console.log('INIT_CODE_PAIR_HASH = ', init_code_hash)
  console.log('Please update Library code with this value, on line 24, (remove 0x)');
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });