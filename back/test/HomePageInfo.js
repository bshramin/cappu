const Cappu = artifacts.require("./Cappu.sol");

contract("Cappu", (accounts) => {
  it("should return correct homepage info", async () => {
    const cappu = await Cappu.deployed();
    await cappu.mint("Hey there!", { from: accounts[0] });
    await cappu.mint("Hey you!", { from: accounts[0] });
    let tokenHolders = await cappu.getNumberOfTokenHolders({
      from: accounts[0],
    });
    let numberOfTokens = await cappu.getNumberOfMintedTokens({
      from: accounts[0],
    });

    assert.equal(tokenHolders, 1);
    assert.equal(numberOfTokens, 2);

    await cappu.mint("Yo man!", { from: accounts[1] });
    tokenHolders = await cappu.getNumberOfTokenHolders({
      from: accounts[0],
    });
    numberOfTokens = await cappu.getNumberOfMintedTokens({
      from: accounts[0],
    });

    assert.equal(tokenHolders, 2);
    assert.equal(numberOfTokens, 3);

    const { 0: userTokenIds, 1: userTokenDatas } = await cappu.getUserTokens(
      accounts[0],
      {
        from: accounts[0],
      }
    );

    await cappu.safeTransferFrom(accounts[0], accounts[2], userTokenIds[0], {
      from: accounts[0],
    });

    tokenHolders = await cappu.getNumberOfTokenHolders({
      from: accounts[0],
    });
    numberOfTokens = await cappu.getNumberOfMintedTokens({
      from: accounts[0],
    });

    assert.equal(tokenHolders, 3);
    assert.equal(numberOfTokens, 3);
  });
});
