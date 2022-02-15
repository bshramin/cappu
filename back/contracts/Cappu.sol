// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Cappu is ERC721 {
    string[] private datas;
    mapping(string => bool) _tokenExists; // should calculate hash instead

    constructor() ERC721("Cappu", "CAPU") {}

    string private myString = "Hello World";

    function getString() public view returns (string memory) {
        return myString;
    }

    function setString(string memory x) public {
        myString = x;
    }

    function mint(string memory data) public {
        datas.push(data);
        _mint(msg.sender, datas.length - 1);
    }
}
