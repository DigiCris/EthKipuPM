// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract OnlyOwner {
    address public owner = address(0x1f9635574B632507AA1F9F6B37031b57bee3c6EE);
    uint256 public contador;

    function inc() public {
        if (msg.sender != owner) revert();
        contador++;
    }
}