// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Helper.sol";

contract Cappu is ERC721, Helper {
    mapping(uint256 => string) tokenDatas;
    mapping(address => uint256[]) ownerTokens;
    uint64 numberOfTokenHolders;
    uint64 numberOfMintedTokens;

    constructor() ERC721("Cappu", "CAPU") {}

    function mint(string memory data) public {
        uint256 theHash = uint256(keccak256(abi.encode(data)));
        _safeMint(msg.sender, theHash);
        tokenDatas[theHash] = data;
        numberOfMintedTokens++;
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        if (from != address(0)) {
            ownerTokens[from] = removeItemFromArray(tokenId, ownerTokens[from]);
            if (ownerTokens[from].length == 0) {
                numberOfTokenHolders--;
            }
        }
        if (to != address(0)) {
            ownerTokens[to].push(tokenId);
            if (ownerTokens[to].length == 1) {
                numberOfTokenHolders++;
            }
        }
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

    function getNumberOfTokenHolders() public view returns (uint64) {
        return numberOfTokenHolders;
    }

    function getNumberOfMintedTokens() public view returns (uint64) {
        return numberOfMintedTokens;
    }
}
