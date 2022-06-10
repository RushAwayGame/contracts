// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract RushawayToken is ERC20, ERC20Burnable, AccessControl {

    struct LockInfo {
        uint256 unlockTime;
        uint256 amount;
    }
    mapping(address => LockInfo) investorUnlockTime;

    constructor() ERC20("Rushaway Token", "_RUSHAWAY") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _mint(msg.sender, 960000000 * 10 ** decimals());
    }

}