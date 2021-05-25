const path = require('path')
const fs = require('fs')
const solc = require('solc')

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const source = fs.readFileSync(inboxPath, 'utf8')
const ballotPath = path.resolve(__dirname, 'contracts', 'Ballot.sol')
const ballotSource = fs.readFileSync(ballotPath, 'utf8')

// console.log(solc.compile(source, 1)) // Number  of contracts to be compiled

// returns a compiled contract
// module.exports = solc.compile(source, 1).contracts[':Inbox']
module.exports = solc.compile(source, 1).contracts[':Ballot']
