const Cappu = artifacts.require("./Cappu.sol");

contract("Cappu", (accounts) => {
  it("should store the string", async () => {
    const cappu = await Cappu.deployed();

    // Set myString to "Hey there!"
    await cappu.setString("Hey there!");

    // Get myString from public variable getter
    const storedString = await cappu.getString();

    assert.equal(storedString, "Hey there!", "The string was not stored");
  });
});
