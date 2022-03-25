const Cappu = artifacts.require("./Cappu.sol");

contract("Cappu", (accounts) => {
  it("should mint a token", async () => {
    const cappu = await Cappu.deployed();

    await cappu.mint("Hey there!", { from: accounts[0] });

    const balance = await cappu.balanceOf(accounts[0], {
      from: accounts[0],
    });

    assert.equal(balance, 1);
  });
});
