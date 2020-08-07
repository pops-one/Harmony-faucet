pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract HarmonyFaucet  is Ownable {

    //Variables
	mapping(address => uint256) public requestedAddressMapping;
    uint256 public sendAmount;
    uint256 public blockHeight;

    // Events
    event EtherRequested(address indexed fromAddress, uint256 indexed sentAmount);
    event EtherSent(address indexed toAddress);
    event EtherReceived(address Sender, uint amount);
    event Log(string msg);

    constructor() public {
        sendAmount = 5000000000000000000000;
        blockHeight = 17281;
    }

    function transferAmount(address receiverAddress) public onlyOwner {
        uint256 currentBlock = block.number;
        require(requestedAddressMapping[receiverAddress] == 0 || currentBlock - requestedAddressMapping[receiverAddress] >= blockHeight,
                "Address has been funded within the last day");
        require(address(this).balance > sendAmount, "Not enough funds in faucet");
        requestedAddressMapping[receiverAddress] = currentBlock;
        address payable receiver = address(uint160(receiverAddress));
		receiver.transfer(sendAmount);
        emit EtherSent(receiverAddress);
	}

    function setRate(uint256 _sendAmount) public onlyOwner {
		sendAmount = _sendAmount;
	}

    function setBlockHeight(uint256 _blockHeight) public onlyOwner {
		blockHeight = _blockHeight;
	}

    receive() external payable {
        emit EtherReceived(msg.sender, msg.value);
    }
}