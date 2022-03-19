const Cappu = artifacts.require("./Cappu.sol");

contract("Cappu", (accounts) => {
  it("sending a token", async () => {
    const cappu = await Cappu.deployed();

    await cappu.mint("Hey there!");
    let tokenId = await cappu.getUserTokens(accounts[0]);
    tokenId = tokenId[0][0];

    await cappu.safeSendToken(accounts[0], accounts[1], tokenId);

    const tokenNum = await cappu.balanceOf(accounts[0]);
    const tokenNum2 = await cappu.balanceOf(accounts[1]);

    assert.equal(tokenNum, 0);
    assert.equal(tokenNum2, 1);
  });
});
