// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Helper {
    function removeItemFromArray(
        uint256 valueToFindAndRemove,
        uint256[] memory array
    ) internal pure returns (uint256[] memory) {
        uint256[] memory auxArray = new uint256[](array.length - 1);
        uint8 found = 0;
        for (uint256 i = 0; i < array.length; i++) {
            if (array[i] != valueToFindAndRemove) {
                auxArray[i - found] = array[i];
            } else {
                found = 1;
            }
        }
        if (found == 0) {
            return array;
        }
        return auxArray;
    }
}
