const main = async () =>
{
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("vitap");
    await domainContract.deployed();
    console.log("Contract deployed to:", domainContract.address);

    let txn = await domainContract.register("prashanth", {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();
    console.log("Minted domain prashanth.vitap");

    txn = await domainContract.setRecord("prashanth","Branch: CSE-DA");
    await txn.wait();
    console.log("Record set for prahanth.vitap");

    const address = await domainContract.getAddress("prashanth");
    console.log("owner of domain prashanth is:", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));

}

const runMain = async () =>
{
    try
    {
        await main();
        process.exit(0);
    }
    catch(error)
    {
        console.log(error);
        process.exit(1);
    }
};

runMain();