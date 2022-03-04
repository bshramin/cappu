// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Cappu is ERC721 {
    string private myString = "Hello World";
    mapping(uint256 => string) datas;

    constructor() ERC721("Cappu", "CAPU") {}

    function getString() public view returns (string memory) {
        return myString;
    }

    function setString(string memory x) public {
        myString = x;
    }

    function mint(string memory data) public {
        uint256 theHash = uint256(keccak256(abi.encode(data)));
        _mint(msg.sender, theHash);
        datas[theHash] = data;
    }
}
