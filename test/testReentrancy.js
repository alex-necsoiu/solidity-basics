const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

before(async function () {
  accounts = await ethers.getSigners();


  const underFlowFactory = await ethers.getContractFactory("EtherBank");
  contract = await  underFlowFactory.deploy();
  await contract.deployed();

  const attackFactory = await ethers.getContractFactory("ReentrancyAttack", accounts[3]);
  contract2 = await   attackFactory.deploy(contract.address);
  await contract2.deployed();
});

describe("Reentrancy Attack Unit Test:", function(){

    it("deploys and initializes successfully", async () => {
      console.log(`Contract deploy with address:${contract.address}`);
    });

    it("deploy attack contract", async () => {
        console.log(`Attack Contract deploy with address:${contract2.address}`);
    });

    it("Alice deposits into EtherBank contract", async () => {
        await contract.connect(accounts[1]).deposit({value: ethers.utils.parseEther("10").toString()})
        let balance = await contract.connect(accounts[1]).getBalance()
        expect(balance).to.equal(10000000000000000000);
    });
   
    it("Bob deposits into EtherBank contract", async () => {
        await contract.connect(accounts[2]).deposit({value: ethers.utils.parseEther("5").toString()})
        let balance = await contract.connect(accounts[1]).getBalance()
        expect(balance).to.equal(15000000000000000000);
    });

    it("check EtherBank contract balance", async () => {
        let balance = await contract.connect(accounts[1]).getBalance()
        console.log(`EtherBank contract balance:${balance}`);
    });

    it("check Attacker contract balance", async () => {
        let balance2 = await contract2.connect(accounts[3]).getBalance()
        console.log(`Attacker contract balance:${balance2}`);
    });

    it("attack EtherBank contract", async () => {
        await contract2.connect(accounts[3]).attack({value: ethers.utils.parseEther("1").toString()})
    });

    it("check Attacker contract balance before the attack", async () => {
        let balance2 = await contract2.connect(accounts[3]).getBalance()
        console.log(`Attacker contract balance:${balance2}`);
    });

    it("check EtherBank contract balance before the attack", async () => {
        let balance = await contract.connect(accounts[1]).getBalance()
        console.log(`EtherBank contract balance:${balance}`);
    });
});