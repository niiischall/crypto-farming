const { assert } = require("chai");

const DaiToken = artifacts.require("DaiToken");
const DappToken = artifacts.require("DappToken");
const TokenFarm = artifacts.require("TokenFarm");

require("chai")
  .use(require("chai-as-promised"))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, "ether");
}

contract("TokenFarm", ([owner, investor]) => {
  let daiToken, dappToken, tokenFarm;

  before(async () => {
    daiToken = await DaiToken.new();
    dappToken = await DappToken.new();
    tokenFarm = await TokenFarm.new(daiToken.address, dappToken.address);

    //Transfer all DappTokens to tokenFarm.
    await dappToken.transfer(tokenFarm.address, tokens("1000000"));

    //Transfer 100 DaiTokens to the investor.
    await daiToken.transfer(investor, tokens("100"), { from: owner });
  });

  //Tests are here...

  //Test DAI Token Deployment
  describe("Dai Deployment", async () => {
    it("has a name", async () => {
      const name = await daiToken.name();
      assert.equal(name, "DAI Token");
    });
  });

  //Test Dapp Token Deployment
  describe("Dapp Deployment", async () => {
    it("has a name", async () => {
      const name = await dappToken.name();
      assert.equal(name, "DApp Token");
    });
  });

  //Test Token Farm Deployment
  describe("Dapp Token Farm Deployment", async () => {
    it("has a name", async () => {
      const name = await tokenFarm.name();
      assert.equal(name, "Dapp Token Farm");
    });
  });

  //Test number of Dapp Tokens
  describe("Contract has 1,000,000 Dapp Tokens", async () => {
    it("has 1,000,000 Dapp token balance", async () => {
      let balance = await dappToken.balanceOf(tokenFarm.address);
      assert.equal(balance, tokens("1000000"));
    });
  });

  //Test number of DAI Tokens
  describe("Investor has 100 DAI Tokens", async () => {
    it("has 100 DAI token balance", async () => {
      let balance = await daiToken.balanceOf(investor);
      assert.equal(balance, tokens("100"));
    });
  });

  //Test token staking
  describe("Farming tokens", async () => {
    it("rewards investors for staking DAI Tokens", async () => {
      let result;

      //Check Investor's DAI Token Balance before staking
      result = await daiToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "Investor DAI wallet balance correct before staking"
      );

      //Stake DAI tokens
      await daiToken.approve(tokenFarm.address, tokens("100"), {
        from: investor,
      });
      await tokenFarm.stakeTokens(tokens("100"), { from: investor });

      //Check Token Farm's DAI Token Balance  after staking
      result = await daiToken.balanceOf(tokenFarm.address);
      assert.equal(
        result.toString(),
        tokens("100"),
        "TokenFarm DAI balance correct after staking"
      );

      //Check Investor's DAI Token Balance after staking
      result = await daiToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("0"),
        "Investor DAI wallet balance correct after staking"
      );

      //Check If Investor has staked or not
      result = await tokenFarm.hasStaked(investor);
      assert.equal(result.toString(), "true", "Investor has staked");

      //Check Investor's staking balance
      result = await tokenFarm.stakingBalance(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "Investor has correct staking balance"
      );

      //Check Issue tokens
      await tokenFarm.issueTokens({ from: owner });

      //Check balances after issuance
      result = await dappToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens("100"),
        "Investor DApp token balance correct after issuance."
      );

      //Ensure that only owner can issue tokens
      await tokenFarm.issueTokens({ from: investor }).should.be.rejected;
    });
  });
});
