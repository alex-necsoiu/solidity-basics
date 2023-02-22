const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Underflow and Overflow Unit Test:", function(){
  let contract;
  let accounts;

  before(async function () {
    accounts = await ethers.getSigners();
    const underFlowFactory = await ethers.getContractFactory("TimeLock");

    contract = await upgrades.deployProxy(
      underFlowFactory, 
      [],
      {
        kind:"uups",
      }  
    );
    
    await contract.deployed();

    console.log(`Contract deploy with address:${contract.address}`);
  });


});