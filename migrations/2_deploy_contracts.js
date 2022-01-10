const DaiToken = artifacts.require("DaiToken");
const DappToken = artifacts.require("DappToken");
const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function(deployer, network, accounts) {

  //Deploy DaiToken
  await deployer.deploy(DaiToken);
  const daiToken = await DaiToken.deployed();

  //Deploy DappToken
  await deployer.deploy(DappToken);
  const dappToken = await DappToken.deployed();

  //Deploy TokenFarm
  await deployer.deploy(TokenFarm, daiToken.address, dappToken.address);
  const tokenFarm = await TokenFarm.deployed();

  //Transfer all the DappTokens to the TokenFarm
  await dappToken.transfer(tokenFarm.address, '1000000000000000000000000');

  //Transfer 100 DaiTokens to the user
  await daiToken.transfer(accounts[1], '100000000000000000000')

};
