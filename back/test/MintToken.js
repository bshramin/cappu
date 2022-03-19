const Cappu = artifacts.require("./Cappu.sol");

contract("Cappu", (accounts) => {
  it("should mint a token", async () => {
    const cappu = await Cappu.deployed();

    await cappu.mint("Hey there!");

    const tokenNum = await cappu.balanceOf(accounts[0], {
      from: accounts[0],
    });
    let userTokens = await cappu.getUserTokens(accounts[0]);
    userTokens = userTokens[1];

    assert.equal(tokenNum, 1);
    assert.equal(userTokens.length, 1);
  });
});
