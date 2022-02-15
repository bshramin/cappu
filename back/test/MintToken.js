const Cappu = artifacts.require("./Cappu.sol");

contract("Cappu", (accounts) => {
  it("should mint a NFT", async () => {
    const cappu = await Cappu.deployed();

    // Set myString to "Hey there!"
    await cappu.mint(accounts[0], "Hey there!", { from: accounts[0] });

    // Get myString from public variable getter
    const storedString = await cappu.balanceOf(accounts[0], {
      from: accounts[0],
    });

    assert.equal(storedString, 1);
  });
});
