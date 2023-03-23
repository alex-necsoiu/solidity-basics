// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// import{symbol as alias, symbol2} from "./";
import {Unautorized, helper as h1} from "./helper.sol";
 // Safe Math overfllow test

contract CustomError{

    address payable owner= payable(msg.sender);

    function withdraw() public{
        if(msg.sender!=owner){  
            // execution cost	2578 gas 
            //revert("error");

            // execution cost	2614 gas
            //revert("error error error error error error error error error error error error");

            //execution cost	2527 gas
            revert Unautorized(msg.sender);
        }
        owner.transfer(address(this).balance);
    }

    function double(uint x) public returns(uint){
        // Use auxiliar helper outside of the contract
        return h1(x);
    }  
}
