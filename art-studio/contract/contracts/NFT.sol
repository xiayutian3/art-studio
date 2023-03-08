// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; //token与链下实体做映射
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol"; //可枚举的token
import "@openzeppelin/contracts/utils/Counters.sol";
// 继承关系图
//              ERC721
//           /         \
// ERC721URIStorage  ERC721Enumerable
//          \           /
//             MyErc721

contract MyErc721 is ERC721URIStorage, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address feeCollector; // 收钱账号
    uint fee = 1 gwei; //手续费

    constructor(address fc) ERC721("GameItem", "ITM") {
        feeCollector = fc;
    }
    // 提款
    function withdraw (address to) external {
        require(msg.sender == feeCollector, "no permission!");
        (bool suc,) = to.call{value:address(this).balance}("");
        require(suc,"withdraw failed");
    }

    function mint(address player, string memory _tokenURI)
        public payable
        returns (uint256)
    {
        require(msg.value >= fee, "please private fee!");//判断够不够手续费

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        _tokenIds.increment();
        return newItemId;
    }

    // 重写的函数
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 firstTokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable)  returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        // return super.tokenURI(tokenId); // 也可以这样，如果明确知道了是哪个合约，直接使用合约的名字来调用
        return ERC721URIStorage.tokenURI(tokenId);
    }
}