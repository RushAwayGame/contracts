const hre = require("hardhat");

async function main() {

  const FakeNEARToken = await hre.ethers.getContractFactory("FakeNEARToken");
  const nearToken = await FakeNEARToken.deploy();
  const r1 = await nearToken.deployed();
  console.log('TX hash = ', r1.deployTransaction.hash);
  console.log("Near Token deployed to:", nearToken.address);

  const RushawayToken = await hre.ethers.getContractFactory("RushawayToken");
  const rushToken = await RushawayToken.deploy({ gasLimit: 1800000 });
  const r2 = await rushToken.deployed();
  console.log('TX hash = ', r2.deployTransaction.hash);
  console.log("RushawayToken deployed to:", rushToken.address);


}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });