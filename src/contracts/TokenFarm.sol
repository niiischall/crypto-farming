pragma solidity ^0.5.16;

import "./DaiToken.sol";
import "./DappToken.sol";

contract TokenFarm {
  //All smart contract logic goes here...
  string public name = "Dapp Token Farm";
  address public owner;
  DappToken public dappToken;
  DaiToken public daiToken;

  address[] public stakers;
  mapping(address => uint) public stakingBalance;
  mapping(address => bool) public hasStaked;

  constructor(DaiToken _daiToken, DappToken _dappToken) public {
    dappToken = _dappToken;
    daiToken = _daiToken;
    owner = msg.sender;
  }

  //1. Stake Tokens (Deposit)
  function stakeTokens(uint _amount) public {
    //Check for minimum amount.
    require(_amount > 0, "amount cannot be 0");

    //Transfer DAI Tokens from investor to this contract for STAKING.
    daiToken.transferFrom(msg.sender, address(this), _amount);

    //Update Staking Balance
    stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

    //Add user to stakers array if they haven't staked already.
    if(!hasStaked[msg.sender]) {
      stakers.push(msg.sender);
    }

    //Update a users' staking status
    hasStaked[msg.sender] = true;
  }

  //2. Issuing Tokens (Interest)
  function issueTokens() public {
    require(msg.sender == owner);
    for(uint i=0; i<stakers.length; i++) {
      address recipient = stakers[i];
      uint balance = stakingBalance[recipient];
      if(balance > 0) {
        dappToken.transfer(recipient, balance);
      }
    }
  }

  //3. Un-Stake Tokens (Withdraw)
}