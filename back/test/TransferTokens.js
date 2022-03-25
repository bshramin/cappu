const Cappu = artifacts.require("./Cappu.sol");

contract("Cappu", (accounts) => {
  it("should transfer a token", async () => {
    const cappu = await Cappu.deployed();

    await cappu.mint("Hey there!", { from: accounts[0] });
    // let balance = await cappu.balanceOf(accounts[0], {
    //   from: accounts[0],
    // });
    // assert.equal(balance, 1);

    const { 0: firstUserTokenIdsBefore, 1: firstUserTokenDatasBefore } =
      await cappu.getUserTokens(accounts[0], {
        from: accounts[0],
      });
    const { 0: secondUserTokenIdsBefore, 1: secondUserTokenDatasBefore } =
      await cappu.getUserTokens(accounts[1], {
        from: accounts[1],
      });

    assert.equal(firstUserTokenIdsBefore.length, 1);
    assert.equal(secondUserTokenIdsBefore.length, 0);

    await cappu.safeTransferFrom(
      accounts[0],
      accounts[1],
      firstUserTokenIdsBefore[0],
      {
        from: accounts[0],
      }
    );

    const { 0: firstUserTokenIdsAfter, 1: firstUserTokenDatasAfter } =
      await cappu.getUserTokens(accounts[0], {
        from: accounts[0],
      });

    const { 0: secondUserTokenIdsAfter, 1: secondUserTokenDatasAfter } =
      await cappu.getUserTokens(accounts[1], {
        from: accounts[1],
      });

    assert.equal(firstUserTokenIdsAfter.length, 0);
    assert.equal(secondUserTokenIdsAfter.length, 1);
  });
});
