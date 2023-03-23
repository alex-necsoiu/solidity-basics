const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

before(async function () {
  accounts = await ethers.getSigners();


  const underFlowFactory = await ethers.getContractFactory("TimeLock");
  contract = await  underFlowFactory.deploy();
  await contract.deployed();

  const attackFactory = await ethers.getContractFactory("Attack", accounts[3]);
  contract2 = await   attackFactory.deploy(contract.address);
  await contract2.deployed();

});

describe("Underflow and Overflow Unit Test:", function(){

  it("deploys and initializes successfully", async () => {
    console.log(`Contract deploy with address:${contract.address}`);
  });

  it("deploys and initializes successfully 2n contract", async () => {
    console.log(`Contract2 deploy with address:${contract2.address}`);
  });

  it("Deposit into contract", async () => {
    await contract.connect(accounts[1]).deposit({value: ethers.utils.parseEther("10").toString()})
  });

  it("Deposit into contract", async () => {
    await contract.connect(accounts[2]).deposit({value: ethers.utils.parseEther("5").toString()})
  });

  it("Get account balance", async () => {
    const balance = await contract.connect(accounts[1]).getBalance()
    const balance2 = await contract.connect(accounts[2]).getBalance()

    console.log(`Balance: ${balance}`);
    console.log(`Balance2: ${balance2}`);
  });

  // it("Attack Stake contract", async () => {
  //   await contract2.connect(accounts[3]).attack({value: ethers.utils.parseEther("1").toString()})

  //   const balance3 = await contract2.connect(accounts[3]).getBalance()

  //   console.log(`Balance3: ${balance3}`);
  // });
});