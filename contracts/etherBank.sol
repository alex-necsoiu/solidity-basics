// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/*
EtherBank is a contract where you can deposit and withdraw ETH.
This contract is vulnerable to re-entrancy attack.
Let's see why.

1. Deploy EtherBank
2. Deposit 1 Ether each from Account 1 (Alice) and Account 2 (Bob) into EtherBank
3. Deploy Attack with address of EtherBank
4. Call Attack.attack sending 1 ether (using Account 3 (Eve)).
   You will get 3 Ethers back (2 Ether stolen from Alice and Bob,
   plus 1 Ether sent from this contract).

What happened?
Attack was able to call EtherBank.withdraw multiple times before
EtherBank.withdraw finished executing.

Here is how the functions were called
- Attack.attack
- EtherBank.deposit
- EtherBank.withdraw
- Attack fallback (receives 1 Ether)
- EtherBank.withdraw
- Attack.fallback (receives 1 Ether)
- EtherBank.withdraw
- Attack fallback (receives 1 Ether)
*/

contract EtherBank{
    mapping (address => uint) public balances;

    function deposit() public payable{
        balances[msg.sender] += msg.value;
    }

    function withdraw() public{
        uint bal = balances[msg.sender];
        require(bal>0);
        (bool transfered,) = msg.sender.call{value: bal}("");
        require(transfered, "Failed to transfer Ether");
        balances[msg.sender] = 0;
    }

    // Helper function returns balance of this contract
    function getBalance() public view returns (uint){
        return address(this).balance;
    } 
}
 