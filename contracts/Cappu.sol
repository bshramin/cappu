// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Cappu is ERC721 {
    constructor() ERC721("Cappu", "CAPU") {}

    string public myString = "Hello World";

    function set(string memory x) public {
        myString = x;
    }

    function mint(address to, bytes memory data) public virtual {
        uint256 tokenId = uint256(keccak256(data));
        _safeMint(to, tokenId, data);
    }
}
