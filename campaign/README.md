# Campaign

Attempts to solve the Kickstarter problem when a bad actor 'steals' the money from the pool.

## Smart Contract

The proposition is to create a smart contract where the contributors can vote to release money to spending request.

## Run

Rinkeberry Manager Address:

```
0xCfA437255f32F79Fe73E398422EeC91F5fadDA1E
```

### Test

To test the contracts in a terminal run:

```shell
npm run test
```

### From scratch

To create, compile, test and deploy from scratch in a terminal:

```shell
npm init
npm install --save web3@1.3.5
npm install --save solc@0.17
npm install --save dotenv
npm install --save mocha
npm install --save ganache-cli
npm install --save truffle-hdwallet-provider@0.0.3
cd contracts
node compile.js
cd ../
node ethereum/deploy.js
```

Create a `.env` file:

```
  MNEMONIC='12 secret words'
  RINKEBY_INFURA='https://rinkeby.infura.io/v3/endpoint'
```
