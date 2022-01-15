<p align="center">
  <img alt="issues" src="https://img.shields.io/github/issues/niiischall/crypto-farming"/>
  <img alt="forks" src="https://img.shields.io/github/forks/niiischall/crypto-farming" />
  <img alt="stars" src="https://img.shields.io/github/stars/niiischall/crypto-farming" />
  <img alt="license" src="https://img.shields.io/github/license/niiischall/crypto-farming" />
</p>

<p align="center">
  <h1 align="center">Crypto Farming dApp</h1>
</p>

## About The Project
A decentralized application where an investor deposits a certain number of [DAI](https://makerdao.com/en/) coins and gets back extra coins as a reward for investing on the platform.

## Tech stack and libraries
 - Solidity
 - Ethereum Blockchain
 - Metamask
 - React
 - web3.js
 - Bootstrap

## Demo Video



## Getting Started
First, run the `React` development server:
```bash
npm run start
```
Since the dApp is currently not deployed on the ethereum mainnet, you'll need to setup a local blockchain and connect it to your preffered crypto wallet. We'll also need to have a cryptocurrency wallet and a personal ethereum blockchain. [Metamask](https://metamask.io/download.html) as a wallet and [Ganache](https://trufflesuite.com/ganache) as a local blockchain are the preffered options.

Next, you'll need to install `truffle` by using 
```bash
npm install -g truffle
```
Once installed, you can now deploy the smart contracts on your local blockchain (Keep an ethereum blockchain environment running in the background with Ganache) by using
```bash
truffle compile
and then
truffle migrate
```
If the above steps are done right, you'll see a message similar to this in your terminal.
<img width="427" alt="Terminal Message" src="https://user-images.githubusercontent.com/45312239/149636504-64c502a5-afc8-474d-befa-02127c0b75ce.png">

Last and final step is to connect your wallet to your blockchain network. This can be done easily by going to the `Add Network` section in your wallet and connecting with the right RPC server.

Once done, you're good to go. Then open [http://localhost:3000/](http://localhost:3000/) to see the app.

## 📝 License
Distributed under the MIT License. See `LICENSE` for more information.


---

<br />

[![ForTheBadge 60-percent-of-the-time-works-every-time](https://forthebadge.com/images/badges/60-percent-of-the-time-works-every-time.svg)](https://github.com/niiischall/crypto-farming)

