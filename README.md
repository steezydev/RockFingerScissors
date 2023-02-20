<img src="./assets/banner.png">

![Solidity](https://img.shields.io/badge/Solidity-%23363636.svg?style=for-the-badge&logo=solidity&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

# RockFingerScissors 
🤘🖕✌️

## Overview

RockFingerScissors is a decentralized application (dApp) built on the Binance Smart Chain Testnet that allows users to play a game of rock-paper-scissors against the smart contract. The smart contract for the game is written in Solidity and the front-end dApp is created with Next.js.

## Game Concept

The concept of the game is no different from a simple rock-paper-scissors game (paper is replaces by finger). The user selects between rock, finger or scissors, and then calls the `play(_choice)` method in the smart contract, sending `0.01 TBNB` as a default bet. The smart contract then randomly generates a number between 1 and 3, with 1 representing rock, 2 - finger and 3 - scissors. If the user's choice beats the randomly generated number, the user wins and receives `0.02 TBNB` in return.

## Getting Started

To play the game, the user needs to have a wallet that supports the Binance Smart Chain and has some TBNB (the native token of the Binance Smart Chain Testnet) in it. The user can then connect their wallet to the dApp and play the game.

## Project Structure

The project is structured as a yarn monorepo

- `dapp` - RockFingerScissors Next.js front-end dApp
- `contract` - RockFingerScissors smart-contract built with Solidity

## Conclusion

RockFingerScissors is a simple yet entertaining game built on the Binance Smart Chain. It allows users to interact with a smart contract and win TBNB if they win the game. The game was built as a project for the [tern.crypto](https://t.me/terncrypto) & [BNBChain](https://t.me/BNBCISDevs) contest
