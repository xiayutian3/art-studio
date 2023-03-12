//网络配置
export const NetworkConfiguration = {
  chainId: 0x7a69, //在哪个区块链上运行  (hardhat node  本地区块链 31337 的16进制 0x7A69)
  nftAddress: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", //智能合约的地址
  marketAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3", //交易平台的地址
  params: [ // 强制metamask 配置网络需要的数据
    {
      chainId: "0x7A69", //主要通过这个去匹配 (hardhat node  本地区块链 31337 的16进制 0x7A69)
      rpcUrls: ["http://127.0.0.1:8545/"],  //主要通过这个去匹配
      chainName: "localhost-testnet",
      nativeCurrency: {
        name: "MYETH",
        symbol: "MYETH",
        decimals: 18,
      },
      blockExplorerUrls: ["https://polygonscan.com/"],//这个暂时用不到，数据暂时跑不到etherscan（区块链浏览器）上
    },
  ],
};

// 获取网络rpc地址
export const rpcUrl = () => {
  return NetworkConfiguration.params[0].rpcUrls[0];
};
