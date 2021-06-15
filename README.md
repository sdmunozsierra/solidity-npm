# solidity-npm

Ethereum Lottery from scratch using Solidity, npm and Nuxt.

## Description

This project is an example on how to create a simple Lottery that runs on Ethereum and the frontend uses Nuxt.js and Vuetify to provide a responsive UI. This project is adapted from the React.js version of the Udemy for Business course: Ethereum and Solidity: The Complete Developer's Guide.

## Prerequisistes

- Npm
- Web Browser with Metamask extension support (Chrome, Firefox)
- Infura API Credentials

## Run

To start a local development go into the nuxt directory and use npm:

```shell
cd nuxt && npm run dev
```

Next open your browser and go to:

```
localhost:3000
```

## Utils

### Compile Contracts

Compile a contract and obtain the Abi in the terminal after deploying.

```shell
$ cd lottery
$ npm compile.js
$ npm deploy.js
```

TODO Automatically create a .json file with the contract output.

### NFT

Create your nfts from scratch using `truffle`

```
mkdir NFT
truffle unbox smarcontractkit/box
npm i @openzeppelin/contracts
```

In `truffle-config.js`

```
api_keys: {
	etherscan: process.env.ETHERSCAN_API_KEY
},
plugins: {
	'truffle-plugin-verify'
}
```

Migrate the contracts to the network rinkeby after adding the setting.

```
truffle migrate --reset --network rinkeby -f 3
truffle run verify NFTSimple --network rinkeby --license MIT
```

### Create your own Nuxt Frontend from scratch

Use the command `npx` included with `npm`:

```shell
$ npx nuxt-create-app
```

### Inspiration

Ethereum KickStart web site created with Vue

Follow the course on https://www.udemy.com/ethereum-and-solidity-the-complete-developers-guide/
