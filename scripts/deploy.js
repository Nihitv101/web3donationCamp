
const hre = require("hardhat");



async function main() {

  const Donorbox = await hre.ethers.getContractFactory('Donorbox');

  const donor = await Donorbox.deploy(); // instance:

  await donor.deployed(); // deploying smart contract:


  // console.log(`Deployed contract Address ${donor.address}`);

  



}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



// smart contract address:
// 0xF2f4003D0eDd8D4f533411F9a1a533830BB0cd94