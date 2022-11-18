//const { hexStripZeros } = require("ethers/lib/utils")

const main = async () =>
{
    const[owner, randomPerson] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("vitap");
    await domainContract.deployed();
    console.log("Contract deployed to:", domainContract.address);
    console.log("Contract deployed by:", owner.address);

    let txn = await domainContract.register("a16z", {value:hre.ethers.utils.parseEther('1234')});
    await txn.wait();

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

    //grab the funds from the contract!
    try{
        txn = await domainContract.connect(superCoder).withdraw();
        await txn.wait();
    }
    catch(error)
    {
        console.log("could not rob contract");
    }
//look into their wallet so we can compare later
    let ownerBalance = await hre.ethers.provider.getBalance(owner.address);
    console.log("Balance of owner before withdrawl:", hre.ethers.utils.formatEther(ownerBalance));

    //looks like the owner is saving money
    txn = await domainContract.connect(owner).withdraw();
    await txn.wait();

    //fetch balance of contract & owner
    const contractBalance = await hre.ethers.provider.getBalance(domainContract.address);
    ownerBalance = await hre.ethers.provider.getBalance(owner.address);

    console.log("Contract balance after withdrawl:", hre.ethers.utils.formatEther(contractBalance));
    console.log("Balance of owner after withdrawl:", hre.ethers.utils.formatEther(ownerBalance));


    // const txn = await domainContract.register("prashanth", {value: hre.ethers.utils.parseEther('0.1')});
    // await txn.wait();

    // const domainOwner = await domainContract.getAddress("prashanth");
    // //how to print owner of the domain "blh-blah" is..?
    // //await domainContract.getAddress("prashanth");
    // console.log("owner of the domain prashanth is:", domainOwner);
    // //trying to set a bogus record
    // // txn = await domainContract.connect(randomPerson).setRecord("prashanth", "noob! you've lost your domain");
    // // await txn.wait();
    // const balance = await hre.ethers.provider.getBalance(domainContract.address);
    // console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () =>
{
    try
    {
        await main();
        process.exit(0);
    }
    catch(error)
    {
        console.log("error");
        process.exit(1);
    }
};

runMain();