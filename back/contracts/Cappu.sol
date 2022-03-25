// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Helper.sol";

contract Cappu is ERC721, Helper {
    mapping(uint256 => string) private _tokenDatas;
    mapping(address => uint256[]) private _ownerTokens;
    uint64 private _numberOfTokenHolders;
    uint64 private _numberOfMintedTokens;

    constructor() ERC721("Cappu", "CAPU") {}

    function mint(string memory data) public {
        uint256 theHash = uint256(keccak256(abi.encode(data)));
        _safeMint(msg.sender, theHash);
        _tokenDatas[theHash] = data;
        _numberOfMintedTokens++;
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        if (from != address(0)) {
            _ownerTokens[from] = removeItemFromArray(
                tokenId,
                _ownerTokens[from]
            );
            if (_ownerTokens[from].length == 0) {
                _numberOfTokenHolders--;
            }
        }
        if (to != address(0)) {
            _ownerTokens[to].push(tokenId);
            if (_ownerTokens[to].length == 1) {
                _numberOfTokenHolders++;
            }
        }
    }

    function getUserTokens(address user)
        public
        view
        returns (uint256[] memory, string[] memory)
    {
        uint256[] memory tokens = _ownerTokens[user];
        string[] memory datas = new string[](tokens.length);
        for (uint256 i = 0; i < tokens.length; i++) {
            datas[i] = _tokenDatas[tokens[i]];
        }
        return (tokens, datas);
    }

    function getNumberOfTokenHolders() public view returns (uint64) {
        return _numberOfTokenHolders;
    }

    function getNumberOfMintedTokens() public view returns (uint64) {
        return _numberOfMintedTokens;
    }
}
