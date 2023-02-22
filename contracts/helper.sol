// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

// Declare auxiliar functions to use inside of your contracts
error Unautorized(address caller);

function helper(uint x) view returns(uint){
    return x * 2;
}