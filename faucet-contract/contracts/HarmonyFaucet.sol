pragma solidity >=0.4.21 <0.6.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";

contract HarmonyFaucet  is Ownable {
	mapping(address => uint256) private requestedAddressMapping;

    uint256 public sendAmount;
    uint256 public blockHeight;

    // Events
    event EtherRequested(address indexed fromAddress, uint256 indexed sentAmount);
    event EtherSent(address indexed toAddress);
    event Log(string msg);

    constructor() public payable {
        sendAmount = 1000000000000000000000;
        blockHeight = 200;
    }

    function() external payable {}

    function transferAmount(address receiverAddress) public {
        uint256 currentBlock = block.number;
        require(requestedAddressMapping[receiverAddress] == 0 || currentBlock - requestedAddressMapping[receiverAddress] >= blockHeight,
                "Address has been funded within the last hour");
        require(getBalance() > sendAmount, "Not enough funds in faucet");
        requestedAddressMapping[receiverAddress] = currentBlock;
        address payable receiver = address(uint160(receiverAddress));
		receiver.transfer(sendAmount);
        emit EtherSent(receiverAddress);
	}

    function getBalance() public view returns (uint256) {
		return address(this).balance;
	}

    function setRate(uint256 _sendAmount) public onlyOwner {
		sendAmount = _sendAmount;
	}

    function setBlockHeight(uint256 _blockHeight) public onlyOwner {
		blockHeight = _blockHeight;
	}
}