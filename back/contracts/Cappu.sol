// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Cappu is ERC721 {
    string private myString = "Hello World";
    mapping(uint256 => string) tokenDatas;
    mapping(address => uint256[]) ownerTokens;

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
        tokenDatas[theHash] = data;
        ownerTokens[msg.sender].push(theHash);
    }

    function getUserTokens(address user)
        public
        view
        returns (uint256[] memory, string[] memory)
    {
        uint256[] memory tokens = ownerTokens[user];
        string[] memory datas = new string[](tokens.length);
        for (uint256 i = 0; i < tokens.length; i++) {
            datas[i] = tokenDatas[tokens[i]];
        }
        return (tokens, datas);
    }
}
