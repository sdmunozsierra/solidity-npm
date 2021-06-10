pragma solidity ^0.4.17;

/**
@title Campaign
@dev Implements voting process for money expenditure
 */
contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
    }

    Request[] public requests;  // Type struct Request
    address public manager;
    uint public minimumContribution;
    address[] public approvers;
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function Campaign(uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }
    
    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers.push(msg.sender);
    }

    function createRequest(string description,uint  value, address recipient) public restricted {
        // Create a struct and add it to the request array
        Request newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false
        });
        requests.push(newRequest);
    }
    
    // function random() private view returns (uint) {
    //     return uint(keccak256(block.difficulty, now, players));
    // }
    
    // Uses restricted to allow only manager
    // function pickWinner() public restricted {
    //     uint index = random() % players.length;
    //     players[index].transfer(this.balance);
    //     lastWinner = players[index]; // Get last winner
    //     players = new address[](0);  // clear players array
    // }
    
    
    // function getPlayers() public view returns (address[]) {
    //     return players;
    // }
}   