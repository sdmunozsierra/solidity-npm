pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;
    address public lastWinner;
    
    function Lottery() public {
        manager = msg.sender;
    }
    
    function enter() public payable {
        require(msg.value > .01 ether);
        players.push(msg.sender);
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, players));
    }
    
    // Uses restricted to allow only manager
    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        lastWinner = players[index]; // Get last winner
        players = new address[](0);  // clear players array
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function getPlayers() public view returns (address[]) {
        return players;
    }
}   